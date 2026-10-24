import { applyMiddleware, combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import { all } from 'redux-saga/effects';
import createSagaMiddleware from 'redux-saga';
import { createAsyncStorage } from '@react-native-async-storage/async-storage';
import meetups from './reducers/meetups';
import sagas from './sagas';
import signed from './reducers/signed';
import subscriptions from './reducers/subscriptions';
import user from './reducers/user';
import { configureStore } from '@reduxjs/toolkit';
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

const sagaMiddleware = createSagaMiddleware();
const enhancer = applyMiddleware(sagaMiddleware);

const persisted = persistReducer(
  {
    key: 'meetapp',
    storage: createAsyncStorage('meetapp'),
    whitelist: ['signed', 'user'],
  },
  combineReducers({ meetups, signed, subscriptions, user })
);

export const store = configureStore({
  reducer: persisted,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(sagaMiddleware),
  enhancers: (getDefaultEnhancers) => getDefaultEnhancers().concat(enhancer),
});

sagaMiddleware.run(function* saga() {
  return yield all(sagas);
});
