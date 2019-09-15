import { produce } from 'immer';

const initial_state = [];

export default (state = initial_state, action) => {
  switch (action.type) {
    case '@meetup/UNSUBSCRIBE_MEETUP_SUCCESS':
      return produce(state, draft => {
        const index = draft.findIndex(m => m.id === action.payload.id);
        draft.splice(index, 1);
      });

    case '@meetup/SET_SUBSCRIPTIONS':
      return [...state, ...action.payload];

    default:
      return state;
  }
};
