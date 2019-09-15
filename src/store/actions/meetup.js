export function UnsubscribeMeetupRequest(id) {
  return {
    type: '@meetup/UNSUBSCRIBE_MEETUP_REQUEST',
    payload: { id },
  };
}

export function UnsubscribeMeetupSuccess(id) {
  return {
    type: '@meetup/UNSUBSCRIBE_MEETUP_SUCCESS',
    payload: { id },
  };
}

export function SubscribeMeetupRequets(id) {
  return {
    type: '@meetup/SUBSCRIBE_MEETUP_REQUEST',
    payload: { id },
  };
}

export function SubscribeMeetupSuccess(id) {
  return {
    type: '@meetup/SUBSCRIBE_MEETUP_SUCCESS',
    payload: { id },
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
