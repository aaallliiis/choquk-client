import React , {useState} from 'react';
import {Box, Button, Grid, TextField } from '@material-ui/core';
import {verification,sendVerificationCode} from '../../api';
import {errorsMessages} from '../../assets/errorsMessages';
import {snackbarTypes} from '../../assets/snackbarTypes';
import { useLocation,useHistory } from 'react-router-dom';
import Snackbar from '../snackbar';

export default function Verification(){
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
            .catch(({response:{data:{errors}}})=>handleOpenSnack(errors[0],snackbarTypes.error))
        }
    }

    const handleSendCode = ()=>{
        if(body.phoneNumber===''){
            handleOpenSnack(errorsMessages.emptyField,snackbarTypes.error);
        }else{
            sendVerificationCode({phoneNumber:body.phoneNumber})
            .then(res=>{
                handleOpenSnack(res,snackbarTypes.success);
                setStatus(true);
            })
            .catch(({response:{data:{errors}}})=>handleOpenSnack(errors[0],snackbarTypes.error))
        }
    }

    return (
        <Box width='100%' height='100%' style={{display:'flex'}}>
            <Snackbar message={snack.message} type={snack.type} handleClose={handleCloseSnack} open={snack.status}/>
            <Box width='50%'>
                <Grid container justify='center' alignItems='center' style={{width:'90%',height:500,paddingTop:90,marginLeft:40}} >
                    <Grid container style={{marginLeft:'5rem',height:'30%'}} >
                        <div style={{width:'100%'}}>
                            <h2>verification</h2>
                        </div>
                        <div style={{width:'100%'}}>
                            <h3>enter the code that sent to your phone</h3>
                        </div>
                    </Grid>
                    <Grid container justify='center' alignItems='center' style={{height:'85%'}}>
                        <TextField style={{width:'77%'}} label="phone" required
                            variant="outlined" 
                            defaultValue={body.phoneNumber}
                            onChange={({target:{value}})=>setBody(old=>{return{...old,phoneNumber:value}})}
                        />
                        {status?
                            <React.Fragment>
                                <TextField style={{width:'77%'}} label="code" required 
                                    variant="outlined" 
                                    onChange={({target:{value}})=>setBody(old=>{return{...old,token:value}})}
                                    />
                                <Button style={{backgroundColor:'#39a1ff',width:'77%'}} onClick={handleVerification} >verification</Button>
                            </React.Fragment>:
                            <Button style={{backgroundColor:'#39a1ff',width:'77%'}} onClick={handleSendCode} >send code</Button>
                        }
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}
