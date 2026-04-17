import React from 'react';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import { Container } from '~/components/Container';
import { Routes } from '~/routes';
import { store } from '~/store';

export const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistStore(store)}>
        <StatusBar barStyle="light-content" backgroundColor="#191620" />
        <Container>
          <Routes />
        </Container>
      </PersistGate>
    </Provider>
  );
};
