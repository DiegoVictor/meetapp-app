import { Alert } from 'react-native';
import { runSaga } from 'redux-saga';
import { call, put } from 'redux-saga/effects';

import {
  subscribeMeetupRequets,
  subscribeMeetupSuccess,
  unsubscribeMeetupRequest,
  unsubscribeMeetupSuccess,
} from '~/store/actions/meetup';
import { subscribeMeetup, unsubscribeMeetup } from '~/store/sagas/meetup';
import factory from '../../utils/factory';

jest.mock('redux-saga/effects');

describe('Meetups saga', () => {
  it('should be able to subscribe to a meetup', async () => {
    const meetup = await factory.attrs('Subscription');
    const dispatch = jest.fn();

    call.mockImplementation(() => ({ data: meetup }));
    const alert = jest.spyOn(Alert, 'alert');

    await runSaga(
      { dispatch },
      subscribeMeetup,
      subscribeMeetupRequets({ id: meetup.id })
    );

    expect(put).toHaveBeenCalledWith(subscribeMeetupSuccess({ id: meetup.id }));
    expect(alert).toHaveBeenCalledWith('Inscrição efetuada com sucesso!');
  });

  it('should not be able to subscribe to a meetup with network error', async () => {
    const meetup = await factory.attrs('Subscription');
    const dispatch = jest.fn();

    call.mockImplementation(() => {
      throw new Error();
    });
    const alert = jest.spyOn(Alert, 'alert');

    await runSaga(
      { dispatch },
      subscribeMeetup,
      subscribeMeetupRequets({ id: meetup.id })
    );

    expect(put).not.toHaveBeenCalled();
    expect(alert).toHaveBeenCalledWith(
      'Ops! Alguma coisa deu errado, tente novamente!'
    );
  });

  it('should be able to unsubscribe from a meetup', async () => {
    const meetup = await factory.attrs('Subscription');
    const dispatch = jest.fn();

    call.mockImplementation(() => ({ data: meetup }));
    const alert = jest.spyOn(Alert, 'alert');

    await runSaga(
      { dispatch },
      unsubscribeMeetup,
      unsubscribeMeetupRequest({ id: meetup.id })
    );

    expect(put).toHaveBeenCalledWith(
      unsubscribeMeetupSuccess({ id: meetup.id })
    );
    expect(alert).toHaveBeenCalledWith('Inscrição cancelada com sucesso!');
  });

  it('should be able to unsubscribe from a meetup', async () => {
    const meetup = await factory.attrs('Subscription');
    const dispatch = jest.fn();

    call.mockImplementation(() => {
      throw new Error();
    });
    const alert = jest.spyOn(Alert, 'alert');

    await runSaga(
      { dispatch },
      unsubscribeMeetup,
      unsubscribeMeetupRequest({ id: meetup.id })
    );

    expect(put).not.toHaveBeenCalled();
    expect(alert).toHaveBeenCalledWith(
      'Ops! Alguma coisa deu errado, tente novamente!'
    );
  });
});
