import React from 'react';
import '../config/ReactotronConfig';
import { StatusBar, YellowBox } from 'react-native';
import { Provider } from 'react-redux';

import store from '../store';

YellowBox.ignoreWarnings([
  'Warning: Async Storage has been extracted from react-native core',
  'Remote debugger is in a background tab which may cause apps to perform slowly. Fix this by foregrounding the tab (or opening it in a separate window).',
]);

export default function App() {
  return (
    <Provider store={store}>
      <StatusBar barStyle="light-content" backgroundColor="#22202C" />
    </Provider>
  );
}
