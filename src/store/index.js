import { applyMiddleware, compose, combineReducers, createStore } from 'redux';
import { persistReducer } from 'redux-persist';
import { all } from 'redux-saga/effects';
import createSagaMiddleware from 'redux-saga';
import { createAsyncStorage } from '@react-native-async-storage/async-storage';
import meetups from './reducers/meetups';
import sagas from './sagas';
import signed from './reducers/signed';
import subscriptions from './reducers/subscriptions';
import user from './reducers/user';

const sagaMiddleware = createSagaMiddleware();
const enhancer = applyMiddleware(sagaMiddleware);

const persisted = persistReducer(
  {
    key: 'meetapp',
    storage: createAsyncStorage('meetapp'),
    timeout: 0,
    whitelist: ['signed', 'user'],
  },
  combineReducers({ meetups, signed, subscriptions, user })
);

export const store = createStore(persisted, enhancer);

sagaMiddleware.run(function* saga() {
  return yield all(sagas);
});
