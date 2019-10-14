import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { all } from 'redux-saga/effects';
import storage from 'redux-persist/lib/storage';
import createSagaMiddleware from 'redux-saga';
import { persistReducer } from 'redux-persist';

import user from './reducers/user';
import signed from './reducers/signed';
import sagas from './sagas';

const sagaMiddleware = createSagaMiddleware({
  sagaMonitor: (() => {
    if (process.env.NODE_ENV === 'development') {
      return console.tron.createSagaMonitor();
    }
    return null;
  })(),
});

const persisted = persistReducer(
  {
    key: 'meetapp',
    storage,
    whitelist: ['signed', 'user'],
  },
  combineReducers({ user, signed })
);

const enhancer = (() => {
  if (process.env.NODE_ENV === 'development') {
    return compose(
      console.tron.createEnhancer(),
      applyMiddleware(sagaMiddleware)
    );
  }
  return applyMiddleware(sagaMiddleware);
})();

const store = createStore(persisted, enhancer);

sagaMiddleware.run(function* saga() {
  return yield all(sagas);
});

export default store;
