import { produce } from 'immer';

export const initial_state = {
  token: null,
};

export default (state = initial_state, action) => {
  switch (action.type) {
    case '@user/SIGN_IN_SUCCESS':
      return produce(state, draft => {
        draft.email = action.payload.user.email;
        draft.name = action.payload.user.name;
        draft.token = action.payload.token;
      });

    case '@user/UPDATE_USER_SUCCESS':
      return produce(state, draft => {
        draft.email = action.payload.email;
        draft.name = action.payload.name;
      });

    case '@user/SIGN_OUT':
      return initial_state;

    default:
      return state;
  }
};
