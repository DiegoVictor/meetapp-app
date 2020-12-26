import faker from 'faker';
import MockAdapter from 'axios-mock-adapter';
import { runSaga } from 'redux-saga';
import { toast } from 'react-toastify';

import api from '~/services/api';
import { signIn, signUp, updateUser, setToken } from '~/store/sagas/user';
import history from '~/services/history';
import {
  signInRequest,
  signInSuccess,
  signUpRequest,
  updateProfileRequest,
  updateProfileSuccess,
} from '~/store/actions/user';

jest.mock('react-toastify');
toast.error = jest.fn();
toast.success = jest.fn();

jest.mock('~/services/history');
history.push = jest.fn();

const api_mock = new MockAdapter(api);

describe('User saga', () => {
  beforeEach(() => {
    if (typeof api.defaults.headers.Authorization === 'string') {
      delete api.defaults.headers.Authorization;
    }
  });

  it('should be able to login', async () => {
    const token = faker.random.alphaNumeric(32);
    const dispatch = jest.fn();
    const user = {
      id: faker.random.number(),
      name: faker.name.findName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    };

    api_mock.onPost('sessions').reply(200, { token, user });

    await runSaga(
      { dispatch },
      signIn,
      signInRequest(user.email, user.password)
    ).toPromise();

    expect(api.defaults.headers.Authorization).toBe(`Bearer ${token}`);
    expect(dispatch).toHaveBeenCalledWith(signInSuccess(token, user));
  });

  it('should not be able to login', async () => {
    const dispatch = jest.fn();
    const user = {
      email: faker.internet.email(),
      password: faker.internet.password(),
    };

    api_mock.onPost('sessions').reply(400, { message: 'User not found' });

    await runSaga(
      { dispatch },
      signIn,
      signInRequest(user.email, user.password)
    ).toPromise();

    expect(toast.error).toHaveBeenCalledWith(
      'Ops! Alguma coisa deu errado, tente novamente!'
    );
  });

  it('should be able to signup', async () => {
    const user = {
      name: faker.name.findName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    };

    api_mock.onPost('users').reply(200);
    await runSaga(
      {},
      signUp,
      signUpRequest(user.email, user.name, user.password)
    ).toPromise();
    expect(history.push).toHaveBeenCalledWith('/');
  });

  it('should not be able to signup', async () => {
    const user = {
      name: faker.name.findName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    };

    api_mock.onPost('users').reply(400);
    await runSaga(
      {},
      signUp,
      signUpRequest(user.email, user.name, user.password)
    ).toPromise();
    expect(toast.error).toHaveBeenCalledWith(
      'Ops! Alguma coisa deu errado, tente novamente!'
    );
  });

  it('should be able to update user email and name', async () => {
    const dispatch = jest.fn();
    const user = {
      email: faker.internet.email(),
      name: faker.name.findName(),
    };

    api_mock.onPut('users').reply(200, user);
    await runSaga(
      { dispatch },
      updateUser,
      updateProfileRequest(user)
    ).toPromise();

    expect(toast.success).toHaveBeenCalledWith(
      'Perfil atualizado com sucesso!'
    );
    expect(dispatch).toHaveBeenCalledWith(updateProfileSuccess(user));
  });

  it('should be able to update user password', async () => {
    const dispatch = jest.fn();
    const password = faker.internet.password();
    const user = {
      email: faker.internet.email(),
      name: faker.name.findName(),
    };

    api_mock.onPut('users').reply(200, user);
    await runSaga(
      { dispatch },
      updateUser,
      updateProfileRequest({
        ...user,
        old_password: faker.internet.password(),
        password,
        confirm_password: password,
      })
    ).toPromise();

    expect(toast.success).toHaveBeenCalledWith(
      'Perfil atualizado com sucesso!'
    );
    expect(dispatch).toHaveBeenCalledWith(updateProfileSuccess(user));
  });

  it('should not be able to update user', async () => {
    const user = {
      email: faker.internet.email(),
      name: faker.name.findName(),
    };

    api_mock.onPut('users').reply(400, { message: 'Password does not match' });
    await runSaga({}, updateUser, updateProfileRequest(user)).toPromise();

    expect(toast.error).toHaveBeenCalledWith(
      'Ops! Alguma coisa deu errado, tente novamente!'
    );
  });

  it('should be able to store the token', async () => {
    const token = faker.random.alphaNumeric(32);

    setToken({ payload: { user: { token } } });
    expect(api.defaults.headers.Authorization).toBe(`Bearer ${token}`);
  });

  it('should not be able to store the token', async () => {
    setToken({});
    expect(api.defaults.headers.Authorization).toBeUndefined();
  });
});
