export function signInRequest(email, password) {
  return {
    type: '@user/SIGN_IN_REQUEST',
    payload: { email, password },
  };
}

export function signInSuccess(token, user) {
  return {
    type: '@user/SIGN_IN_SUCCESS',
    payload: { token, user },
  };
}

export function signOut() {
  return {
    type: '@user/SIGN_OUT',
  };
}

export function signUpRequest(email, name, password) {
  return {
    type: '@user/SIGN_UP_REQUEST',
    payload: { email, name, password },
  };
}

export function updateProfileSuccess(payload) {
  return {
    type: '@user/UPDATE_USER_SUCCESS',
    payload,
  };
}

export function updateUserRequest(payload) {
  return {
    type: '@user/UPDATE_USER_REQUEST',
    payload,
  };
}
