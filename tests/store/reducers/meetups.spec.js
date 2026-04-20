import {
  appendMeetups,
  setMeetups,
  unsubscribeMeetupSuccess,
} from '~/store/actions/meetup';
import reducer, { initialState } from '~/store/reducers/meetups';
import factory from '../../utils/factory';

describe('Meetups reducer', () => {
  it('DEFAULT', async () => {
    const state = reducer(undefined, {});
    expect(state).toStrictEqual(initialState);
  });

  it('APPEND_MEETUPS', async () => {
    const meetup = await factory.attrs('Subscription');
    const state = reducer(initialState, appendMeetups([meetup]));
    expect(state).toContainEqual(meetup);
  });

  it('SET_MEETUPS', async () => {
    const meetup = await factory.attrs('Subscription');
    const state = reducer(initialState, setMeetups([meetup]));
    expect(state).toContainEqual(meetup);
  });

  it('UNSUBSCRIBE_MEETUP_SUCCESS', async () => {
    const meetup = await factory.attrs('Subscription');
    const state = reducer([meetup], unsubscribeMeetupSuccess(meetup));
    expect(state).not.toContainEqual(meetup);
  });
});
