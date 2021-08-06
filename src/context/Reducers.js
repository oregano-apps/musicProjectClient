const Reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        user: null,
        token: null,
        isFetching: true,
        error: false,
      };
    case "LOGIN_SUCCESS":
      return {
        user: action.payload.user,
        token: action.payload.token,
        isFetching: false,
        error: false,
      };
    case "LOGIN_SPOTIFY":
      console.log(action.payload)
        return {
          spotifyToken: action.payload.spotifyToken,
          refreshToken: action.payload.refreshToken,
          code: action.payload.code,
          isFetching: false,
          error: false,
        };
    case "LOGIN_FAILURE":
      return {
        user: null,
        token: null,
        isFetching: false,
        error: action.payload,
      };

    case "LOGOUT":
      return {
        user: null,
        token: null,
        isFetching: false,
        error: false,
      };
    default:
      return state;
  }
};

export default Reducer;
