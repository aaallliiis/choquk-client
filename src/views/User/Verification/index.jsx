import React , {useState} from 'react';
import {Box, Button, Grid, TextField,makeStyles } from '@material-ui/core';
import {verification,sendVerificationCode} from '../../../api';
import {errorsMessages} from '../../../assets/errorsMessages';
import {snackbarTypes} from '../../../assets/snackbarTypes';
import { useLocation,useHistory,Link } from 'react-router-dom';
import Snackbar from '../../../components/Snackbar';

const useStyles = makeStyles({
    main:{
        width:'100%',
        height:'100%',
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
    },
    verificationBox:{
        width:'25%',
        height:'fit-content',
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
        flexDirection:'column',
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
    },
    err:{
        color: '#f5222d',
        marginBottom:'8px',
        textAlign:'revert',
        direction:'rtl',
    }
})

export default function Verification(){
    const classes = useStyles();
    const {state} = useLocation();
    const history = useHistory();

    const [status,setStatus]= useState(false)
    const [persianNum,setPersianNum]= useState(false)
    const [phonePersianNum,setPhonePersianNum]= useState(false)

    const [body,setBody]= useState({
        phoneNumber:state?state.phoneNumber:'',
        token:''
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
    
    const handleVerification = ()=>{
        if (body.phoneNumber===''||body.token==='') {
            handleOpenSnack(errorsMessages.emptyField,snackbarTypes.error);
        }else{
            let err = false;
            const phonePattern = new RegExp(/09[0-9]{9}/)
            if(!(phonePattern.test(body.phoneNumber))){
                err=true;
                handleOpenSnack(errorsMessages.invalidPhone,snackbarTypes.error);
            }

            if(body.token.length<6){
                err=true;
                handleOpenSnack(errorsMessages.invalidToken,snackbarTypes.error);
            }

            if(!err){
                verification(body)
                .then(()=>history.push('/login'))
                .catch(({response:{data:{error}}})=>handleOpenSnack(error,snackbarTypes.error))
            }
        }
    }

    const handleSendCode = ()=>{
        if(body.phoneNumber===''){
            handleOpenSnack(errorsMessages.emptyField,snackbarTypes.error);
        }else{
            let err = false;

            const phonePattern = new RegExp(/09[0-9]{9}/)
            if(!(phonePattern.test(body.phoneNumber))){
                err=true;
                handleOpenSnack(errorsMessages.invalidPhone,snackbarTypes.error);
            }

            if(!err){
                sendVerificationCode({phoneNumber:body.phoneNumber})
                .then(({data})=>{
                    handleOpenSnack(data,snackbarTypes.success);
                    setStatus(true);
                })
                .catch(({response:{data:{error}}})=>handleOpenSnack(error,snackbarTypes.error))
            }
        }
    }

    return (
        <Box className={classes.main}>
            <Snackbar message={snack.message} type={snack.type} handleClose={handleCloseSnack} open={snack.status}/>
            <Box className={classes.verificationBox}>
                <Box className={classes.form}>
                    <h1>فعال سازی</h1>
                    {status?<h3>کد دریافتی را وارد کنید</h3>:<h3>شماره همراه خود را جهت دریافت کد وارد کنید</h3>}
                    <Grid container direction='column' alignItems='center' justify='space-around' style={{height:'70%'}}>
                        <div className={classes.inputDiv}>
                            <lable>شماره همراه</lable>
                            <TextField className={classes.inputs} label="شماره همراه" required
                                variant="outlined" 
                                defaultValue={body.phoneNumber}
                                inputProps={{
                                    maxLength:11
                                }}
                                onKeyDown={(e)=>{
                                    if(e.key==='Enter'){
                                        if(status)
                                            handleVerification()
                                        else
                                            handleSendCode()
                                    }
                                    if(e.key.match(/^[۰-۹]+$/))
                                        setPhonePersianNum(true);
                                    else
                                        setPhonePersianNum(false);
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
                        {phonePersianNum&&<p className={classes.err}>زبان صفحه کلید خود را انگلیسی کنید</p>}
                        {status?
                            <React.Fragment>
                                <div className={classes.inputDiv}>
                                    <lable>کد</lable>
                                    <TextField className={classes.inputs} label="کد" required 
                                        variant="outlined" 
                                        onChange={({target:{value}})=>setBody(old=>{return{...old,token:value}})}
                                        inputProps={{
                                            maxLength:6
                                        }}
                                        onKeyDown={(e)=>{
                                            if(e.key==='Enter')
                                                handleVerification()
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
                                    />
                                </div>
                                {persianNum&&<p className={classes.err}>زبان صفحه کلید خود را انگلیسی کنید</p>}
                                <Button style={{backgroundColor:'rgba(87,122,255,87%)',width:'77%',marginTop:15}} onClick={handleVerification} >فعال سازی</Button>
                            </React.Fragment>:
                            <Button style={{backgroundColor:'rgba(87,122,255,87%)',width:'77%',marginTop:15}} onClick={handleSendCode} >ارسال کد</Button>
                        }
                    </Grid>
                    <Grid container style={{width:'77%',margin:'15px 0 20px 0'}}>
                        <span style={{width:'100%'}}><Link to='/login'>صفحه ورود</Link></span>
                    </Grid>
                </Box>
            </Box>
        </Box>
    )
}
