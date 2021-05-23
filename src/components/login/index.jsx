import React , {useState} from 'react';
import {Box, Button, Grid, TextField, IconButton, InputAdornment } from '@material-ui/core';
import {VisibilityOff,Visibility, LocalMallTwoTone} from '@material-ui/icons';
import {login} from '../../api';
import {errorsMessages} from '../../assets/errorsMessages';
import {snackbarTypes} from '../../assets/snackbarTypes';
import { Link } from 'react-router-dom';
import Snackbar from '../snackbar';

export default function Login(){
    const [body,setBody]= useState({
        email:'',
        password:''
    })

    const [showPassword,setShowPassword]= useState(false)

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
    
    const handleLogin = ()=>{
        var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        if (body.email===''||body.password==='') {
            handleOpenSnack(errorsMessages.emptyField,snackbarTypes.error);
        }else if(!pattern.test(body.email)) {
            handleOpenSnack(errorsMessages.invalidEmail,snackbarTypes.error);
        }else{
            login(body)
            .then((res)=>{
                localStorage.setItem('token',`Bearer ${res.data}`)
                handleOpenSnack(res.status,snackbarTypes.success)
            })
            .catch(({response:{data:{error}}})=>handleOpenSnack(error,snackbarTypes.error))
        }
    }

    const handleClickShowPassword = ()=>setShowPassword(!showPassword)

    return (
        <Box width='100%' height='100%' style={{display:'flex'}}>
            <Snackbar message={snack.message} type={snack.type} handleClose={handleCloseSnack} open={snack.status}/>
            <Box width='50%'>
                <Grid container justify='center' alignItems='center' style={{width:'90%',height:500,paddingTop:90,marginLeft:40}} >
                    <Grid container style={{marginLeft:'5rem',height:'15%'}} >
                        <h2>login</h2>
                    </Grid>
                    <Grid container justify='center' alignItems='center' style={{height:'85%'}}>
                        <TextField style={{width:'77%'}} label="email" type='email' required
                            variant="outlined" 
                            onChange={({target:{value}})=>setBody(old=>{return{...old,email:value}})}
                        />
                        <TextField style={{width:'77%'}} label="password" type={showPassword?'text':'password'} required 
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={handleClickShowPassword}>
                                            {showPassword?<Visibility />:<VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                            variant="outlined" 
                            onChange={({target:{value}})=>setBody(old=>{return{...old,password:value}})}
                        />
                        <Button style={{backgroundColor:'#39a1ff',width:'77%'}} onClick={handleLogin} >login</Button>
                    </Grid>
                    <Grid container alignItems='center' style={{marginLeft:'5rem'}}>
                        <span style={{width:'100%'}}>don't have accout? <Link to='/register'>register</Link></span>
                        <span style={{width:'100%'}}>want to active your account? <Link to='/verification'>verification</Link></span>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}
