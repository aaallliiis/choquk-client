import React , {useEffect,useState} from 'react';
import {Box,Divider,makeStyles,Grid,Button} from '@material-ui/core';
import {ArrowBackIos} from '@material-ui/icons';
import Nav from '../../../components/NavBar';
import {getFileById} from '../../../api';
import {Link, useHistory,useRouteMatch} from 'react-router-dom';
import { titles } from '../../../assets/titles';
import war from '../../../assets/war.mp3';
import war4 from '../../../assets/war.mp4';
import warP from '../../../assets/war.pdf';

import { Document, Page } from 'react-pdf';

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
})

export default function Home(){
    const classes = useStyles();
    const {params:{id}} = useRouteMatch();
    const {goBack} = useHistory();
    const [item,setItem] = useState({});
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
  
    const onDocumentLoadSuccess = ({ numPages }) => {
      setNumPages(numPages);
    }

    useEffect(()=>
        getFileById(id)
        .then(setItem)
        .catch(err=>console.log(err.response))
    ,[id])

    return (        
        <Box className={classes.page} height="100%" width="100%">            
            <Box height="8%" width="100%">
                <Nav handleClick={()=>console.log('mmd')}/>
            </Box>
            <Box height="92%" width="100%">
                <Box padding="2rem">
                    <Grid container justify="space-between" alignItems="center" className={classes.header}>
                        <h2>عنوان : {item.title}</h2>
                        <Button onClick={goBack}>{titles.back} <ArrowBackIos/></Button>
                    </Grid>
                </Box>
                <Box style={{boxSizing:'border-box',padding:'0 2rem 2rem 2rem'}}>
                    <Grid container className={classes.description} direction='column'>
                        <h4>{titles.description}  : </h4>
                        <Grid container alignItems="center" style={{padding:'0.5rem'}}>
                            {item.description}
                        </Grid>
                    </Grid>
                </Box>
                <Box style={{boxSizing:'border-box',padding:'0 2rem 2rem 2rem'}}>
                    <Grid container className={classes.description} direction='column'>
                        <h4>{titles.files}  : </h4>
                        <Grid container justify='center' alignItems="center" style={{padding:'0.5rem'}}>
                            {item.type==='IMG'?
                                <img alt='img' width='1000px' src={item.url}/>:
                                item.type==='PDF'?<a href={item.url}>{item.url}</a>:
                                item.type==='VID'?<video width='70%' controls><source src={item.url} type="video/mp4" /></video>:
                                item.type==='VC'?<audio style={{width:'1000px'}} controls><source src={item.url} type="audio/mpeg" /></audio>:null
                            }
                        </Grid>
                    </Grid>
                </Box>
            </Box> 
        </Box> 
    )
}
