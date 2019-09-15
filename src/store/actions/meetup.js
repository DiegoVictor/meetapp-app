export function UnsubscribeMeetupRequest(payload) {
  return {
    type: '@meetup/UNSUBSCRIBE_MEETUP_REQUEST',
    payload,
  };
}

export function UnsubscribeMeetupSuccess(payload) {
  return {
    type: '@meetup/UNSUBSCRIBE_MEETUP_SUCCESS',
    payload,
  };
}

export function SubscribeMeetupRequets(payload) {
  return {
    type: '@meetup/SUBSCRIBE_MEETUP_REQUEST',
    payload,
  };
}

export function SubscribeMeetupSuccess(payload) {
  return {
    type: '@meetup/SUBSCRIBE_MEETUP_SUCCESS',
    payload,
  };
}

export function SetMeetups(payload) {
  return {
    type: '@meetup/SET_MEETUPS',
    payload,
  };
}

export function AppendMeetups(payload) {
  return {
    type: '@meetup/APPEND_MEETUPS',
    payload,
  };
}
