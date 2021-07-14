import React, { useState, useEffect } from 'react';
import {useHistory} from "react-router-dom";
import {Button,makeStyles,Grid,Collapse,Fade, Slide} from '@material-ui/core';
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
  fade:{
    display:'flex',
    width:'95%',
    justifyContent:'space-between',
    marginRight:'1rem',
  },
  divs:{
    width:'20%'
  },
  row:{
    margin:'0.5rem 0',
    width:'fit-content',
    cursor:'pointer',
    boxSizing:'border-box',
    padding:'0.2rem 1rem',
    borderRadius:'2rem',
    transition:'all 300ms ease',
    '&:hover':{
      backgroundColor:'#Dbe0e5',
      color:'white'
    }
  },
})

export default function StyledCheckbox({handleClick}) {
  //* url history  
  const classes=useStyles();
  const history = useHistory();  

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
        <Grid container direction="row" justify="center" alignItems="center" className={classes.profileImage}>
          <PersonIcon style={{fontSize:'2vw'}} />
        </Grid>
        <div className={classes.fade}>
          <Grid className={classes.divs} container alignItems="center"> 
            {userInfo.name?`سلام ${userInfo.name}`:''}
          </Grid>
          <Grid className={classes.divs} container alignItems="center"> 
            <Grid className={classes.row} container justify="center" alignItems="center">
              <AccountCircleRoundedIcon style={{marginLeft:'0.5rem'}} />
              {titles.profile}
            </Grid>
            <Grid className={classes.row} 
              onClick={()=>{
                localStorage.clear();
                window.location.reload();
              }} container justify="center" alignItems="center"
            >
              <ExitToAppRoundedIcon style={{marginLeft:'0.5rem'}}/>
              {titles.exit}
            </Grid>
          </Grid>
        </div>
      </Grid>
    </React.Fragment>
  );
  }