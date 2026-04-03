export const initialState = false;

export default (state = initialState, action) => {
  switch (action.type) {
    case '@user/SIGN_IN_SUCCESS':
      return true;

    case '@user/SIGN_OUT':
      return false;

    default:
      return state;
  }
};
