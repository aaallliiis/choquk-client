import {Axios} from '../request';

export function getUserData(){
    return Axios.get('/profile').then(({data:{data}})=>data)
}

export function getAllFields(){
    return Axios.get('/fields').then(({data:{data}})=>data)
}

export function getAllFiles({query,number:offset}){
    return Axios.post(`/files${query?`?${query}`:''}`,{offset}).then(({data:{data}})=>data)
}