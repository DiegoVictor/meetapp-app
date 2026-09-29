import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import { Header } from './src/components/Header';
import { Navigation } from './src/routes';
import { store } from './src/store';

export const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistStore(store)}>
        <StatusBar barStyle="light-content" backgroundColor="#191620" />
        <Header>
          <Navigation />
        </Header>
      </PersistGate>
    </Provider>
  );
};
