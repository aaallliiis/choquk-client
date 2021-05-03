import {Axios} from './request';

export function register(body){
    return Axios.post('/signup',body).then(({data})=>data)
}

export function login(body){
    return Axios.post('/login',body).then(({data})=>data)
}