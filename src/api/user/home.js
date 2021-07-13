import {Axios} from '../request';

export function getUserData(){
    return Axios.get('/profile').then(({data:{data}})=>data)
}