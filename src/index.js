import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { ContextProvider } from "./context/Context";
import { SpotifyContextProvider } from "./context/spotifyContext";

ReactDOM.render(
  <React.StrictMode>
    <ContextProvider>
      <SpotifyContextProvider>
        <App />
      </SpotifyContextProvider>
    </ContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
