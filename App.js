import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import { NavigationContainer } from '@react-navigation/native';
import { MainLayout } from './src/components/MainLayout';
import { AppRoutes } from './src/routes';

export const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistStore(store)}>
        <StatusBar barStyle="light-content" backgroundColor="#191620" />
        <MainLayout>
          <AppRoutes />
        </MainLayout>
      </PersistGate>
    </Provider>
  );
};
