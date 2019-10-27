import { takeLatest, call, put, all } from 'redux-saga/effects';
import { Alert } from 'react-native';

import { signInSuccess, updateProfileSuccess } from '../actions/user';
import { navigate } from '~/services/navigator';
import api from '~/services/api';

function* signIn({ payload }) {
  try {
    const { email, password } = payload;
    const response = yield call(api.post, 'sessions', { email, password });

    const { token, user } = response.data;
    api.defaults.headers.Authorization = `Bearer ${token}`;

    yield put(signInSuccess(token, user));
  } catch (err) {
    Alert.alert('Ops! Alguma coisa deu errado, tente novamente!');
  }
}

function* signUp({ payload }) {
  try {
    const { name, email, password } = payload;
    yield call(api.post, 'users', { name, email, password });

    navigate('SignIn');
  } catch (err) {
    Alert.alert('Ops! Alguma coisa deu errado, tente novamente!');
  }
}

function* updateUser({ payload }) {
  try {
    const { email, name, ...rest } = payload;
    const response = yield call(api.put, 'users', {
      email,
      name,
      ...(rest.old_password ? rest : {}),
    });

    Alert.alert('Perfil atualizado com sucesso!');
    yield put(updateProfileSuccess(response.data));
  } catch (err) {
    Alert.alert('Ops! Alguma coisa deu errado, tente novamente!');
  }
}

function setToken({ payload }) {
  if (!payload) {
    return;
  }
  const { token } = payload.user;
  api.defaults.headers.Authorization = `Bearer ${token}`;
}

export default all([
  takeLatest('@user/SIGN_IN_REQUEST', signIn),
  takeLatest('@user/UPDATE_USER_REQUEST', updateUser),
  takeLatest('@user/SIGN_UP_REQUEST', signUp),
  takeLatest('persist/REHYDRATE', setToken),
]);
