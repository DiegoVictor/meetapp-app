import faker from 'faker';

import {
  signInSuccess,
  signOut,
  updateProfileSuccess,
} from '~/store/actions/user';
import reducer, { initialState } from '~/store/reducers/user';
import factory from '../../utils/factory';

describe('User reducer', () => {
  it('DEFAULT', async () => {
    const state = reducer(undefined, {});
    expect(state).toStrictEqual(initialState);
  });

  it('SIGN_IN_SUCCESS', async () => {
    const token = faker.random.alphaNumeric(16);
    const user = await factory.attrs('User');

    const state = reducer(initialState, signInSuccess(token, user));
    expect(state).toStrictEqual({
      token,
      email: user.email,
      name: user.name,
    });
  });

  it('SIGN_OUT', async () => {
    const state = reducer(initialState, signOut());
    expect(state).toStrictEqual(initialState);
  });

  it('UPDATE_PROFILE_SUCCESS', async () => {
    const token = faker.random.alphaNumeric(16);
    const [user, { name, email }] = await factory.attrsMany('User', 2);

    const state = reducer(
      { email: user.email, name: user.name, token },
      updateProfileSuccess({ email, name })
    );
    expect(state).toStrictEqual({
      email,
      name,
      token,
    });
  });
});
