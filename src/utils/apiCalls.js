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

export const spotifyLoginCall = async(spotifyToken, user, token, dispatch) => {
  dispatch({ type: "LOGIN_SPOTIFY", payload: {spotifyToken, user, token} });
}