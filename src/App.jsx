import React,{useState} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Login from './views/User/login';
import Register from './views/User/register';
import Verification from './views/User/verification';
import { Box } from '@material-ui/core';
import { useEffect } from 'react';
import Home from './views/User/home';
import Admin from './views/Admin';

function App() {
  const [isLoggedIn,setIsLoggedIn] = useState(localStorage.getItem('token'));

  useEffect(()=>setIsLoggedIn(localStorage.getItem('token')),[localStorage.getItem('token')])

  return (
    <Box height='100%' width='100%' 
      style={{
        backgroundColor:'rgba(196, 196, 196,40%)'
      }}
    >
      <Router>
        <Switch>
          <Route exact path="/">
            {isLoggedIn?
              <Home/>:
              <Redirect to='/login'/>
            }
          </Route>
          <Route path="/admin">
            <Admin/>
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/register">
            <Register />
          </Route>
          <Route exact path="/verification">
            <Verification />
          </Route>
        </Switch>
      </Router>
    </Box>
  );
}

export default App;
