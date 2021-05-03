import React , {useState} from 'react';
import {Box, Button, Grid, TextField } from '@material-ui/core';
import {register} from '../../api'
import { Link,useHistory } from 'react-router-dom';
import {errorsMessages} from '../../assets/errorsMessages';
import {snackbarTypes} from '../../assets/snackbarTypes';
import Snackbar from '../snackbar';

export default function Register(){
    const history = useHistory();

    const [body,setBody]= useState({
        name:'',
        email:'',
        password:''
    })

    const [snack,setSnack]= useState({
        status:false,
        message:'',
        type:''
    })

    const handleOpenSnack= (message,type)=>setSnack({
        status:true,
        message,
        type
    })

    const handleCloseSnack = ()=>setSnack({
        status:false,
        message:'',
        type:''
    })

    const handleRegister = ()=>{
        var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        if (body.email===''||body.name===''||body.password==='') {
            handleOpenSnack(errorsMessages.emptyField,snackbarTypes.error);
        }else if(body.name.length<3){
            handleOpenSnack(errorsMessages.shortName,snackbarTypes.error);
        }else if(body.password.length<8){
            handleOpenSnack(errorsMessages.shortPass,snackbarTypes.error);
        }else if(!pattern.test(body.email)) {
            handleOpenSnack(errorsMessages.invalidEmail,snackbarTypes.error);
        }else{
            register(body)
            .then(()=>history.push('/login'))
            .catch(({response:{data:{errors}}})=>handleOpenSnack(errors[0],snackbarTypes.error))
        }
    }

    return <Box width='100%' height='100%' style={{display:'flex'}}>
        <Snackbar message={snack.message} type={snack.type} handleClose={handleCloseSnack} open={snack.status}/>
        <Box width='50%'>
            <Grid container justify='center' alignItems='center' style={{width:'90%',height:500,paddingTop:90,marginLeft:40}} >
                <Grid container style={{marginLeft:'5rem',height:'15%'}} >
                    <h2>register</h2>
                </Grid>
                <Grid container justify='center' alignItems='center' style={{height:'85%'}}>
                    <TextField style={{width:'77%'}} label="name" required
                        variant="outlined" 
                        onChange={({target:{value}})=>setBody(old=>{return{...old,name:value}})}
                    />
                    <TextField style={{width:'77%'}} label="email" type='email' required
                        variant="outlined" 
                        onChange={({target:{value}})=>setBody(old=>{return{...old,email:value}})}
                    />
                    <TextField style={{width:'77%'}} label="password" type='password' required 
                        variant="outlined" 
                        onChange={({target:{value}})=>setBody(old=>{return{...old,password:value}})}
                    />
                    <Button style={{backgroundColor:'#39a1ff',width:'77%'}} onClick={handleRegister}>register</Button>
                </Grid>
                <Grid container alignItems='center' style={{marginLeft:'5rem'}}>
                    <span>have accout? <Link to='/login'>login</Link></span>
                </Grid>
            </Grid>
        </Box>
    </Box>
}
