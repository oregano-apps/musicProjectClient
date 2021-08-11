import axios from "axios";

export const loginCall = async (userCredential, dispatch) => {
  dispatch({ type: "LOGIN_START" });
  try {
    const res = await axios.post("http://localhost:8800/api/users/login", userCredential);
    dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
  } catch (err) {
    dispatch({ type: "LOGIN_FAILURE", payload: err });
  }
};

export const spotifyLoginCall = async (spotifyToken, refreshToken, code, dispatch) => {
  dispatch({ type: "LOGIN_SPOTIFY", payload: {spotifyToken, refreshToken, code} });
}

export const addSongToPlaylistCall = async (song, dispatch) => {
  dispatch({type: "ADD_TO_PLAYLIST", payload: song})
}