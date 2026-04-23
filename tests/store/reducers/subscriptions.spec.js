import {
  subscribeMeetupSuccess,
  unsubscribeMeetupSuccess,
} from '~/store/actions/meetup';
import { setSubscriptions } from '~/store/actions/subscription';
import reducer, { initialState } from '~/store/reducers/subscriptions';
import factory from '../../utils/factory';

describe('Subscriptions reducer', () => {
  it('DEFAULT', async () => {
    const state = reducer(undefined, {});
    expect(state).toStrictEqual(initialState);
  });

  it('SET_SUBSCRIPTIONS', async () => {
    const meetup = await factory.attrs('Subscription');
    const state = reducer(initialState, setSubscriptions([meetup]));
    expect(state).toContainEqual(meetup);
  });

  it('SUBSCRIBE_MEETUP_SUCCESS', async () => {
    const [meetup1, meetup2] = await factory.attrsMany('Subscription', 2);
    const state = reducer([meetup1], subscribeMeetupSuccess(meetup2));
    expect(state).toContainEqual(meetup1);
    expect(state).toContainEqual(meetup2);
  });

  it('UNSUBSCRIBE_MEETUP_SUCCESS', async () => {
    const [meetup1, meetup2] = await factory.attrsMany('Subscription', 2);
    const state = reducer(
      [meetup1, meetup2],
      unsubscribeMeetupSuccess(meetup1)
    );
    expect(state).not.toContainEqual(meetup1);
  });
});
