export function cancelMeetup(id) {
  return {
    type: '@meetup/CANCEL_MEETUP',
    payload: { id },
  };
}

export function upsertMeetup(payload) {
  return {
    type: '@meetup/UPSERT_MEETUP',
    payload,
  };
}
