export const LoginStart = (userCredentials) => ({
  type: "LOGIN_STSRT",
});

export const LoginSuccess = (user, token) => ({
  type: "LOGIN_SUCCESS",
  payload: { user: user, token: token },
});

export const LoginSpotify = (spotifyToken, refreshToken) => ({
  type: "LOGIN_SPOTIFY",
  payload: {spotifyToken: spotifyToken, refreshToken: refreshToken },
});

export const LoginFailure = (error) => ({
  type: "LOGIN_FAILURE",
  payload: error,
});

export const Logout = (userId) => ({
  type: "LOGOUT",
  payload: userId,
});

export const AddToPlaylist = (song) => ({
  type: "ADD_TO_PLAYLIST",
  payload: song,
})
