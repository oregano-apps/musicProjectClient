import "./App.css";
import './main.css';
import {Switch, BrowserRouter as Router, Link, Route} from 'react-router-dom'
import {Context} from "./context/Context"
import { useContext } from "react";
import Singup from './pages/singup/Singup'
import Login from './pages/login/Login'
import SpotLogin from './pages/spotify_login/SpotifyLogin'
import Homepage from "./pages/homepage/Homepage";

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
          <Route path="/homepage">
              {code && user && token ? <Homepage code={code} /> : <Login />}
          </Route>
        </Switch>
      </Router>
    
    </div>
  );
}

export default App;
