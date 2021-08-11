import { createContext, useReducer, useEffect } from "react";
import Reducer from "./Reducers";

const initiale_state = {
  playlist: JSON.parse(localStorage.getItem("playlist")) || [],
  isFetching: false,
  error: false,
};

export const PlaylistContext = createContext(initiale_state);
export const PlaylistContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, initiale_state);

  useEffect(() => {
    localStorage.setItem("playlist", JSON.stringify(state.playlist));
  }, [state.playlist]);

  return (
    <PlaylistContext.Provider
      value={{
        playlist: state.playlist,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </PlaylistContext.Provider>
  );
};
