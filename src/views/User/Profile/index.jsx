import React , {useEffect,useState} from 'react';
import {Box,Select,MenuItem,makeStyles,Grid,Button,LinearProgress} from '@material-ui/core';
import {ArrowBackIos} from '@material-ui/icons';
import Nav from '../../../components/NavBar';
import {getUserData,getAllFields,getAllOrientations,updateUser} from '../../../api';
import {useHistory,useRouteMatch} from 'react-router-dom';
import { titles } from '../../../assets/titles';
import { errorsMessages } from '../../../assets/errorsMessages';
import { snackbarTypes } from '../../../assets/snackbarTypes';
import { userLables } from '../../../assets/userLables';
import Snackbar from '../../../components/Snackbar';

const useStyles = makeStyles({
    page:{
        backgroundColor: 'rgb(232, 243, 246)',
        overflowY:'auto',
    },
    header:{
        backgroundColor: 'rgba(252, 252, 252,60%)',
        padding:'0 2rem',
        marginTop:0,
        borderRadius:'1rem',
        boxShadow:`1px 1px 40px 3px #aaaaaa`,
        textAlign:'center'
    },
    description:{
        width:'100%',
        backgroundColor: 'rgba(252, 252, 252,60%)',
        boxShadow:`1px 1px 20px 1px #aaaaaa`,
        boxSizing:'border-box',
        padding:'0 1rem 2rem',
        borderRadius:'1rem'
    },
    inputBox:{
        margin:'1rem'
    },
    input:{
        outline:'none',
        direction:'ltr',
        padding:'2%',
        borderRadius:'0.5rem',
        width:"75%",
        border:`1px solid #333333`,
        fontSize:'1rem',
        '&:focus':{
        //   border:`2px solid #A8DADC`
        }
    },
    select:{
        position:'relative',
        backgroundColor:'transparent',
        width:'80%',
        borderBottom:0,
        fontSize:'1.3rem',
        height:'2.7rem',
        '& svg':{
            fontSize:"1.8rem",
            top:"20%",
            right:"100% !important",
            transform:'translateX(100%)'
        },
    },
    accept:{
        fontSize:'1.2rem',
        marginRight:'1rem',
        borderRadius:'0.5rem',
        backgroundColor:'#00b000',
        color:'#ffffff',
        transition:'all 200ms ease',
        '&:hover':{
          transform:'scale(1.05)',
          backgroundColor:`#00b000 !important`,
        }
    },
    error:{
        color: '#f5222d',
        marginBottom: '8px',
        textAlign: 'revert',
    }
})

