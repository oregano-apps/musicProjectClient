import "./App.css";
import './main.css';
import {Switch, BrowserRouter as Router, Link, Route} from 'react-router-dom'
import {Context} from "./context/Context"
import { useContext } from "react";
import Singup from './pages/singup/Singup'
import Login from './pages/login/Login'
import SpotLogin from './pages/spotify_login/SpotifyLogin'
import Homepage from "./pages/homepage/Homepage";
import MusicPlayer from "./pages/musicPlayer/MusicPlayer";
import OpenParty from './pages/openParty/OpenParty'
import JoinParty from "./pages/joinParty/joinParty";

const code = new URLSearchParams(window.location.search).get("code")


function App() {
  const {user, token} = useContext(Context)

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
             {code && user && token ? <Homepage code={code} /> : <Login />}
          </Route>
          <Route path="/singup">
              <Singup />
          </Route>
          <Route path="/login">
              <Login />
          </Route>
          <Route path="/spotLogin">
              {user && token ? <SpotLogin /> : <Login />}
          </Route>
          <Route path="/musicPlayer">
              {user && token ? <MusicPlayer /> : <Login />}
          </Route>
          <Route path="/openParty">
              {user && token ? <OpenParty /> : <Login />}
          </Route>
          <Route path="/joinParty">
            {user && token ? <JoinParty /> : <Login />}
          </Route>
          <Route path="/homepage">
              {code && user && token ? <Homepage code={code} /> : <Login />}
          </Route>
          <Route path="/">
              <h1>NOT FOUND</h1>
          </Route>
        </Switch>
      </Router>
    
    </div>
  );
}

export default App;
