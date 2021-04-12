import 'react-native-gesture-handler';

import React from 'react';

import { enableScreens } from 'react-native-screens';

import { SafeAreaView } from 'react-native-safe-area-context';

import { StatusBar } from 'expo-status-bar';

import * as eva from '@eva-design/eva';

import { ApplicationProvider } from '@ui-kitten/components';

import Toast from 'react-native-toast-message';

import Home from './src/screens/Home';

enableScreens();

export default function App() {
  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <SafeAreaView style={{ flex: 1 }}>
        <Home />
        <Toast ref={(ref) => Toast.setRef(ref)} />
      </SafeAreaView>
      {/* eslint-disable-next-line react/style-prop-object */}
      <StatusBar style="auto" />
    </ApplicationProvider>
  );
}
