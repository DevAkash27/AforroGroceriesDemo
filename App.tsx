/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {View} from 'react-native';
import {Provider} from 'react-redux';

import RootNavigator from './src/navigation/RootNavigator';
import store from './src/store';

const App = () => {
  return (
    <Provider store={store}>
      <View style={{flex: 1}}>
        <RootNavigator />
      </View>
    </Provider>
  );
};

export default App;
