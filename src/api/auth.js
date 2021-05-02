import {Axios} from './request';

export function register(body){
    return Axios.post('/signup',body).then(({data})=>data)
}