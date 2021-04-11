import React, { useState, useEffect, useCallback } from 'react';

import { View } from 'react-native';

import * as DocumentPicker from 'expo-document-picker';

// prettier-ignore
import {
  Layout, Text, List, Button,
} from '@ui-kitten/components';

import Toast from 'react-native-toast-message';

import CoinCard from '../components/CoinCard';

import mergeCoins from '../utils/mergeCoins';

import convertCsvToJSON from '../utils/convertCsvToJSON';

import validateCsvHeaders from '../utils/validateCsvHeaders';

import api from '../api/index';

const validCsvHeaders = [
  'purchase id',
  'coin/token',
  'unit',
  'total cost',
  'percentage_to_sell_at',
];

export default function Home() {
  const [data, setData] = useState([]);

  const [marketPrices, setMarketPrices] = useState({});

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing((prevState) => !prevState);
  }, []);

  const onPickCsv = useCallback(() => {
    (async () => {
      try {
        const doc = await DocumentPicker.getDocumentAsync({
          type: 'text/csv',
        });

        if (doc.type === 'success') {
          const convertedJSON = await convertCsvToJSON(doc.uri);

          const csvHeaders = validateCsvHeaders(convertedJSON, validCsvHeaders);

          if (!csvHeaders.valid) {
            throw new Error(
              `Selected Csv header structure is not supported\nExpected: ${validCsvHeaders.join(
                ',',
              )}\nSaw: ${csvHeaders.selected.join(',')}`,
            );
          }

          const mergedSimilarCoins = mergeCoins(convertedJSON);

          setData(mergedSimilarCoins);

          Toast.show({
            text1: 'Import Successful',
            visibilityTime: 3000,
          });
        } else {
          throw new Error('An error occurred during import');
        }
      } catch (e) {
        Toast.show({
          type: 'error',
          text1: 'Import Failed',
          text2: e.toString(),
          visibilityTime: 6000,
        });
      }
    })();
  }, []);

  useEffect(() => {
    const marketData = api.getMarketPrices(
      'https://min-api.cryptocompare.com/data/pricemulti?fsyms=DOT,ADA&tsyms=USD,CNY,CAD',
    );

    // prettier-ignore
    marketData
      .then((response) => setMarketPrices(response.data))
      .catch((e) => Toast.show({
        type: 'error',
        text1: 'An error occurred',
        text2: e.toString(),
        visibilityTime: 6000,
      }));
  }, []);

  const renderItem = ({ index, item }) => (
    <View style={{ paddingVertical: 5, paddingHorizontal: 15 }}>
      <CoinCard data={item} marketPrices={marketPrices} />
    </View>
  );

  const renderEmptyList = useCallback(
    () => (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: '75%',
        }}
      >
        <Text appearance="hint" category="h6" style={{ marginBottom: 20 }}>
          Nothing to see here
        </Text>
        <Button onPress={onPickCsv}>Import CSV</Button>
      </View>
    ),
    [onPickCsv],
  );

  return (
    <Layout level="1" style={{ flex: 1, position: 'relative' }}>
      <List
        contentContainerStyle={{ paddingTop: 40 }}
        data={data}
        extraData={refreshing}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, i) => item['purchase id']}
        ListEmptyComponent={renderEmptyList}
      />
      {data.length > 0 && (
        <Layout
          level="1"
          style={{
            flex: 1,
            position: 'absolute',
            left: 0,
            top: 0,
            width: '100%',
            paddingHorizontal: 15,
            paddingTop: 5,
            paddingBottom: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <View>
            <Button size="tiny" onPress={onPickCsv}>
              Import new
            </Button>
          </View>
          <View>
            <Button size="tiny">Import currency</Button>
          </View>
          <View>
            <Button size="tiny" onPress={onRefresh}>
              Refresh
            </Button>
          </View>
        </Layout>
      )}
    </Layout>
  );
}
