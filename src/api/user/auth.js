import {Axios} from '../request';

export function register(body){
    return Axios.post('/signup',body).then(({data})=>data)
}

export function login(body){
    return Axios.post('/login',body).then(({data})=>data)
}

export function verification(body){
    return Axios.post('/verification',body).then(({data})=>data)
}

export function sendVerificationCode(body){
    return Axios.post('/sendVerificationCode',body).then(({data})=>data)
}