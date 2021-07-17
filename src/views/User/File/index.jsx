import React , {useEffect,useState} from 'react';
import {Box,Divider,makeStyles,Grid,Button} from '@material-ui/core';
import Nav from '../../../components/NavBar';
import {getFileById} from '../../../api';
import {useHistory,useRouteMatch} from 'react-router-dom';

const useStyles = makeStyles({
    page:{
        backgroundColor: 'rgb(232, 243, 246)',
        overflow:'hidden',
    },
    main:{
        display:'flex',
    },
})

export default function Home(){
    const classes = useStyles();
    const {params:{id}} = useRouteMatch();

    useEffect(()=>
        getFileById(id)
        .then(res=>console.log(res))
        .catch(err=>console.log(err.response))
    ,[id])

    return (        
        <Box className={classes.page} height="100%" width="100%">            
            <Box height="8%" width="100%">
                <Nav handleClick={()=>console.log('mmd')}/>
            </Box>
            <Box className={classes.main} height="92%" width="100%">
            </Box> 
        </Box> 
    )
}
