import React from 'react';

import { View } from 'react-native';

import { Card, Text, Divider } from '@ui-kitten/components';

import HeaderComponent from './HeaderComponent';
import FooterComponent from './FooterComponent';

export default function CoinCard(props) {
  const { data, marketPrices, currency } = props;

  const baseCurrency = currency[0]?.purchasing_currency;
  const altCurrency1 = currency[0]?.to_currency1;
  const altCurrency2 = currency[0]?.to_currency2;

  // purchase statistics
  const unitBought = Number(data.unit);
  const totalCost = Number(data['total cost']);

  // market statistics
  const baseUnitPrice = marketPrices[data['coin/token']]
    ? marketPrices[data['coin/token']][baseCurrency]
    : null;

  const altUnitPrice1 = marketPrices[data['coin/token']]
    ? marketPrices[data['coin/token']][altCurrency1]
    : null;

  const altUnitPrice2 = marketPrices[data['coin/token']]
    ? marketPrices[data['coin/token']][altCurrency2]
    : null;

  const totalPrice = unitBought * Number(baseUnitPrice);

  const percentChange = baseUnitPrice
    ? (((totalPrice - totalCost) / totalCost) * 100).toPrecision(3)
    : 'unavailable';

  const CardHeader = (evaProps) => (
    <View {...evaProps}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text category="s2">@ Target %: </Text>
        <HeaderComponent
          percentChange={percentChange}
          percentSellAt={data.percentage_to_sell_at || 25}
        />
      </View>
    </View>
  );

  const CardFooter = (evaProps) => (
    <View {...evaProps}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <FooterComponent percentChange={percentChange} />
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
            <Text category="p2">{`${data['total cost']} ${baseCurrency}`}</Text>
          </View>
        </View>
        <View style={{ flex: 1 }}>
          <View style={{ alignItems: 'center' }}>
            <Text category="s1" style={{ marginBottom: 10 }}>
              Market Price
            </Text>
            <Text category="p2">
              {baseUnitPrice ?? 'Unavailable'}
              {baseUnitPrice && ` ${baseCurrency}`}
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
                justifyContent: 'center',
              }}
            >
              <Text
                category="p2"
                style={{ lineHeight: 24, marginHorizontal: 5 }}
              >
                {altUnitPrice1 ?? 'Unavailable'}
                {altUnitPrice1 && ` ${altCurrency1}`}
              </Text>
              <Text
                category="p2"
                style={{ lineHeight: 24, marginHorizontal: 5 }}
              >
                {altUnitPrice2 ?? 'Unavailable'}
                {altUnitPrice2 && ` ${altCurrency2}`}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </Card>
  );
}
