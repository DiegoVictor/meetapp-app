export function appendMeetups(payload) {
  return {
    type: '@meetup/APPEND_MEETUPS',
    payload,
  };
}

export function setMeetups(payload) {
  return {
    type: '@meetup/SET_MEETUPS',
    payload,
  };
}

export function subscribeMeetupRequets(payload) {
  return {
    type: '@meetup/SUBSCRIBE_MEETUP_REQUEST',
    payload,
  };
}

export function subscribeMeetupSuccess(payload) {
  return {
    type: '@meetup/SUBSCRIBE_MEETUP_SUCCESS',
    payload,
  };
}

export function unsubscribeMeetupRequest(payload) {
  return {
    type: '@meetup/UNSUBSCRIBE_MEETUP_REQUEST',
    payload,
  };
}

export function unsubscribeMeetupSuccess(payload) {
  return {
    type: '@meetup/UNSUBSCRIBE_MEETUP_SUCCESS',
    payload,
  };
}
