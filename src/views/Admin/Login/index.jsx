import React , {useState} from 'react';
import {Box, Button, Grid, TextField, IconButton, InputAdornment,makeStyles } from '@material-ui/core';
import {VisibilityOff,Visibility} from '@material-ui/icons';
import {adminLogin} from '../../../api';
import {errorsMessages} from '../../../assets/errorsMessages';
import {snackbarTypes} from '../../../assets/snackbarTypes';
import Snackbar from '../../../components/Snackbar';

const useStyles = makeStyles({
    main:{
        width:'100%',
        height:'100%',
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
    },
    loginBox:{
        width:'30%',
        height:'fit-content',
        minHeight:'500px',
        backgroundColor:'#E8F3F6',
        borderRadius:'2rem',
        display:'flex',
        justifyContent:'center',
    },
    form:{
        width:'90%',
        height:'fit-content',
        minHeight:'500px',
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
        flexDirection:'column',
        marginBottom:15
    },
    inputs:{
        width:'100%',
        direction:'ltr'
    }
})

export default function Login(){
    const classes = useStyles();

    const [body,setBody]= useState({
        username:'',
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
        if (body.username===''||body.password==='') {
            handleOpenSnack(errorsMessages.emptyField,snackbarTypes.error);
        }else{
            adminLogin(body)
            .then((res)=>{
                localStorage.setItem('token',`Bearer ${res.data}`)
                window.location.reload()
            })
            .catch(({response:{data:{error}}})=>handleOpenSnack(error,snackbarTypes.error))
        }
    }

    const handleClickShowPassword = ()=>setShowPassword(!showPassword)

    return (
        <Box className={classes.main}>
            <Snackbar message={snack.message} type={snack.type} handleClose={handleCloseSnack} open={snack.status}/>
            <Box className={classes.loginBox}>
                <Box className={classes.form}>
                    <h1>ورود</h1>
                    <form style={{width:'100%',height:'100%',marginBottom:85}} onSubmit={(e)=>{e.preventDefault();handleLogin()}} noValidate>
                        <Grid container direction='column' alignItems='center' justify='space-around' style={{height:'70%'}}>
                            <div className={classes.inputDiv}>
                                <lable>نام کاربری</lable>
                                <TextField className={classes.inputs} label="نام کاربری" required
                                    variant="outlined"
                                    onChange={({target:{value}})=>setBody(old=>{return{...old,username:value}})}
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
                            <Button style={{backgroundColor:'rgba(87,122,255,87%)',width:'77%',marginTop:15}} type='submit'>ورود</Button>
                        </Grid>
                    </form>
                </Box>
            </Box>
        </Box>
    )
}
