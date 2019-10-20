import faker from 'faker';
import reducer, { initial_state } from '~/store/reducers/signed';
import { signInSuccess, signOut } from '~/store/actions/user';

describe('Signed reducer', () => {
  it('DEFAULT', () => {
    const state = reducer(undefined, {});
    expect(state).toBe(initial_state);
  });

  it('SIGN_IN_SUCCESS', () => {
    const state = reducer(
      initial_state,
      signInSuccess(faker.random.alphaNumeric(16), {
        email: faker.internet.email(),
        name: faker.name.findName(),
      })
    );

    expect(state).toBe(true);
  });

  it('SIGN_OUT', () => {
    const state = reducer(true, signOut());
    expect(state).toBe(false);
  });
});
