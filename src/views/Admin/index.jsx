import React , {useState} from 'react';
import { useRouteMatch,useHistory,Switch ,Route } from 'react-router-dom';
import Login from './login';

export default function Admin(){
    const { path, url } = useRouteMatch();
    const history = useHistory();
  
    console.log(path,url)
    return (
        <Switch>
            <Route path={`${path}/dashboard`}>
                admin
            </Route>
            <Route path={`${path}/login`}>
                <Login/>
            </Route>
        </Switch>
    )
}
