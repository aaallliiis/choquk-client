import React , {useState,useEffect} from 'react';
import { useRouteMatch,Switch ,Route ,Redirect} from 'react-router-dom';
import Login from './Login';
import Dashboard from './Dashboard';

export default function Admin(){
    const { path } = useRouteMatch();
    const [isLoggedIn,setIsLoggedIn] = useState(localStorage.getItem('token'));

    useEffect(()=>setIsLoggedIn(localStorage.getItem('token')),[localStorage.getItem('token')])

    return (
        <Switch>
            <Route exact path={`${path}`}>
                <Redirect to={`${path}/dashboard`}/>
            </Route>
            <Route path={`${path}/dashboard`}>
                {isLoggedIn?
                    <Dashboard/>:
                    <Redirect to={`${path}/login`}/>
                }
            </Route>
            <Route path={`${path}/login`}>
                {isLoggedIn?
                    <Redirect to={`${path}`}/>:
                    <Login/>
                }
            </Route>
        </Switch>
    )
}
