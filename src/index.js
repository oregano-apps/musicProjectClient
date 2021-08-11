import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { ContextProvider } from "./context/Context";
import { SpotifyContextProvider } from "./context/spotifyContext";
import {PlaylistContextProvider} from './context/playlistContext';

ReactDOM.render(
  <React.StrictMode>
    <ContextProvider>
      <SpotifyContextProvider>
        <PlaylistContextProvider>
          <App />
        </PlaylistContextProvider>
      </SpotifyContextProvider>
    </ContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
