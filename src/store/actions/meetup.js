export function cancelMeetup(id) {
  return {
    type: '@meetup/CANCEL_MEETUP',
    payload: { id },
  };
}
