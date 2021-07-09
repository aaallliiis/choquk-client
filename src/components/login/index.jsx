import React , {useState} from 'react';
import {Box, Button, Grid, TextField, IconButton, InputAdornment,makeStyles } from '@material-ui/core';
import {VisibilityOff,Visibility} from '@material-ui/icons';
import {login} from '../../api';
import {errorsMessages} from '../../assets/errorsMessages';
import {snackbarTypes} from '../../assets/snackbarTypes';
import { Link } from 'react-router-dom';
import Snackbar from '../snackbar';
const useStyles = makeStyles({
    main:{
        width:'100%',
        height:'100%',
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
    },
    loginBox:{
        width:'25%',
        height:'45%',
        backgroundColor:'#E8F3F6',
        borderRadius:'2rem',
        display:'flex',
        justifyContent:'center',
    },
    form:{
        width:'90%',
        height:'90%',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'column'
    },
    inputDiv:{
        width:'77%',
        height:'30%',
        display:'flex',
        justifyContent:'space-between',
        flexDirection:'column'
    },
    inputs:{
        width:'100%',
        direction:'ltr'
    }
})

export default function Login(){
    const classes = useStyles();
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
        <Box className={classes.main}>
            <Snackbar message={snack.message} type={snack.type} handleClose={handleCloseSnack} open={snack.status}/>
            <Box className={classes.loginBox}>
                <Box className={classes.form} >
                    <h1>ورود</h1>
                    <Grid container direction='column' justify='space-around' style={{height:'70%'}}>
                        <div className={classes.inputDiv}>
                            <lable>ایمیل</lable>
                            <TextField className={classes.inputs} label="ایمیل" type='email' required
                                variant="outlined" 
                                onChange={({target:{value}})=>setBody(old=>{return{...old,email:value}})}
                            />
                        </div>
                        <div className={classes.inputDiv}>
                            <lable>رمزعبور</lable>
                            <TextField className={classes.inputs} label="رمزعبور" type={showPassword?'text':'password'} required 
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
                        </div>
                        <Button style={{backgroundColor:'#39a1ff',width:'77%'}} onClick={handleLogin} >ورود</Button>
                    </Grid>
                    <Grid container style={{marginRight:'7rem'}}>
                        <span style={{width:'100%'}}>حساب کاربری ندارید؟ <Link to='/register'>ثبت نام</Link></span>
                        <span style={{width:'100%'}}>نیاز به فعال سازی حساب دارید؟ <Link to='/verification'>فعال سازی</Link></span>
                    </Grid>
                </Box>
            </Box>
        </Box>
    )
}
