import { createStore, combineReducers, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import user from './reducers/user';
import signed from './reducers/signed';
import sagas from './sagas';

const sagaMiddlewware = createSagaMiddleware();

const store = createStore(
  combineReducers({ user, signed }),
  applyMiddleware(sagaMiddlewware)
);

sagaMiddlewware.run(...sagas);

export default store;
