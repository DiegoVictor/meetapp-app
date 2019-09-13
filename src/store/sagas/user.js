import { takeLatest, call, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import api from '../../services/api';
import { SignInSuccess } from '../actions/user';

export function* signIn({ payload }) {
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

export default function*() {
  yield takeLatest('@user/SIGN_IN_REQUEST', signIn);
}
