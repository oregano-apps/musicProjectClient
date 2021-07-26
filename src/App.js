import "./App.css";
import './main.css';
import {Switch, BrowserRouter as Router, Link, Route} from 'react-router-dom'
import Singup from './pages/singup/Singup'
import Login from './pages/login/Login'

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
              <h1>homepage</h1>
          </Route>
          <Route path="/singup">
              <Singup />
          </Route>
          <Route path="/login">
              <Login />
          </Route>
          <Route path="/homepage">
              <h1>homepage</h1>
          </Route>
        </Switch>
      </Router>
    
    </div>
  );
}

export default App;
