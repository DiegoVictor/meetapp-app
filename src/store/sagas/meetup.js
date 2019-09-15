import { takeLatest, call, all } from 'redux-saga/effects';
import { Alert } from 'react-native';
import { navigate } from '../../services/navigator';
import api from '../../services/api';

function* cancelMeetup({ payload }) {
  try {
    const { id } = payload;
    yield call(api.delete, `meetups/${id}`);
    navigate('Dashboard');
  } catch (err) {
    Alert.alert('Ops! Alguma coisa deu errado, tente novamente!');
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
      Alert.alert('Meetup atualizado com sucesso!');
    } else {
      const { title, description, localization, date, banner_id } = payload;

      const response = yield call(api.post, 'meetups', {
        title,
        description,
        localization,
        date,
        banner_id,
      });
      navigate('Detail', response.data.id);
    }
  } catch (err) {
    Alert.alert('Ops! Alguma coisa deu errado, tente novamente!');
  }
}

export default all([
  takeLatest('@meetup/CANCEL_MEETUP', cancelMeetup),
  takeLatest('@meetup/UPSERT_MEETUP', upsertMeetup),
]);
