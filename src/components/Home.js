import React, { useState, useEffect } from 'react';

import { View } from 'react-native';

// prettier-ignore
import {
  Layout, Card, Text, List, Button, Divider,
} from '@ui-kitten/components';

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
          <Text category="s2">2.16</Text>
          <Text category="h5" style={{ marginVertical: 10 }}>
            ETH
          </Text>
          <View>
            <Text category="s1" style={{ marginBottom: 10 }}>
              Purchase Price
            </Text>
            <Text category="p2">243 CAD</Text>
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

const ListEmpty = () => (
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Text appearance="hint" category="h6" style={{ marginBottom: 10 }}>
      Nothing to see here
    </Text>
    <Button>Import CSV</Button>
  </View>
);

export default function Home() {
  const [data, setData] = useState([
    { id: 1, title: 'Hello world', subTitle: 'Going forward' },
    { id: 2, title: 'Hello world 2', subTitle: 'Going forward' },
    { id: 3, title: 'Hello world 3', subTitle: 'Going forward' },
    { id: 4, title: 'Hello world 4', subTitle: 'Going forward' },
    { id: 5, title: 'Hello world 5', subTitle: 'Going forward' },
    { id: 6, title: 'Hello world 6', subTitle: 'Going forward' },
  ]);

  return (
    <Layout level="1" style={{ flex: 1, position: 'relative' }}>
      <List
        contentContainerStyle={{ paddingVertical: 30 }}
        data={data}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        keyExtractor={(_, i) => i.toString()}
        ListEmptyComponent={ListEmpty}
      />
      {data.length > 0 && (
        <>
          <View style={{ position: 'absolute', left: 15, top: 5 }}>
            <Button size="tiny">Update</Button>
          </View>
          <View style={{ position: 'absolute', right: 15, top: 5 }}>
            <Button size="tiny">Refresh</Button>
          </View>
        </>
      )}
    </Layout>
  );
}
