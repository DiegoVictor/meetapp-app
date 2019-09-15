import React from 'react';
import '../config/ReactotronConfig';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';

import Navigator from '../services/navigator';
import Default from './layouts/Default';
import Routes from '../routes';
import store from '../store';

export default function App() {
  return (
    <Provider store={store}>
      <StatusBar barStyle="light-content" backgroundColor="#191620" />
      <Default>
        <Routes ref={nav => Navigator(nav)} />
      </Default>
    </Provider>
  );
}
