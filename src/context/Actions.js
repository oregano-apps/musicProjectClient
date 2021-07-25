export const LoginStart = (userCredentials) => ({
  type: "LOGIN_STSRT",
});

export const LoginSuccess = (user, socket) => ({
  type: "LOGIN_SUCCESS",
  payload: { user: user, socket: socket },
});

export const LoginFailure = (error) => ({
  type: "LOGIN_FAILURE",
  payload: error,
});

export const Logout = (userId) => ({
  type: "LOGOUT",
  payload: userId,
});
