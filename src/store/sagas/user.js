import { toast } from 'react-toastify';
import { all, call, put, takeLatest } from 'redux-saga/effects';

import { signInSuccess, updateProfileSuccess } from '~/store/actions/user';
import api from '~/services/api';
import history from '~/services/history';

export function setToken({ payload }) {
  if (!payload) {
    return;
  }
  const { token } = payload.user;
  api.defaults.headers.Authorization = `Bearer ${token}`;
}

export function* signIn({ payload }) {
  try {
    const { email, password } = payload;
    const response = yield call(api.post, 'sessions', { email, password });
    const { token, user } = response.data;

    api.defaults.headers.Authorization = `Bearer ${token}`;
    yield put(signInSuccess(token, user));
  } catch (err) {
    toast.error('Ops! Alguma coisa deu errado, tente novamente!');
  }
}

export function* signUp({ payload }) {
  try {
    const { email, name, password } = payload;
    yield call(api.post, 'users', { email, name, password });
    history.push('/');
  } catch (err) {
    toast.error('Ops! Alguma coisa deu errado, tente novamente!');
  }
}

export function* updateUser({ payload }) {
  try {
    const { email, name, ...rest } = payload;
    const response = yield call(api.put, 'users', {
      email,
      name,
      ...(rest.old_password ? rest : {}),
    });

    toast.success('Perfil atualizado com sucesso!');
    yield put(updateProfileSuccess(response.data));
  } catch (err) {
    toast.error('Ops! Alguma coisa deu errado, tente novamente!');
  }
}

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@user/SIGN_IN_REQUEST', signIn),
  takeLatest('@user/SIGN_UP_REQUEST', signUp),
  takeLatest('@user/UPDATE_PROFILE_REQUEST', updateUser),
]);
