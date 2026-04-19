import { produce } from 'immer';

export const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case '@meetup/APPEND_MEETUPS':
      return [...state, ...action.payload];

    case '@meetup/SET_MEETUPS':
      return action.payload;

    case '@meetup/UNSUBSCRIBE_MEETUP_SUCCESS':
      return produce(state, draft => {
        const index = draft.findIndex(m => m.id === action.payload.id);
        draft.splice(index, 1);
      });

    default:
      return state;
  }
};
