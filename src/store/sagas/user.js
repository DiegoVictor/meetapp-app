import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import api from '../../services/api';
import { SignInSuccess, updateProfileSuccess } from '../actions/user';

function* signIn({ payload }) {
  try {
    const { email, password } = payload;
    const response = yield call(api.post, 'sessions', { email, password });

    const { token, user } = response.data;
    api.defaults.headers.Authorization = `Bearer ${token}`;

    yield put(SignInSuccess(token, user));
  } catch (err) {
    toast.error('Ops! Alguma coisa deu errado, tente novamente!');
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

    toast.success('Perfil atualizado com sucesso!');
    yield put(updateProfileSuccess(response.data));
  } catch (err) {
    toast.error('Ops! Alguma coisa deu errado, tente novamente!');
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
  takeLatest('persist/REHYDRATE', setToken),
]);
