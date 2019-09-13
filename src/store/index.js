import { createStore, combineReducers } from 'redux';

import user from './reducers/user';
import signed from './reducers/signed';

export default createStore(combineReducers({ user, signed }));
