import React,{useState} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Login from './views/User/Login';
import Register from './views/User/Register';
import Verification from './views/User/Verification';
import { Box } from '@material-ui/core';
import { useEffect } from 'react';
import Home from './views/User/Home';
import File from './views/User/File';
import Profile from './views/User/Profile';
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
          <Route exact path="/file/:id">
            {isLoggedIn?
              <File/>:
              <Redirect to='/login'/>
            }
          </Route>
          <Route exact path="/profile/:id">
            {isLoggedIn?
              <Profile/>:
              <Redirect to='/login'/>
            }
          </Route>
          <Route path="/admin">
            <Admin/>
          </Route>
          <Route exact path="/login">
            {isLoggedIn?
              <Redirect to='/'/>:
              <Login />
            }
          </Route>
          <Route exact path="/register">
            {isLoggedIn?
              <Redirect to='/'/>:
              <Register />
            }
          </Route>
          <Route exact path="/verification">
            {isLoggedIn?
              <Redirect to='/'/>:
              <Verification />
            }
          </Route>
        </Switch>
      </Router>
    </Box>
  );
}

export default App;
