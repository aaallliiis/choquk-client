import React, { useState, useEffect } from 'react';
import {useHistory} from "react-router-dom";
import {makeStyles,Grid,Tooltip} from '@material-ui/core';
import {Home} from '@material-ui/icons';
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded';
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import PersonIcon from '@material-ui/icons/Person';
import {titles} from '../../assets/titles';
import {getUserData} from '../../api';

const useStyles=makeStyles({
  main:{
    minHeight:'100%',
    height:'fit-content',
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
    width:'fit-content',
    display:'flex',
    alignItems:'center',
    justifyContent:'space-between'
  },
  row:{
    margin:'0.5rem 0',
    padding:'0.3rem',
    display:'flex',
    justifyContent:'flex-end',
    cursor:'pointer',
    boxSizing:'border-box',
    borderRadius:'3rem',
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
  const {push,location:{pathname}} = useHistory();  

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
          <div className={classes.divs} > 
            {userInfo.name?`سلام ${userInfo.name}`:''}
          </div>
          <div className={classes.divs}> 
            {pathname!=='/'&&<div className={classes.row} onClick={()=>push('/')}>
              <Tooltip arrow title={titles.home}>
                <Home />
              </Tooltip>
            </div>}
            <div className={classes.row} onClick={()=>push(`/profile/${userInfo._id}`)}>
              <Tooltip arrow title={titles.profile}>
                <AccountCircleRoundedIcon />
              </Tooltip>
            </div>
            <div className={classes.row} 
              onClick={()=>{
                localStorage.clear();
                window.location.reload();
              }} container justify="flex-end" alignItems="center"
            >
              <Tooltip arrow title={titles.exit}>
                <ExitToAppRoundedIcon/>
              </Tooltip>
            </div>
          </div>
        </div>
      </Grid>
    </React.Fragment>
  );
  }