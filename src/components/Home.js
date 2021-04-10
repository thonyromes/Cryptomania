import React, { useState, useEffect, useCallback } from 'react';

import { View } from 'react-native';

import * as FileSystem from 'expo-file-system';

import * as DocumentPicker from 'expo-document-picker';

// prettier-ignore
import {
  Layout, Card, Text, List, Button, Divider,
} from '@ui-kitten/components';

import csvtojson from 'csvtojson';

// import api from '../api/index';

// import coinListing from '../store/coinListing.json';

const convertCsvToJSON = async (csvFile) => {
  let convertedCsvToJson = null;
  try {
    // read csv file and convert to string
    const csvString = await FileSystem.readAsStringAsync(csvFile);

    // convert csv string to json
    convertedCsvToJson = await csvtojson().fromString(csvString);
  } catch (e) {
    console.log(e);
  }

  return convertedCsvToJson;
};

// prettier-ignore
const mergeCoins = (list) => list.reduce((acc, cur) => {
  let accumulator = acc;
  // Get the index of the key-value pair.
  const occursIndex = accumulator.reduce(
    (n, item, i) => (item['coin/token'] === cur['coin/token'] ? i : n),
    -1,
  );

  // If the name is found,
  if (occursIndex >= 0) {
    // prettier-ignore
    // add the current unit/cost to previous occurrences' units/cost.
    accumulator[occursIndex].unit = Number(accumulator[occursIndex].unit) + Number(cur.unit);
    accumulator[occursIndex]['total cost'] = Number(accumulator[occursIndex]['total cost'])
      + Number(cur['total cost']);

    // Otherwise,
  } else {
    // add the current item to the accumulator
    accumulator = [...accumulator, cur];
  }

  return accumulator;
}, []);

const CardHeader = (props) => (
  <View {...props}>
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Text>@ Target %: </Text>
      <Text status="success" category="s1">
        Yes
      </Text>
    </View>
  </View>
);

const CardFooter = (props) => (
  <View {...props}>
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <View style={{ flex: 1 }}>
        <Text category="s1" status="success">
          Up 25%
        </Text>
      </View>
      <View style={{ flex: 1 }}>
        <Button size="tiny" status="success">
          Sellable
        </Button>
      </View>
    </View>
  </View>
);

const renderItem = ({ index, item }) => (
  <View style={{ paddingVertical: 5, paddingHorizontal: 15 }}>
    <Card header={CardHeader} footer={CardFooter}>
      <View style={{ flexDirection: 'row' }}>
        <View style={{ flex: 1 }}>
          <Text category="s2">{item.unit}</Text>
          <Text category="h5" style={{ marginVertical: 10 }}>
            {item['coin/token']}
          </Text>
          <View>
            <Text category="s1" style={{ marginBottom: 10 }}>
              Total Cost
            </Text>
            <Text category="p2">{`${item['total cost']} CAD`}</Text>
          </View>
        </View>
        <View style={{ flex: 1 }}>
          <View style={{ alignItems: 'center' }}>
            <Text category="s1" style={{ marginBottom: 10 }}>
              Market Price
            </Text>
            <Text category="p2">6551 CAD</Text>
          </View>
          <Divider style={{ marginVertical: 10 }} />
          <View style={{ alignItems: 'center' }}>
            <Text category="s1" style={{ marginBottom: 10 }}>
              Other Prices
            </Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
              <Text category="p2" style={{ lineHeight: 24 }}>
                6551 USD, 2534 EUR
              </Text>
            </View>
          </View>
        </View>
      </View>
    </Card>
  </View>
);

export default function Home() {
  const [data, setData] = useState([]);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing((prevState) => !prevState);
  }, []);

  const onPickCsv = useCallback(() => {
    (async () => {
      try {
        const doc = await DocumentPicker.getDocumentAsync();

        if (doc.type === 'success') {
          const convertedJSON = await convertCsvToJSON(doc.uri);

          const mergedSimilarCoins = mergeCoins(convertedJSON);

          setData(mergedSimilarCoins);
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
    [],
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
