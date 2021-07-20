import React , {useEffect, useState} from 'react';
import {Box, Button, Grid,Select,MenuItem, TextField,makeStyles,InputAdornment,IconButton } from '@material-ui/core';
import {VisibilityOff,Visibility} from '@material-ui/icons';
import {register,getAllFields,getAllOrientations} from '../../../api'
import { Link,useHistory } from 'react-router-dom';
import {errorsMessages} from '../../../assets/errorsMessages';
import {snackbarTypes} from '../../../assets/snackbarTypes';
import Snackbar from '../../../components/Snackbar';
import DatePicker from 'react-modern-calendar-datepicker';
import "react-modern-calendar-datepicker/lib/DatePicker.css";

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
    },
    select:{
        '& svg':{
            fontSize:"1.8rem",
            top:"20%",
            right:"100% !important",
            transform:'translateX(100%)'
        },
    },
    err:{
        color: '#f5222d',
        marginBottom:'8px',
        textAlign:'revert',
        direction:'rtl',
    }
})

export default function Register(){
    const classes = useStyles();
    const history = useHistory();
    const [step,setStep]= useState(false)
    const [showPassword,setShowPassword]= useState(false)
    const [fields,setFields] = useState([]);
    const [orientations,setOrientations] = useState([]);
    const [snackOpen,setSnackOpen]=useState(false);
    const [msg,setMsg]=useState('');
    const [persianNum,setPersianNum]= useState(false)
    const [type,setType]=useState('');

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

    const handleSnackOpen = (mesg,type)=>{
        setMsg(mesg);
        setType(type)
        setSnackOpen(true);
    }
  
    const handleSnackClose = ()=>setSnackOpen(false)

    const handleClickShowPassword = ()=>setShowPassword(!showPassword)

    const nextPage = ()=>setStep(true);

    const handleRegister = ()=>{
        setMsg('');
        if(
            body.name===""||
            body.lastName===""||
            body.uniCode===""||
            body.password===""||
            body.phoneNumber===""||
            body.email===""||
            body.field===""||
            body.orientation===""||
            body.birthDate===""
        ){
            handleSnackOpen(errorsMessages.emptyField,snackbarTypes.error);
        }else{ 
            let err=false;
            if(body.name.length<3||body.lastName.length<3){
                err=true;
                handleSnackOpen(old=>(`${old}:${errorsMessages.shortName}`),snackbarTypes.error);
            }

            if(body.name.password<5){
                err=true;
                handleSnackOpen(old=>(`${old}:${errorsMessages.shortPass}`),snackbarTypes.error);
            }

            if(body.uniCode.length!==8){ 
                err=true;
                handleSnackOpen(old=>(`${old}:${errorsMessages.invalidUniCode}`),snackbarTypes.error);
            }
            
            const phonePattern = new RegExp(/09[0-9]{9}/)
            if(!(phonePattern.test(body.phoneNumber))){
                err=true;
                handleSnackOpen(old=>(`${old}:${errorsMessages.invalidPhone}`),snackbarTypes.error);
            }

            var emailPattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
            if(!emailPattern.test(body.email)){ 
                err=true;
                handleSnackOpen(old=>(`${old}:${errorsMessages.invalidEmail}`),snackbarTypes.error);
            }

            if(!err){
                register(body)
                .then(()=>history.push('/verification',{phoneNumber:body.phoneNumber}))
                .catch(({response:{data:{error}}})=>Array.isArray(error)?handleSnackOpen(error.join(':'),snackbarTypes.error):handleSnackOpen(error,snackbarTypes.error))
            }
        }
    }

    useEffect(()=>{
        getAllFields()
        .then(setFields)
    },[])

    return <Box className={classes.main}>
        <Snackbar message={msg} type={type} handleClose={handleSnackClose} open={snackOpen}/>
        <Box className={classes.registerBox}>
            <Box className={classes.form}>
                <h1>ثبت نام</h1>
                {!step?
                    <Grid container direction='column' wrap='nowrap' alignItems='center' justify='space-around' style={{height:'70%'}}>
                        <Grid container alignItems='center' justify='space-around' wrap='nowrap' style={{width:'80%'}} >
                            <div className={classes.smallInputDiv}>
                                <lable>نام</lable>
                                <TextField className={classes.smallInputs} style={{width:'95%'}} label="نام" required
                                    value={body.name}
                                    variant="outlined" 
                                    onChange={({target:{value}})=>setBody(old=>{return{...old,name:value}})}
                                />
                            </div>
                            <div className={classes.smallInputDiv}>
                                <lable>نام خانوادگی</lable>
                                <TextField className={classes.smallInputs} label="نام خانوادگی" required
                                    value={body.lastName}
                                    variant="outlined" 
                                    onChange={({target:{value}})=>setBody(old=>{return{...old,lastName:value}})}
                                />
                            </div> 
                        </Grid>
                        <div className={classes.inputDiv}>
                            <lable>ایمیل</lable>
                            <TextField className={classes.inputs} label="ایمیل" type='email' required
                                value={body.email}
                                variant="outlined" 
                                onChange={({target:{value}})=>setBody(old=>{return{...old,email:value}})}
                            />
                        </div>
                        <div className={classes.inputDiv}>
                            <lable>شماره همراه</lable>
                            <TextField
                                className={classes.inputs} label="شماره همراه" required
                                variant="outlined" 
                                value={body.phoneNumber}
                                inputProps={{
                                    maxLength:11
                                }}
                                onKeyDown={(e)=>{
                                    if(e.key.match(/^[۰-۹]+$/))
                                        setPersianNum(true);
                                    else
                                        setPersianNum(false);
                                    if(
                                        !e.key.match(/^[0-9]+$/)
                                        &&e.key!=='Backspace'
                                        &&e.key!=='ArrowLeft'
                                        &&e.key!=='ArrowRight'
                                    )
                                        e.preventDefault()
                                }}
                                onChange={({target:{value}})=>setBody(old=>{return{...old,phoneNumber:value}})}
                            />
                        </div>
                        {persianNum&&<p className={classes.err}>زبان صفحه کلید خود را انگلیسی کنید</p>}
                        <div className={classes.inputDiv}>
                            <lable>رمزعبور</lable>
                            <TextField className={classes.inputs} label="رمزعبور" type={showPassword?'text':'password'} required 
                                value={body.password}
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
                        <div className={classes.inputDiv}>
                            <lable>شماره دانشجویی</lable>
                            <TextField
                                className={classes.inputs} label="شماره دانشجویی" required
                                value={body.uniCode}
                                inputProps={{
                                    maxLength:8
                                }}
                                onKeyDown={(e)=>{
                                    if(!e.key.match(/^[۰-۹0-9]+$/)&&e.key!=='Backspace')
                                        e.preventDefault()
                                }}
                                variant="outlined" 
                                onChange={({target:{value}})=>setBody(old=>{return{...old,uniCode:value}})}
                            />
                        </div>
                        <div className={classes.inputDiv}>
                            <DatePicker
                                colorPrimary="#577AFF"
                                onChange={(e) =>setBody(old=>({...old,rawBirthDate:e,birthDate:`${e.year}/${e.month}/${e.day}`}))}
                                value={body.rawBirthDate}
                                locale="fa"
                                variant="outlined" 
                                renderInput={({ ref })=>
                                    <TextField
                                        ref={ref}
                                        className={classes.inputs}
                                        label="تاریخ تولد" 
                                        required
                                        value={body.birthDate}
                                        variant="outlined" 
                                    />
                                }
                            />
                        </div>
                        <div className={classes.inputDiv}>
                            <lable>رشته</lable>
                            <Select 
                                className={classes.select}
                                value={body.field}
                                onChange={({target:{value}})=>{
                                    getAllOrientations(value)
                                    .then(setOrientations)
                                    setBody(old=>({...old,field:value,orientation:''}))
                                }}
                            >
                                {fields.map(item=>
                                    <MenuItem value={item.id}>{item.name}</MenuItem>
                                )}
                            </Select>
                        </div>
                        <div className={classes.inputDiv}>
                            <lable>گرایش</lable>
                            <Select 
                                className={classes.select}
                                value={body.orientation}
                                onChange={({target:{value}})=>{
                                    setBody(old=>({...old,orientation:value}))
                                }}
                            >
                                {orientations.map(item=>
                                    <MenuItem value={item.id}>{item.name}</MenuItem>
                                )}
                            </Select>
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
