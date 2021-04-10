import 'react-native-gesture-handler';

import React from 'react';

import { enableScreens } from 'react-native-screens';

import { StatusBar } from 'expo-status-bar';

import * as eva from '@eva-design/eva';

import { ApplicationProvider, Layout, Text } from '@ui-kitten/components';

enableScreens();

const HomeScreen = () => (
  <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text category="h1">HOME</Text>
  </Layout>
);

export default function App() {
  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <HomeScreen />
      {/* eslint-disable-next-line react/style-prop-object */}
      <StatusBar style="auto" />
    </ApplicationProvider>
  );
}
