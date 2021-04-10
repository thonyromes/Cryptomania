import 'react-native-gesture-handler';

import React from 'react';

import { enableScreens } from 'react-native-screens';

import { StatusBar } from 'expo-status-bar';

import * as eva from '@eva-design/eva';

import { ApplicationProvider } from '@ui-kitten/components';

import Home from './src/components/Home';

enableScreens();

export default function App() {
  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <Home />
      {/* eslint-disable-next-line react/style-prop-object */}
      <StatusBar style="auto" />
    </ApplicationProvider>
  );
}
