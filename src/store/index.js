import { createStore, combineReducers, applyMiddleware } from 'redux';
import storage from 'redux-persist/lib/storage';
import createSagaMiddleware from 'redux-saga';
import { persistReducer } from 'redux-persist';

import user from './reducers/user';
import signed from './reducers/signed';
import sagas from './sagas';

const sagaMiddlewware = createSagaMiddleware();

const persisted = persistReducer(
  {
    key: 'meetapp',
    storage,
    whitelist: ['signed', 'user'],
  },
  combineReducers({ user, signed })
);

const store = createStore(persisted, applyMiddleware(sagaMiddlewware));

sagaMiddlewware.run(...sagas);

export default store;
