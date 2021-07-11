import React,{useState} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Login from './views/login';
import Register from './views/register';
import Verification from './views/verification';
import { Box } from '@material-ui/core';
import { useEffect } from 'react';
import Home from './views/home';

function App() {
  const [isLoggedIn,setIsLoggedIn] = useState(false);

  useEffect(()=>setIsLoggedIn(localStorage.getItem('token')),[localStorage])

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
