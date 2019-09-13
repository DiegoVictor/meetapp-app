import { takeLatest, call, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import history from '../../services/history';
import api from '../../services/api';

function* cancelMeetup({ payload }) {
  try {
    const { id } = payload;
    yield call(api.delete, `meetups/${id}`);
    history.push('/dashboard');
  } catch (err) {
    toast.error('Ops! Alguma coisa deu errado, tente novamente!');
  }
}

export default all([takeLatest('@meetup/CANCEL_MEETUP', cancelMeetup)]);
