import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Login from './components/login';
import Register from './components/register';
import imge from './assets/img.png';
import { Box } from '@material-ui/core';

function App() {
  return (
    <Box height='100%' width='100%' 
      style={{
        backgroundImage:`url(${imge})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition:'center',
        backgroundSize:'cover'
      }}
    >
      <Router>
        <Switch>
          <Route exact path="/">
            <Redirect to='/login'/>
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/register">
            <Register />
          </Route>
        </Switch>
      </Router>
    </Box>
  );
}

export default App;
