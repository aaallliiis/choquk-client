import React , {useState,useEffect} from 'react';
import { useRouteMatch,useHistory,Switch ,Route ,Redirect} from 'react-router-dom';
import Login from './login';

export default function Admin(){
    const { path, url } = useRouteMatch();
    const history = useHistory();
    const [isLoggedIn,setIsLoggedIn] = useState(localStorage.getItem('token'));

    useEffect(()=>setIsLoggedIn(localStorage.getItem('token')),[localStorage.getItem('token')])

    console.log(path,url)
    return (
        <Switch>
            <Route exact path={`${path}`}>
                <Redirect to={`${path}/dashboard`}/>
            </Route>
            <Route path={`${path}/dashboard`}>
                {isLoggedIn?
                    'admin':
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
