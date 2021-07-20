import React  from 'react';
import {Alert} from '@material-ui/lab'
import {Snackbar,Grid} from '@material-ui/core'

export default function SnackBar({message,open,handleClose,type}){
    return(
        <Snackbar 
            anchorOrigin={{ vertical:'top', horizontal:'center' }} 
            open={open} 
            autoHideDuration={6000} 
            onClose={handleClose}
        >
            <Alert style={{display:'flex',alignItems:'center'}} onClose={handleClose} severity={type} elevation={6} variant="filled">
                <div style={{margin:'0px 30px 0px 30px'}}>
                    <Grid container direction='column'>
                        {message.split(':').map(item=><div>{item}</div>)}
                    </Grid>
                </div>
            </Alert>
        </Snackbar>
    )
}