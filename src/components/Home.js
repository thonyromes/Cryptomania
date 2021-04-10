import React from 'react';

import { View } from 'react-native';

import { Layout, Card, Text } from '@ui-kitten/components';

const cardHeader = (props) => (
  <View {...props}>
    <Text>Header</Text>
  </View>
);

const cardFooter = (props) => (
  <View {...props}>
    <Text>Footer</Text>
  </View>
);

export default function Home() {
  return (
    <Layout level="1" style={{ flex: 1 }}>
      <Card header={cardHeader} footer={cardFooter}>
        <View>
          <Text>Hello world</Text>
        </View>
      </Card>
    </Layout>
  );
}
