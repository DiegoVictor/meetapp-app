import faker from 'faker';
import reducer, { initial_state } from '~/store/reducers/user';
import {
  signInSuccess,
  updateProfileSuccess,
  signOut,
} from '~/store/actions/user';

describe('User reducer', () => {
  it('DEFAULT', () => {
    const state = reducer(undefined, {});
    expect(state).toStrictEqual(initial_state);
  });

  it('SIGN_IN_SUCCESS', () => {
    const token = faker.random.alphaNumeric(16);
    const user = {
      email: faker.internet.email(),
      name: faker.name.findName(),
    };
    const state = reducer(initial_state, signInSuccess(token, user));

    expect(state).toStrictEqual({ token, ...user });
  });

  it('UPDATE_USER_SUCCESS', () => {
    const user = {
      email: faker.internet.email(),
      name: faker.name.findName(),
    };
    const state = reducer(initial_state, updateProfileSuccess(user));

    expect(state).toStrictEqual({ token: null, ...user });
  });

  it('SIGN_OUT', () => {
    const state = reducer(true, signOut());
    expect(state).toStrictEqual(initial_state);
  });
});
