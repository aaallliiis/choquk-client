import React , {useState} from 'react';
import {Box, Button, Grid, TextField } from '@material-ui/core';
import imge from '../../assets/img.jpg';
import {register} from '../../api'
import { Link } from 'react-router-dom';

export default function Register(){
    const [body,setBody]= useState({
        name:'',
        email:'',
        password:''
    })

    const handleRegister = ()=>{
        var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        if (body.email===''||body.name===''||body.password==='') {
            console.log("poresh kn");
        }else if(body.name.length<3){
            console.log('name kame')
        }else if(body.password.length<8){
            console.log('password kame')
        }else if(!pattern.test(body.email)) {
            console.log("Please enter valid email address.");
        }else{
            register(body)
            .then(res=>console.log(res))
            .catch(({response:{data}})=>console.log(data))
        }
    }

    return <Box width='100%' height='100%' style={{display:'flex'}}>
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
                    <Button style={{backgroundColor:'lightBlue',width:'77%'}} onClick={handleRegister}>mmd</Button>
                </Grid>
                <Grid container alignItems='center' style={{marginLeft:'5rem'}}>
                    <span>have accout? <Link to='/login'>login</Link></span>
                </Grid>
            </Grid>
        </Box>
        <Box width='50%'>
            <img src={imge} height='100%' width='100%'/>
        </Box>
    </Box>
}
