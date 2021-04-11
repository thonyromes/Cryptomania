import React from 'react';

import { View } from 'react-native';

import { Text, Button } from '@ui-kitten/components';

export default function FooterComponent(props) {
  const { percentChange } = props;
  if (percentChange === 0) {
    return (
      <>
        <View style={{ flex: 1 }}>
          <Text category="s1">No change</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Button size="tiny">Break even</Button>
        </View>
      </>
    );
  }

  if (percentChange < 0) {
    return (
      <>
        <View style={{ flex: 1 }}>
          <Text category="s1" status="danger">
            {`${percentChange}%`}
          </Text>
        </View>
        <View style={{ flex: 1 }}>
          <Button size="tiny" status="danger">
            Don&apos;t sell
          </Button>
        </View>
      </>
    );
  }

  if (percentChange > 0) {
    return (
      <>
        <View style={{ flex: 1 }}>
          <Text category="s1" status="success">
            {`+${percentChange}%`}
          </Text>
        </View>
        <View style={{ flex: 1 }}>
          <Button size="tiny" status="success">
            Sellable
          </Button>
        </View>
      </>
    );
  }

  return <Text category="s1">unavailable</Text>;
}
