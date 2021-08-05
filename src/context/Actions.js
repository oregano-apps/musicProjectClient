export const LoginStart = (userCredentials) => ({
  type: "LOGIN_STSRT",
});

export const LoginSuccess = (user, token) => ({
  type: "LOGIN_SUCCESS",
  payload: { user: user, token: token },
});

export const LoginSpotify = (user, token, spotifyToken) => ({
  type: "LOGIN_SPOTIFY",
  payload: { user: user, token: token, spotifyToken: spotifyToken },
});

export const LoginFailure = (error) => ({
  type: "LOGIN_FAILURE",
  payload: error,
});

export const Logout = (userId) => ({
  type: "LOGOUT",
  payload: userId,
});
