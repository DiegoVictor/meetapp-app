import { produce } from 'immer';

const initial_state = {
  token: null,
  user: null,
};

export default (state = initial_state, action) => {
  switch (action.type) {
    case '@user/SIGN_IN_SUCCESS':
      return produce(state, draft => {
        draft.token = action.payload.token;
        draft.profile = action.payload.user;
      });

    case '@user/SIGN_OUT':
      return initial_state;

    default:
      return state;
  }
};
