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
    case "ADD_TO_PLAYLIST":
      return {
        playlist: [...state.playlist, action.payload],
        isFetching: false,
        error: false,
      }
    case "DELETE_FROM_PLAYLIST":
      return {
        playlist: state.playlist.filter((song) => song !== action.payload),
        isFetching: false,
        error: false,
      }
      case "LIKE_SONG":
        console.log(...state.user.lovedSongs)
        return {
          user: {...state.user, lovedSongs: [...state.user.lovedSongs, action.payload]},
          token: state.token,
          isFetching: state.isFetching,
          error: state.error,
        }
        case "UNLIKE_SONG":
          return {
            user: {...state.user, lovedSongs: state.user.lovedSongs.filter(
              (song) => song !== action.payload
            ),},
            token: state.token,
            isFetching: state.isFetching,
            error: state.error,
          }
    default:
      return state;
  }
};

export default Reducer;
