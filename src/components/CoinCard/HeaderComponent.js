import React from 'react';

import { Text } from '@ui-kitten/components';

export default function HeaderComponent(props) {
  const { percentChange, percentSellAt } = props;

  if (!percentChange) return <Text category="s1">-</Text>;

  if (percentChange === Number(percentSellAt)) {
    return <Text category="s1">Even</Text>;
  }

  if (percentChange < Number(percentSellAt)) {
    return (
      <Text category="s1" status="danger">
        No
      </Text>
    );
  }

  if (percentChange >= Number(percentSellAt)) {
    return (
      <Text category="s1" status="success">
        Yes
      </Text>
    );
  }

  return <Text category="s1">-</Text>;
}
