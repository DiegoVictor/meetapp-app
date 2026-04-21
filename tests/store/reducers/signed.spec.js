import faker from 'faker';

import { signInSuccess, signOut } from '~/store/actions/user';
import reducer, { initialState } from '~/store/reducers/signed';
import factory from '../../utils/factory';

describe('Signed reducer', () => {
  it('DEFAULT', async () => {
    const state = reducer(undefined, {});
    expect(state).toStrictEqual(initialState);
  });

  it('SIGN_OUT', async () => {
    const state = reducer(initialState, signOut());
    expect(state).toBe(false);
  });

  it('SIGN_IN_SUCCESS', async () => {
    const token = faker.random.alphaNumeric(16);
    const user = await factory.attrs('User');

    const state = reducer(initialState, signInSuccess(token, user));
    expect(state).toBe(true);
  });
});
