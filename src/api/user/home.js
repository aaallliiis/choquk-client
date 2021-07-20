import {Axios} from '../request';

export function getUserData(){
    return Axios.get('/profile').then(({data:{data}})=>data)
}

export function updateUser(body){
    return Axios.put('/profile',body).then(({data:{data}})=>data)
}

export function getAllFields(){
    return Axios.get('/fields').then(({data:{data}})=>data)
}

export function getAllOrientations(id){
    return Axios.get(`/orientation/${id}`).then(({data:{data}})=>data)
}

export function getAllFiles({
    number:offset,
    fieldId,
    courseId,
    profId,
    search}){
    return Axios.post('/files',
    {
        offset,
        fieldId,
        courseId,
        profId,
        search
    }).then(({data:{data}})=>data)
}


export function getFileById(id){
    return Axios.get(`/files/${id}`).then(({data:{data}})=>data)
}