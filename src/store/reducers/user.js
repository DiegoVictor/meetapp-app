import { produce } from 'immer';

const initial_state = {
  token: null,
};

export default (state = initial_state, action) => {
  switch (action.type) {
    case '@user/SIGN_IN_SUCCESS':
      return produce(state, draft => {
        draft.token = action.payload.token;
        draft.name = action.payload.user.name;
        draft.email = action.payload.user.email;
      });

    case '@user/UPDATE_USER_SUCCESS':
      return produce(state, draft => {
        draft.name = action.payload.name;
        draft.email = action.payload.email;
      });

    case '@user/SIGN_OUT':
      return initial_state;

    default:
      return state;
  }
};
