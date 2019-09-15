import { takeLatest, call, all, put } from 'redux-saga/effects';
import { Alert } from 'react-native';
import api from '../../services/api';
import {
  SubscribeMeetupSuccess,
  UnsubscribeMeetupSuccess,
} from '../actions/meetup';

function* UnsubscribeMeetup({ payload }) {
  try {
    const { id } = payload;
    yield call(api.delete, `/subscriptions/${id}`);
    yield put(UnsubscribeMeetupSuccess(payload));
    Alert.alert('Inscrição cancelada com sucesso!');
  } catch (err) {
    Alert.alert('Ops! Alguma coisa deu errado, tente novamente!');
  }
}

function* SubscribeMeetup({ payload }) {
  try {
    const { id } = payload;
    yield call(api.post, `/subscriptions`, { meetup_id: id });
    yield put(SubscribeMeetupSuccess(payload));
    Alert.alert('Inscrição efetuada com sucesso!');
  } catch (err) {
    Alert.alert('Ops! Alguma coisa deu errado, tente novamente!');
  }
}

export default all([
  takeLatest('@meetup/UNSUBSCRIBE_MEETUP_REQUEST', UnsubscribeMeetup),
  takeLatest('@meetup/SUBSCRIBE_MEETUP_REQUEST', SubscribeMeetup),
]);
