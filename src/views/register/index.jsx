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
        width:'40%',
        border:'1px solid #577AFF',
        height:'fit-content',
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
    smallInputDiv:{
        width:'45%',
        display:'flex',
        flexDirection:"column",
        marginBottom:15
    },
    smallInputs:{
        direction:'ltr',
    },
    inputDiv:{
        width:'77%',
        display:'flex',
        flexDirection:'column',
        marginBottom:15
    },
    inputs:{
        width:'100%',
        direction:'ltr'
    },
    pageActive:{
        border:'1px solid #577AFF',
        backgroundColor:'#FCFCFC',
        cursor:'pointer',
        textAlign:'center',
        width:'1.5rem',
        height:'1.5rem',
        borderRadius:'50%'
    },
    page:{
        backgroundColor:'#EEECEC',
        cursor:'pointer',
        textAlign:'center',
        width:'1.5rem',
        height:'1.5rem',
        borderRadius:'50%'
    }
})

export default function Register(){
    const classes = useStyles();
    const history = useHistory();

    const [step,setStep]= useState(false)

    const [showPassword,setShowPassword]= useState(false)

    const [body,setBody]= useState({
        name:'',
        lastName:'',
        email:'',
        phoneNumber:'',
        password:'',
        orientation:'',
        birthDate:'',
        uniCode:'',
        field:'',
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

    const nextPage = ()=>setStep(true);

    const handleRegister = ()=>{
        var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        if (body.email===''||body.name===''||body.password==='') {
            handleOpenSnack(errorsMessages.emptyField,snackbarTypes.error);
        }else if(body.name.length<3){
            handleOpenSnack(errorsMessages.shortName,snackbarTypes.error);
        }else if(body.password.length<5){
            handleOpenSnack(errorsMessages.shortPass,snackbarTypes.error);
        }else if(!pattern.test(body.email)) {
            handleOpenSnack(errorsMessages.invalidEmail,snackbarTypes.error);
        }else{
            register(body)
            .then(()=>history.push('/verification',{phoneNumber:body.phoneNumber}))
            .catch(({response:{data:{error}}})=>handleOpenSnack(error,snackbarTypes.error))
        }
    }

    return <Box className={classes.main}>
        <Snackbar message={snack.message} type={snack.type} handleClose={handleCloseSnack} open={snack.status}/>
        <Box className={classes.registerBox}>
            <Box className={classes.form}>
                <h1>ثبت نام</h1>
                {!step?
                    <Grid container direction='column' wrap='nowrap' alignItems='center' justify='space-around' style={{height:'70%'}}>
                        <Grid container alignItems='center' justify='space-around' wrap='nowrap' style={{width:'80%'}} >
                            <div className={classes.smallInputDiv}>
                                <lable>نام</lable>
                                <TextField className={classes.smallInputs} style={{width:'95%'}} label="نام" required
                                    variant="outlined" 
                                    onChange={({target:{value}})=>setBody(old=>{return{...old,name:value}})}
                                />
                            </div>
                            <div className={classes.smallInputDiv}>
                                <lable>نام خانوادگی</lable>
                                <TextField className={classes.smallInputs} label="نام خانوادگی" required
                                    variant="outlined" 
                                    onChange={({target:{value}})=>setBody(old=>{return{...old,lastName:value}})}
                                />
                            </div> 
                        </Grid>
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
                        <Button style={{backgroundColor:'rgba(87,122,255,87%)',width:'77%',marginTop:15}} onClick={nextPage}>صفحه بعد</Button>
                    </Grid>:
                    <Grid container direction='column' wrap='nowrap' alignItems='center' justify='space-around' style={{height:'70%'}}>
                        {/* <Grid container alignItems='center' justify='space-around' wrap='nowrap' style={{width:'80%'}} >
                            <div className={classes.smallInputDiv}>
                                <lable>نام</lable>
                                <TextField className={classes.smallInputs} style={{width:'95%'}} label="نام" required
                                    variant="outlined" 
                                    onChange={({target:{value}})=>setBody(old=>{return{...old,name:value}})}
                                />
                            </div>
                            <div className={classes.smallInputDiv}>
                                <lable>نام خانوادگی</lable>
                                <TextField className={classes.smallInputs} label="نام خانوادگی" required
                                    variant="outlined" 
                                    onChange={({target:{value}})=>setBody(old=>{return{...old,lastName:value}})}
                                />
                            </div> 
                        </Grid> */}
                        <div className={classes.inputDiv}>
                            <lable>شماره دانشجویی</lable>
                            <TextField className={classes.inputs} label="شماره دانشجویی" type='email' required
                                variant="outlined" 
                                onChange={({target:{value}})=>setBody(old=>{return{...old,uniCode:value}})}
                            />
                        </div>
                        <div className={classes.inputDiv}>
                            <lable>گرایش</lable>
                            <TextField className={classes.inputs} label="گرایش" type='email' required
                                variant="outlined" 
                                onChange={({target:{value}})=>setBody(old=>{return{...old,orientation:value}})}
                            />
                        </div>
                        <div className={classes.inputDiv}>
                            <lable>رشته</lable>
                            <TextField className={classes.inputs} label="شماره همراه" required
                                variant="outlined" 
                                onChange={({target:{value}})=>setBody(old=>{return{...old,field:value}})}
                            />
                        </div>
                        <Button style={{backgroundColor:'rgba(87,122,255,87%)',width:'77%',marginTop:15}} onClick={handleRegister}>ثبت نام</Button>
                    </Grid>
                }
                <div style={{display:'flex',justifyContent:'space-between',width:'15%',marginTop:15}}>
                    <div className={!step?classes.pageActive:classes.page} onClick={()=>setStep(false)}>
                        1
                    </div>
                    <div className={step?classes.pageActive:classes.page} onClick={()=>setStep(true)}>
                        2
                    </div>
                </div>
                <Grid container style={{width:'77%',margin:'15px 0 20px 0'}}>
                    <span style={{
                    }}>حساب کاربری دارید؟ <Link to='/login'>ورود</Link></span>
                </Grid>
            </Box>
        </Box>
    </Box>
}
