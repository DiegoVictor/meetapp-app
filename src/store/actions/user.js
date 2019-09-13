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
