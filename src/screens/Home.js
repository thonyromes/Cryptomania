// prettier-ignore
import React, {
  useState, useEffect, useCallback, useRef,
} from 'react';

import { View } from 'react-native';

// prettier-ignore
import {
  Layout, Text, List, Button,
} from '@ui-kitten/components';

import Toast from 'react-native-toast-message';

import CoinCard from '../components/CoinCard';

import mergeCoins from '../utils/mergeCoins';

import importCsv from '../utils/importCsv';

import api from '../api/index';

const validCoinCsvHeaders = [
  'purchase id',
  'coin/token',
  'unit',
  'total cost',
  'percentage_to_sell_at',
];

const validCurrencyCsvHeaders = [
  'purchasing_currency',
  'to_currency1',
  'to_currency2',
];

const defaultCurrency = [
  { purchasing_currency: 'USD', to_currency1: 'YEN', to_currency2: 'NGN' },
];

const defaultCoins = ['DOT', 'ADA'];

const defaultCurrencyList = ['USD', 'CNY', 'CAD'];

export default function Home() {
  const [data, setData] = useState([]);

  const [currency, setCurrency] = useState(defaultCurrency);

  const [marketPrices, setMarketPrices] = useState({});

  const currentCoinCodes = useRef(defaultCoins);

  const fetchMarketPrices = async (coins) => {
    try {
      const marketData = await api.getMarketPrices(
        `https://min-api.cryptocompare.com/data/pricemulti?fsyms=${coins.join(
          ',',
        )}&tsyms=${defaultCurrencyList.join(',')}`,
      );

      setMarketPrices(marketData.data);
    } catch (e) {
      Toast.show({
        type: 'error',
        text1: 'An error occurred',
        text2: e.toString(),
        visibilityTime: 6000,
      });
    }
  };

  const onImportCoinCsv = useCallback(() => {
    (async () => {
      try {
        const convertedJSON = await importCsv(validCoinCsvHeaders);

        if (convertedJSON.length < 1) return;

        const mergedSimilarCoins = mergeCoins(convertedJSON);

        const coinCodes = mergedSimilarCoins.map((coin) => coin['coin/token']);

        currentCoinCodes.current = coinCodes;

        await fetchMarketPrices(currentCoinCodes.current);

        setData(mergedSimilarCoins);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  const onImportCurrencyCsv = useCallback(() => {
    (async () => {
      try {
        const convertedJSON = await importCsv(validCurrencyCsvHeaders);

        if (convertedJSON.length < 1) return;

        setCurrency(convertedJSON);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  const onRefresh = useCallback(() => {
    (async () => {
      try {
        Toast.show({
          text1: 'Refreshing',
          visibilityTime: 1000,
        });
        await fetchMarketPrices(currentCoinCodes.current);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  useEffect(() => {
    const marketAutoRefresh = setInterval(
      () => fetchMarketPrices(currentCoinCodes.current),
      3000,
    );

    return () => clearInterval(marketAutoRefresh);
  }, []);

  const renderItem = ({ index, item }) => (
    <View style={{ paddingVertical: 5, paddingHorizontal: 15 }}>
      <CoinCard data={item} marketPrices={marketPrices} currency={currency} />
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
        <Button onPress={onImportCoinCsv}>Import CSV</Button>
      </View>
    ),
    [onImportCoinCsv],
  );

  return (
    <Layout level="1" style={{ flex: 1, position: 'relative' }}>
      <List
        contentContainerStyle={{ paddingTop: 40 }}
        data={data}
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
            <Button size="tiny" onPress={onImportCoinCsv}>
              Import new
            </Button>
          </View>
          <View>
            <Button size="tiny" onPress={onImportCurrencyCsv}>
              Import currency
            </Button>
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
