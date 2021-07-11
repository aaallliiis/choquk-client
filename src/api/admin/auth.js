import {Axios} from '../request';

export function adminLogin(body){
    return Axios.post('/admin/login',body).then(({data})=>data)
}