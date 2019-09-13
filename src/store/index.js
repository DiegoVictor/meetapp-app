import { createStore, combineReducers } from 'redux';

import user from './reducers/user';

export default createStore(combineReducers({ user }));
