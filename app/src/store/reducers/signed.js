const initial_state = false;

export default (state = initial_state, action) => {
  switch (action.type) {
    case '@user/SIGN_IN_SUCCESS':
      return true;

    case '@user/SIGN_OUT':
      return false;

    default:
      return state;
  }
};
