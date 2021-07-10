import React , {useState} from 'react';
import {Box, Button, Grid, TextField,makeStyles,InputAdornment,IconButton } from '@material-ui/core';
import {VisibilityOff,Visibility} from '@material-ui/icons';
import {register} from '../../api'
import { Link,useHistory } from 'react-router-dom';
import {errorsMessages} from '../../assets/errorsMessages';
import {snackbarTypes} from '../../assets/snackbarTypes';
import Snackbar from '../../components/snackbar';

const useStyles = makeStyles({
    main:{
        width:'100%',
        height:'100%',
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
    },
    registerBox:{
        width:'30%',
        height:'60%',
        backgroundColor:'#E8F3F6',
        borderRadius:'2rem',
        display:'flex',
        justifyContent:'center',
        position:'relative',
        boxSizing:'border-box'
    },
    form:{
        width:'90%',
        height:'90%',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'column',
    },
    inputDiv:{
        width:'77%',
        height:'15%',
        display:'flex',
        justifyContent:'space-between',
        flexDirection:'column',
        marginBottom:30
    },
    inputs:{
        width:'100%',
        direction:'ltr'
    }
})

export default function Register(){
    const classes = useStyles();
    const history = useHistory();

    const [showPassword,setShowPassword]= useState(false)

    const [body,setBody]= useState({
        name:'',
        email:'',
        phoneNumber:'',
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

    const handleClickShowPassword = ()=>setShowPassword(!showPassword)

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
            .then(()=>history.push('/verification',{phoneNumber:body.phoneNumber}))
            .catch(({response:{data:{errors}}})=>handleOpenSnack(errors[0],snackbarTypes.error))
        }
    }

    return <Box className={classes.main}>
        <Snackbar message={snack.message} type={snack.type} handleClose={handleCloseSnack} open={snack.status}/>
        <Box className={classes.registerBox}>
            <Box className={classes.form}>
                <h1>ثبت نام</h1>
                <Grid container direction='column' wrap='nowrap' alignItems='center' justify='space-around' style={{height:'70%'}}>
                    <div className={classes.inputDiv}>
                        <lable>نام و نام خانوادگی</lable>
                        <TextField className={classes.inputs} label="نام و نام خانوادگی" required
                            variant="outlined" 
                            onChange={({target:{value}})=>setBody(old=>{return{...old,name:value}})}
                        />
                    </div>
                    <div className={classes.inputDiv}>
                        <lable>ایمیل</lable>
                        <TextField className={classes.inputs} label="ایمیل" type='email' required
                            variant="outlined" 
                            onChange={({target:{value}})=>setBody(old=>{return{...old,email:value}})}
                        />
                    </div>
                    <div className={classes.inputDiv}>
                        <lable>شماره همراه</lable>
                        <TextField className={classes.inputs} label="شماره همراه" required
                            variant="outlined" 
                            onChange={({target:{value}})=>setBody(old=>{return{...old,phoneNumber:value}})}
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
                    <Button style={{backgroundColor:'#39a1ff',width:'77%',marginTop:30}} onClick={handleRegister}>ثبت نام</Button>
                </Grid>
                <span style={{
                    position:'absolute',
                    right:'5.5rem',
                    bottom:20
                }}>حساب کاربری دارید؟ <Link to='/login'>ورود</Link></span>
            </Box>
        </Box>
    </Box>
}
