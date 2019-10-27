import { all, call, put, takeLatest } from 'redux-saga/effects';
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
    const { email, name, password } = payload;
    yield call(api.post, 'users', { email, name, password });
    navigate('SignIn');
  } catch (err) {
    Alert.alert('Ops! Alguma coisa deu errado, tente novamente!');
  }
}

function* updateUser({ payload }) {
  try {
    const { name, email, ...rest } = payload;
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
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@user/SIGN_IN_REQUEST', signIn),
  takeLatest('@user/SIGN_UP_REQUEST', signUp),
  takeLatest('@user/UPDATE_PROFILE_REQUEST', updateUser),
]);
