import React from 'react';

import { View } from 'react-native';

// prettier-ignore
import {
  Card, Text, Button, Divider,
} from '@ui-kitten/components';

export default function CoinCard(props) {
  const { data, marketPrices } = props;

  // console.log('market', marketPrices);

  const CardHeader = (evaProps) => (
    <View {...evaProps}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text category="s2">
          {`@ Target ${
            data.percentage_to_sell_at ? data.percentage_to_sell_at : 25
          }%: `}
        </Text>
        <Text status="success" category="s1">
          Yes
        </Text>
      </View>
    </View>
  );

  const CardFooter = (evaProps) => (
    <View {...evaProps}>
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

  return (
    <Card header={CardHeader} footer={CardFooter}>
      <View style={{ flexDirection: 'row' }}>
        <View style={{ flex: 1 }}>
          <Text category="s2">{data.unit}</Text>
          <Text category="h5" style={{ marginVertical: 10 }}>
            {data['coin/token']}
          </Text>
          <View>
            <Text category="s1" style={{ marginBottom: 10 }}>
              Total Cost
            </Text>
            <Text category="p2">{`${data['total cost']} CAD`}</Text>
          </View>
        </View>
        <View style={{ flex: 1 }}>
          <View style={{ alignItems: 'center' }}>
            <Text category="s1" style={{ marginBottom: 10 }}>
              Market Price
            </Text>
            <Text category="p2">
              {marketPrices[data['coin/token']]?.CAD ?? 'Unavailable'}
              {marketPrices[data['coin/token']]?.USD && ' CAD'}
            </Text>
          </View>
          <Divider style={{ marginVertical: 10 }} />
          <View style={{ alignItems: 'center' }}>
            <Text category="s1" style={{ marginBottom: 10 }}>
              Other Prices
            </Text>
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
              }}
            >
              <Text
                category="p2"
                style={{ lineHeight: 24, marginHorizontal: 5 }}
              >
                {marketPrices[data['coin/token']]?.USD ?? 'Unavailable'}
                {marketPrices[data['coin/token']]?.USD && ' USD'}
              </Text>
              <Text
                category="p2"
                style={{ lineHeight: 24, marginHorizontal: 5 }}
              >
                {marketPrices[data['coin/token']]?.CNY ?? 'Unavailable'}
                {marketPrices[data['coin/token']]?.USD && ' CNY'}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </Card>
  );
}
