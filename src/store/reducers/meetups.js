import { produce } from 'immer';

const initial_state = [];

export default (state = initial_state, action) => {
  switch (action.type) {
    case '@meetup/SET_MEETUPS':
      return action.payload;

    case '@meetup/APPEND_MEETUPS':
      return [...state, ...action.payload];

    case '@meetup/SUBSCRIBE_MEETUP_SUCCESS':
      return produce(state, draft => {
        const index = draft.findIndex(m => m.id === action.payload.id);
        draft.splice(index, 1);
      });

    default:
      return state;
  }
};
