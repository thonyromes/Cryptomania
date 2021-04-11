import React, { useState, useEffect, useCallback } from 'react';

import { View } from 'react-native';

import * as DocumentPicker from 'expo-document-picker';

// prettier-ignore
import {
  Layout, Text, List, Button,
} from '@ui-kitten/components';

import CoinCard from '../components/CoinCard';

import mergeCoins from '../utils/mergeCoins';

import convertCsvToJSON from '../utils/convertCsvToJSON';

import validateCsvHeaders from '../utils/validateCsvHeaders';

// import api from '../api/index';

const validCsvHeaders = [
  'purchase id',
  'coin/token',
  'unit',
  'total cost',
  'percentage_to_sell_at',
];

const renderItem = ({ index, item }) => (
  <View style={{ paddingVertical: 5, paddingHorizontal: 15 }}>
    <CoinCard data={item} />
  </View>
);

export default function Home() {
  const [data, setData] = useState([]);

  const [refreshing, setRefreshing] = useState(false);

  const [error, setError] = useState({
    csvHeaderError: null,
  });

  const onRefresh = useCallback(() => {
    setRefreshing((prevState) => !prevState);
  }, []);

  const onPickCsv = useCallback(() => {
    (async () => {
      try {
        const doc = await DocumentPicker.getDocumentAsync();

        if (doc.type === 'success') {
          const convertedJSON = await convertCsvToJSON(doc.uri);

          const csvHeaders = validateCsvHeaders(convertedJSON, validCsvHeaders);

          if (!csvHeaders.valid) {
            setError((prevState) => ({
              ...prevState,
              csvHeaderError: `Selected Csv header structure is not supported \n Expected: ${validCsvHeaders.join(
                ',',
              )} \n Saw: ${csvHeaders.selected.join(',')}`,
            }));

            return;
          }

          const mergedSimilarCoins = mergeCoins(convertedJSON);

          setData(mergedSimilarCoins);

          setError((prevState) => ({ ...prevState, csvHeaderError: null }));
        }
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  // useEffect(() => {
  // const sheetData = api.getSheetData(
  //   'https://sheet.best/api/sheets/e02210d3-c486-495a-ad74-4c487ffebbf2',
  // );

  // sheetData
  //   .then((response) => setData(() => response.pageData.data))
  //   .catch((error) => console.log(error));

  // const mergedCoins = mergeCoins(coinListing);

  // setData(mergedCoins);
  // }, []);

  // console.log(data);

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
