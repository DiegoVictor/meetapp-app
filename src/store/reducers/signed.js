const initial_state = false;

export default (state = initial_state, action) => {
  switch (action.type) {
    case '@user/SIGN_IN_SUCCESS':
      return true;

    default:
      return state;
  }
};
