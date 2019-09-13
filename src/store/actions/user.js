export function SignInRequest(email, password) {
  return {
    type: '@user/SIGN_IN_REQUEST',
    payload: { email, password },
  };
}

export function SignInSuccess(token, user) {
  return {
    type: '@user/SIGN_IN_SUCCESS',
    payload: { token, user },
  };
}

export function SignUpRequest(name, email, password) {
  return {
    type: '@user/SIGN_UP_REQUEST',
    payload: { name, email, password },
  };
}

export function SignOut() {
  return {
    type: '@user/SIGN_OUT',
  };
}

export function updateUserRequest(payload) {
  return {
    type: '@user/UPDATE_USER_REQUEST',
    payload,
  };
}

export function updateProfileSuccess(payload) {
  return {
    type: '@user/UPDATE_USER_SUCCESS',
    payload,
  };
}
