import { produce } from 'immer';

export const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case '@meetup/SET_SUBSCRIPTIONS':
      return action.payload;

    case '@meetup/SUBSCRIBE_MEETUP_SUCCESS':
      return produce(state, draft => {
        draft.push(action.payload);
        draft.sort((a, b) => (a.title < b.title ? -1 : 1));
        draft.sort((a, b) => new Date(a.date) - new Date(b.date));
      });

    case '@meetup/UNSUBSCRIBE_MEETUP_SUCCESS':
      return produce(state, draft => {
        const index = draft.findIndex(m => m.id === action.payload.id);
        draft.splice(index, 1);
      });

    default:
      return state;
  }
};
