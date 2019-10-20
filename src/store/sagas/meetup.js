import { toast } from 'react-toastify';
import { all, call, takeLatest } from 'redux-saga/effects';

import api from '~/services/api';
import history from '~/services/history';

export function* cancelMeetup({ payload }) {
  try {
    const { id } = payload;
    yield call(api.delete, `meetups/${id}`);

    history.push('/dashboard');
  } catch (err) {
    toast.error('Ops! Alguma coisa deu errado, tente novamente!');
  }
}

export function* upsertMeetup({ payload }) {
  try {
    if (typeof payload.id === 'string') {
      const { banner_id, date, description, id, localization, title } = payload;
      yield call(api.put, `/meetups/${id}`, {
        banner_id,
        date,
        description,
        localization,
        title,
      });
      toast.success('Meetup atualizado com sucesso!');
    } else {
      const { banner_id, date, description, localization, title } = payload;

      const response = yield call(api.post, 'meetups', {
        banner_id,
        date,
        description,
        localization,
        title,
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
