import { Alert } from 'react-native';
import { runSaga } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import faker from 'faker';

import { setNavigator } from '~/services/navigator';
import {
  signInRequest,
  signInSuccess,
  updateProfileRequest,
  updateProfileSuccess,
} from '~/store/actions/user';
import { setToken, signIn, signUp, updateUser } from '~/store/sagas/user';
import factory from '../../utils/factory';
import api from '~/services/api';

jest.mock('redux-saga/effects');

const mockedNavigate = jest.fn(args => args);
jest.mock('react-navigation', () => {
  return {
    NavigationActions: {
      navigate: args => {
        return mockedNavigate(args);
      },
    },
  };
});

describe('User saga', () => {
  it('should be able to update user', async () => {
    const user = await factory.attrs('User');
    const dispatch = jest.fn();

    call.mockImplementation(() => ({ data: user }));
    const alert = jest.spyOn(Alert, 'alert');

    await runSaga(
      { dispatch },
      updateUser,
      updateProfileRequest({
        ...user,
        old_password: user.password,
        confirm_password: user.password,
      })
    );

    expect(put).toHaveBeenCalledWith(updateProfileSuccess(user));
    expect(alert).toHaveBeenCalledWith('Perfil atualizado com sucesso!');
  });

  it('should not be able to update user with network error', async () => {
    const user = await factory.attrs('User');
    const dispatch = jest.fn();

    call.mockImplementation(() => {
      throw new Error();
    });
    const alert = jest.spyOn(Alert, 'alert');

    await runSaga({ dispatch }, updateUser, updateProfileRequest(user));

    expect(put).not.toHaveBeenCalled();
    expect(alert).toHaveBeenCalledWith(
      'Ops! Alguma coisa deu errado, tente novamente!'
    );
  });

  it('should be able to sign up', async () => {
    const { email, name, pasword } = await factory.attrs('User');
    const dispatch = jest.fn();

    call.mockImplementation(jest.fn());
    setNavigator({ dispatch: jest.fn() });

    await runSaga(
      { dispatch },
      signUp,
      signInRequest({ email, name, pasword })
    );

    expect(mockedNavigate).toHaveBeenCalledWith({ routeName: 'SignIn' });
  });

  it('should not be able to sign up with network error', async () => {
    const { email, name, pasword } = await factory.attrs('User');
    const dispatch = jest.fn();

    call.mockImplementation(() => {
      throw new Error();
    });
    setNavigator({ dispatch: jest.fn() });
    const alert = jest.spyOn(Alert, 'alert');

    await runSaga(
      { dispatch },
      signUp,
      signInRequest({ email, name, pasword })
    );

    expect(mockedNavigate).not.toHaveBeenCalledWith();
    expect(alert).toHaveBeenCalledWith(
      'Ops! Alguma coisa deu errado, tente novamente!'
    );
  });

  it('should be able to sign in', async () => {
    const token = faker.random.alphaNumeric(16);
    const { name, email, password } = await factory.attrs('User');
    const dispatch = jest.fn();

    call.mockImplementation(() => ({
      data: {
        token,
        user: {
          email,
          password,
          name,
        },
      },
    }));

    await runSaga({ dispatch }, signIn, signInRequest({ email, password }));

    expect(put).toHaveBeenCalledWith(
      signInSuccess(token, {
        email,
        password,
        name,
      })
    );
  });

  it('should not be able to sign in with network error', async () => {
    const { email, password } = await factory.attrs('User');
    const dispatch = jest.fn();

    call.mockImplementation(() => {
      throw new Error();
    });
    const alert = jest.spyOn(Alert, 'alert');

    await runSaga({ dispatch }, signIn, signInRequest({ email, password }));

    expect(put).not.toHaveBeenCalled();
    expect(alert).toHaveBeenCalledWith(
      'Ops! Alguma coisa deu errado, tente novamente!'
    );
  });

  it('should be able to store user token', async () => {
    const token = faker.random.alphaNumeric(16);

    setToken({
      type: 'persist/REHYDRATE',
      payload: { user: { token } },
    });

    expect(api.defaults.headers.Authorization).toBe(`Bearer ${token}`);
  });

  it('should not be able to store user token', async () => {
    const token = faker.random.alphaNumeric(16);

    setToken({
      type: 'persist/REHYDRATE',
    });

    expect(api.defaults.headers.Authorization).not.toBe(`Bearer ${token}`);
  });
});