export default function Home(){
    const classes = useStyles();
    const {params:{id}} = useRouteMatch();
    const {goBack} = useHistory();
    const [loading,setLoading] = useState(true);
    const [userInfo,setUserInfo] = useState({});
    const [fields,setFields] = useState([]);
    const [orientations,setOrientations] = useState([]);
    const [snackOpen,setSnackOpen]=useState(false);
    const [msg,setMsg]=useState('');
    const [type,setType]=useState('');
    
    const handleSnackOpen = (mesg,type)=>{
        setMsg(mesg);
        setType(type)
        setSnackOpen(true);
    }
  
    const handleSnackClose = ()=>setSnackOpen(false)

    const hanldeAccept = () => {
        setMsg('');
        if(
            userInfo.name===""||
            userInfo.lastName===""||
            userInfo.uniCode===""||
            userInfo.phoneNumber===""||
            userInfo.email===""||
            userInfo.field._id===""||
            userInfo.orientation._id===""
        ){
            handleSnackOpen(errorsMessages.emptyField,snackbarTypes.error)
        }else{
            let err=false;
            const phonePattern = new RegExp(/09[0-9]{9}||۰۹[۰-۹]{9}/)
            if(!phonePattern.test(userInfo.phoneNumber)){
                err=true;
                handleSnackOpen(old=>(`${old}:${errorsMessages.invalidPhone}`),snackbarTypes.error);
            }

            var emailPattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
            if(!emailPattern.test(userInfo.email)){ 
                err=true;
                handleSnackOpen(old=>(`${old}:${errorsMessages.invalidEmail}`),snackbarTypes.error);
            }
            
            if(userInfo.name.length<3||userInfo.lastName.length<3){ 
                err=true;
                handleSnackOpen(old=>(`${old}:${errorsMessages.shortName}`),snackbarTypes.error);
            }

            if(userInfo.uniCode.length!==8){ 
                err=true;
                handleSnackOpen(old=>(`${old}:${errorsMessages.invalidUniCode}`),snackbarTypes.error);
            }
            
            if(userInfo.password&&userInfo.password.length<5&&userInfo.password.length>0){ 
                err=true;
                handleSnackOpen(old=>(`${old}:${errorsMessages.shortPass}`),snackbarTypes.error);
            }

            if(!err){
                updateUser(userInfo)
                .then(res=>handleSnackOpen(res,snackbarTypes.success))
                .catch(({response:{data:{error}}})=>handleSnackOpen(error,snackbarTypes.error))
            }
        }
    }

    useEffect(()=>{
        setLoading(true);
        getAllFields()
        .then(setFields)
        .then(()=>
            getUserData(id)
            .then(res=>{
                getAllOrientations(res.field._id)
                .then(setOrientations)
                .then(()=>setUserInfo(res))
                .then(()=>setLoading(false))
            })
            .catch(err=>console.log(err.response))
        )
    },[id])

    return (        
        <Box className={classes.page} height="100%" width="100%">            
            <Box height="8%" width="100%">
                <Nav/>
            </Box>
            <Box height="92%" width="100%">
                <Snackbar message={msg} type={type} handleClose={handleSnackClose} open={snackOpen}/>
                <Box padding="2rem">
                    <Grid container justify="space-between" alignItems="center" className={classes.header}>
                        <h2>اطلاعات کاربری</h2>
                        <Button onClick={goBack}>{titles.back} <ArrowBackIos/></Button>
                    </Grid>
                </Box>
                <Box style={{boxSizing:'border-box',padding:'0 2rem 2rem 2rem'}}>
                    {loading?<LinearProgress/>:
                    <Grid container className={classes.description} direction='column'>
                        <h4>{titles.description}  : </h4>
                        <Grid container justify='space-around'>
                            <Box width='45%'>
                                <Grid container alignItems="center" justify='space-between' className={classes.inputBox}>
                                    <label>{userLables.name} : </label>
                                    <input
                                        className={classes.input}
                                        value={userInfo.name}
                                        onChange={({target:{value}})=>{
                                            setUserInfo(old=>({...old,name:value}))
                                        }}
                                    />
                                </Grid>
                                <Grid container alignItems="center" justify='space-between' className={classes.inputBox}>
                                    <label>{userLables.email} : </label>
                                    <input
                                        className={classes.input}
                                        value={userInfo.email}
                                        onChange={({target:{value}})=>{
                                            setUserInfo(old=>({...old,email:value}))
                                        }}
                                    />
                                </Grid>
                                <Grid container alignItems="center" justify='space-between' className={classes.inputBox}>
                                    <label>{userLables.uniCode} : </label>
                                    <input
                                        className={classes.input}
                                        value={userInfo.uniCode}
                                        onChange={({target:{value}})=>{
                                            setUserInfo(old=>({...old,uniCode:value}))
                                        }}
                                        maxLength={8}
                                        onKeyDown={(e)=>{
                                            if(!e.key.match(/^[۰-۹0-9]+$/)&&e.key!=='Backspace')
                                                e.preventDefault()
                                        }}
                                    />
                                </Grid>
                                <Grid container alignItems="center" justify='space-between' className={classes.inputBox}>
                                    <label>{userLables.field} : </label>
                                    <Select
                                        className={classes.select}
                                        value={userInfo.field._id}
                                        onChange={({target:{value}})=>{
                                            setUserInfo(old=>({...old,field:{_id:value}}))
                                            getAllOrientations(value)
                                            .then(setOrientations)
                                        }}
                                    >
                                        {fields.map(item=>
                                            <MenuItem value={item.id}>{item.name}</MenuItem>
                                        )}
                                    </Select>
                                </Grid>
                            </Box>
                            <Box width='45%'>
                                <Grid container alignItems="center" justify='space-between' className={classes.inputBox}>
                                    <label>{userLables.lastName} : </label>
                                    <input
                                        className={classes.input}
                                        value={userInfo.lastName}
                                        onChange={({target:{value}})=>{
                                            setUserInfo(old=>({...old,lastName:value}))
                                        }}
                                    />
                                </Grid>
                                <Grid container alignItems="center" justify='space-between' className={classes.inputBox}>
                                    <label>{userLables.phoneNumber} : </label>
                                    <input
                                        className={classes.input}
                                        value={userInfo.phoneNumber}
                                        onChange={({target:{value}})=>{
                                            setUserInfo(old=>({...old,phoneNumber:value}))
                                        }}
                                        maxLength={11}
                                        onKeyDown={(e)=>{
                                            if(
                                                !e.key.match(/^[۰-۹0-9]+$/)&&
                                                e.key!=='Backspace'&&
                                                e.key!=='ArrowLeft'&&
                                                e.key!=='ArrowRight'
                                            )
                                                e.preventDefault()
                                        }}
                                    />
                                </Grid>
                                <Grid container alignItems="center" justify='space-between' className={classes.inputBox}>
                                    <label>{userLables.password} : </label>
                                    <input
                                        type='password'
                                        className={classes.input}
                                        value={userInfo.password}
                                        onChange={({target:{value}})=>{
                                            setUserInfo(old=>({...old,password:value}))
                                        }}
                                    />
                                </Grid>
                                <Grid container alignItems="center" justify='space-between' className={classes.inputBox}>
                                    <label>{userLables.orientation} : </label>
                                    <Select 
                                        className={classes.select}
                                        value={userInfo.orientation._id}
                                        onChange={({target:{value}})=>{
                                            setUserInfo(old=>({...old,orientation:{_id:value}}))
                                        }}
                                    >
                                        {orientations.map(item=>
                                            <MenuItem value={item.id}>{item.name}</MenuItem>
                                        )}
                                    </Select>
                                </Grid>
                            </Box>
                        </Grid>
                        <Grid container direction="row" justify="flex-end">
                            {/* {addLoading?<CircularProgress/>: */}
                                <Button className={classes.accept} onClick={hanldeAccept}>{titles.accept}</Button>
                            {/* } */}
                        </Grid>
                    </Grid>
                    }
                </Box>
            </Box>
        </Box>  
    )
}