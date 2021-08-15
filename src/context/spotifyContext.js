import { createContext, useReducer, useEffect } from "react";
import Reducer from "./Reducers";

const initiale_state = {
  spotifyToken: localStorage.getItem("spotifyToken") || null,
  refreshToken: localStorage.getItem("refreshToken") || null,
  code: localStorage.getItem("spotifyCode") || null,
  isFetching: false,
  error: false,
};

export const SpotifyContext = createContext(initiale_state);
export const SpotifyContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, initiale_state);

  useEffect(() => {
    localStorage.setItem("spotifyToken", state.spotifyToken);
    localStorage.setItem("refreshToken", state.refreshToken);
    localStorage.setItem("spotifyCode", state.code);
  }, [state.refreshToken, state.spotifyToken, state.code]);

  return (
    <SpotifyContext.Provider
      value={{
        spotifyToken: state.spotifyToken,
        refreshToken: state.refreshToken,
        code: state.code,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </SpotifyContext.Provider>
  );
};
