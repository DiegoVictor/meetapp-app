import { takeLatest, call, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import history from '~/services/history';
import api from '~/services/api';

function* cancelMeetup({ payload }) {
  try {
    const { id } = payload;
    yield call(api.delete, `meetups/${id}`);
    history.push('/dashboard');
  } catch (err) {
    toast.error('Ops! Alguma coisa deu errado, tente novamente!');
  }
}

function* upsertMeetup({ payload }) {
  try {
    if (typeof payload.id === 'string') {
      const { id, title, description, localization, date, banner_id } = payload;
      yield call(api.put, `/meetups/${id}`, {
        title,
        description,
        localization,
        date,
        banner_id,
      });
      toast.success('Meetup atualizado com sucesso!');
    } else {
      const { title, description, localization, date, banner_id } = payload;

      const response = yield call(api.post, 'meetups', {
        title,
        description,
        localization,
        date,
        banner_id,
      });
      history.push(`/meetups/${response.data.id}`);
    }
  } catch (err) {
    toast.error('Ops! Alguma coisa deu errado, tente novamente!');
  }
}

export default all([
  takeLatest('@meetup/CANCEL_MEETUP', cancelMeetup),
  takeLatest('@meetup/UPSERT_MEETUP', upsertMeetup),
]);
