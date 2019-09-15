import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { all } from 'redux-saga/effects';
import AsyncStorage from '@react-native-community/async-storage';
import createSagaMiddleware from 'redux-saga';
import { persistReducer } from 'redux-persist';

import user from './reducers/user';
import meetups from './reducers/meetups';
import subscriptions from './reducers/subscriptions';
import signed from './reducers/signed';
import sagas from './sagas';

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
    timeout: 0,
    key: 'meetapp',
    storage: AsyncStorage,
    whitelist: ['signed', 'user'],
  },
  combineReducers({ user, meetups, signed, subscriptions })
);

const store = createStore(persisted, enhancer);

sagaMiddleware.run(function* saga() {
  return yield all(sagas);
});

export default store;
