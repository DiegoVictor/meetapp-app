import { Alert } from 'react-native';
import { all, call, put, takeLatest } from 'redux-saga/effects';

import {
  unsubscribeMeetupSuccess,
  subscribeMeetupSuccess,
} from '../actions/meetup';
import api from '~/services/api';

function* UnsubscribeMeetup({ payload }) {
  try {
    const { id } = payload;

    yield call(api.delete, `/subscriptions/${id}`);
    yield put(unsubscribeMeetupSuccess(payload));

    Alert.alert('Inscrição cancelada com sucesso!');
  } catch (err) {
    Alert.alert('Ops! Alguma coisa deu errado, tente novamente!');
  }
}

function* SubscribeMeetup({ payload }) {
  try {
    const { id } = payload;

    yield call(api.post, `/subscriptions`, { meetup_id: id });
    yield put(subscribeMeetupSuccess(payload));

    Alert.alert('Inscrição efetuada com sucesso!');
  } catch (err) {
    Alert.alert('Ops! Alguma coisa deu errado, tente novamente!');
  }
}

export default all([
  takeLatest('@meetup/SUBSCRIBE_MEETUP_REQUEST', SubscribeMeetup),
  takeLatest('@meetup/UNSUBSCRIBE_MEETUP_REQUEST', UnsubscribeMeetup),
]);
