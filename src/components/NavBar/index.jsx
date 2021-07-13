import React, { useState, useEffect } from 'react';
import {useHistory} from "react-router-dom";
import {Button,makeStyles,Grid,Collapse,Modal,Backdrop,Fade} from '@material-ui/core';
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded';
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import PersonIcon from '@material-ui/icons/Person';
import {titles} from '../../assets/titles';
import {getUserData} from '../../api';

const useStyles=makeStyles({
  main:{
    height:'100%',
    boxSizing:'border-box',
    padding:'0 2rem',
    backgroundColor:'rgba(128, 182, 202, 60%)'
  },
  profileImage:{
    width:'3vw',
    height:'3vw',
    borderRadius:'50%',
    backgroundColor:'white',
  },
  profile:{
    position:'absolute',
    top:'9%',
    right:'2%',
    width:'15rem',
    backgroundColor:'#ffff',
    zIndex:'999',
    borderRadius:'1rem',
    boxSizing:'border-box',
    padding:'1rem 2rem',
    boxShadow:`1px 1px 20px -2px gray`
  },
  triangle:{
    position:'absolute',
    top:0,
    right:'3%',
    borderTop:'0px solid transparent',
    borderBottom:`1rem solid white`,
    borderRight:'1rem solid transparent',
    borderLeft:'1rem solid transparent',
    transform:'translateY(-90%)',
  },  
  userName:{
    textAlign:'center',
    fontSize:'1.5rem',
    marginBottom:'1rem'
  },
  row:{
    margin:'0.5rem 0',
    cursor:'pointer',
    boxSizing:'border-box',
    padding:'0.2rem 1rem',
    borderRadius:'2rem',
    transition:'all 300ms ease',
    '&:hover':{
      backgroundColor:'lightGray',
      color:'white'
    }
  },
})

export default function StyledCheckbox({handleClick}) {
  //* url history  
  const classes=useStyles();
  const history = useHistory();
  
  const [open,setOpen]=useState(false)

  //? store user info
  const [userInfo,setUserInfo]=useState('')

  //? getting User Data
  useEffect(()=>{
    getUserData()
    .then(setUserInfo)
    .catch(err=>console.log(err))
  },[])

  return (
    <React.Fragment>
      <Grid className={classes.main} container justify="flex-start" alignItems="center">
        <Grid container direction="row" justify="center" alignItems="center" className={classes.profileImage} onClick={()=>{setOpen(!open)}}>
          <PersonIcon style={{fontSize:'2vw'}} />
        </Grid>
        <Collapse className={classes.profile} in={open}>
            <div>
              <span className={classes.triangle}></span>
              <div className={classes.userName}>{userInfo.name?`سلام ${userInfo.name}`:''}</div>
              <Grid className={classes.row} container justify="flex-start" alignItems="center">
                <AccountCircleRoundedIcon style={{marginLeft:'0.5rem'}} />
                {titles.profile}
              </Grid>
              <hr/>
              <Grid className={classes.row} onClick={()=>{
                localStorage.clear();
                window.location.reload();
              }} container justify="flex-start" alignItems="center">
                <ExitToAppRoundedIcon style={{marginLeft:'0.5rem'}}/>
                {titles.exit}
              </Grid>
            </div>
        </Collapse>
      </Grid>
    </React.Fragment>
  );
  }