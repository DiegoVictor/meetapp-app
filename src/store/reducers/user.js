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
        draft.user = action.payload.user;
      });

    default:
      return state;
  }
};
