import { applyMiddleware, compose, combineReducers, createStore } from 'redux';
import { persistReducer } from 'redux-persist';
import { all } from 'redux-saga/effects';
import createSagaMiddleware from 'redux-saga';
import AsyncStorage from '@react-native-community/async-storage';

import meetups from './reducers/meetups';
import sagas from './sagas';
import signed from './reducers/signed';
import subscriptions from './reducers/subscriptions';
import user from './reducers/user';

const sagaMiddleware = createSagaMiddleware({
  sagaMonitor: (() => {
    if (__DEV__) {
      return console.tron.createSagaMonitor();
    }
    return null;
  })(),
});

const enhancer = (() => {
  if (__DEV__) {
    return compose(
      console.tron.createEnhancer(),
      applyMiddleware(sagaMiddleware)
    );
  }
  return applyMiddleware(sagaMiddleware);
})();

const persisted = persistReducer(
  {
    key: 'meetapp',
    storage: AsyncStorage,
    timeout: 0,
    whitelist: ['signed', 'user'],
  },
  combineReducers({ meetups, signed, subscriptions, user })
);

const store = createStore(persisted, enhancer);

sagaMiddleware.run(function* saga() {
  return yield all(sagas);
});

export default store;
