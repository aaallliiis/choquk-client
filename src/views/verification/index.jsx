import React , {useState} from 'react';
import {Box, Button, Grid, TextField,makeStyles } from '@material-ui/core';
import {verification,sendVerificationCode} from '../../api';
import {errorsMessages} from '../../assets/errorsMessages';
import {snackbarTypes} from '../../assets/snackbarTypes';
import { useLocation,useHistory } from 'react-router-dom';
import Snackbar from '../../components/snackbar';

const useStyles = makeStyles({
    main:{
        width:'100%',
        height:'100%',
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
    },
    verificationBox:{
        width:'25vw',
        height:'45vh',
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
    },
    inputs:{
        width:'100%',
        direction:'ltr'
    }
})

export default function Verification(){
    const classes = useStyles();
    const {state} = useLocation();
    const history = useHistory();

    const [status,setStatus]= useState(false)

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
            verification(body)
            .then(()=>history.push('/login'))
            .catch(({response:{data:{error}}})=>handleOpenSnack(error,snackbarTypes.error))
        }
    }

    const handleSendCode = ()=>{
        if(body.phoneNumber===''){
            handleOpenSnack(errorsMessages.emptyField,snackbarTypes.error);
        }else{
            sendVerificationCode({phoneNumber:body.phoneNumber})
            .then(({data})=>{
                handleOpenSnack(data,snackbarTypes.success);
                setStatus(true);
            })
            .catch(({response:{data:{error}}})=>handleOpenSnack(error,snackbarTypes.error))
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
                                onChange={({target:{value}})=>setBody(old=>{return{...old,phoneNumber:value}})}
                            />
                        </div>
                        {status?
                            <React.Fragment>
                                <div className={classes.inputDiv}>
                                    <lable>کد</lable>
                                    <TextField className={classes.inputs} label="کد" required 
                                        variant="outlined" 
                                        onChange={({target:{value}})=>setBody(old=>{return{...old,token:value}})}
                                    />
                                </div>
                                <Button style={{backgroundColor:'#39a1ff',width:'77%',marginTop:30}} onClick={handleVerification} >فعال سازی</Button>
                            </React.Fragment>:
                            <Button style={{backgroundColor:'#39a1ff',width:'77%'}} onClick={handleSendCode} >ارسال کد</Button>
                        }
                    </Grid>
                </Box>
            </Box>
        </Box>
    )
}
