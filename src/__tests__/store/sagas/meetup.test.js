import { runSaga } from 'redux-saga';
import faker from 'faker';
import MockAdapter from 'axios-mock-adapter';
import { toast } from 'react-toastify';

import { cancelMeetup, upsertMeetup } from '~/store/sagas/meetup';
import api from '~/services/api';
import history from '~/services/history';
import * as Actions from '~/store/actions/meetup';

const api_mock = new MockAdapter(api);
const id = faker.random.number();

jest.mock('~/services/history');
history.push = jest.fn();

jest.mock('react-toastify');
toast.error = jest.fn();
toast.success = jest.fn();

describe('Meetup saga', () => {
  it('should be able to cancel a meetup', async () => {
    api_mock.onDelete(`meetups/${id}`).reply(200, { id });
    await runSaga({}, cancelMeetup, Actions.cancelMeetup(id)).toPromise();
    expect(history.push).toHaveBeenCalledWith('/dashboard');
  });

  it('should not be able cancel a meetup', async () => {
    api_mock.onDelete(`meetups/${id}`).reply(401, {
      message: "You can't remove past meetups",
    });
    await runSaga({}, cancelMeetup, Actions.cancelMeetup(id)).toPromise();
    expect(toast.error).toHaveBeenCalledWith(
      'Ops! Alguma coisa deu errado, tente novamente!'
    );
  });

  it('should be able to update a meetup', async () => {
    api_mock.onPut(`meetups/${id}`).reply(200);

    await runSaga(
      {},
      upsertMeetup,
      Actions.upsertMeetup({
        id,
        title: faker.name.title(),
        description: faker.lorem.paragraphs(2),
        localization: faker.address.streetAddress(),
        date: faker.date.future(),
        banner_id: faker.random.number(),
      })
    ).toPromise();

    expect(toast.success).toHaveBeenCalledWith(
      'Meetup atualizado com sucesso!'
    );
  });

  it('should be able to create a meetup', async () => {
    api_mock.onPost(`meetups`).reply(200, { id });
    await runSaga(
      {},
      upsertMeetup,
      Actions.upsertMeetup({
        title: faker.name.title(),
        description: faker.lorem.paragraphs(2),
        localization: faker.address.streetAddress(),
        date: faker.date.future(),
        banner_id: faker.random.number(),
      })
    ).toPromise();
    expect(history.push).toHaveBeenCalledWith(`/meetups/${id}`);
  });

  it('should be able to create a meetup', async () => {
    api_mock
      .onPost(`meetups`)
      .reply(400, { message: 'Meetup does not exists' });

    await runSaga(
      {},
      upsertMeetup,
      Actions.upsertMeetup({
        title: faker.name.title(),
        description: faker.lorem.paragraphs(2),
        localization: faker.address.streetAddress(),
        date: faker.date.future(),
        banner_id: faker.random.number(),
      })
    ).toPromise();

    expect(toast.error).toHaveBeenCalledWith(
      'Ops! Alguma coisa deu errado, tente novamente!'
    );
  });

  it('should not be able to update a meetup', async () => {
    api_mock
      .onPut(`meetups/${id}`)
      .reply(400, { message: 'Meetup does not exists' });

    await runSaga(
      {},
      upsertMeetup,
      Actions.upsertMeetup({
        id,
        title: faker.name.title(),
        description: faker.lorem.paragraphs(2),
        localization: faker.address.streetAddress(),
        date: faker.date.future(),
        banner_id: faker.random.number(),
      })
    ).toPromise();

    expect(toast.error).toHaveBeenCalledWith(
      'Ops! Alguma coisa deu errado, tente novamente!'
    );
  });
});
