import { createContext, useReducer, useEffect } from "react";
import Reducer from "./Reducers";

const initiale_state = {
  user: JSON.parse(localStorage.getItem("oreganoUser")) || null,
  token: localStorage.getItem("oreganoToken") || null,
  spotifyToken: localStorage.getItem("spotifyToken") || null,
  isFetching: false,
  error: false,
};

export const Context = createContext(initiale_state);
export const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, initiale_state);

  useEffect(() => {
    localStorage.setItem("oreganoUser", JSON.stringify(state.user));
    localStorage.setItem("oreganoToken", state.token);
    localStorage.setItem("spotifyToken", JSON.stringify(state.spotifyToken));
  }, [state.user, state.token]);

  return (
    <Context.Provider
      value={{
        user: state.user,
        token: state.token,
        spotifyToken: state.spotifyToken,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </Context.Provider>
  );
};
