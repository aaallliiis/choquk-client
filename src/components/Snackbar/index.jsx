import React  from 'react';
import {Alert} from '@material-ui/lab'
import {Snackbar} from '@material-ui/core'

export default function SnackBar({message,open,handleClose,type}){
    return(
        <Snackbar 
            anchorOrigin={{ vertical:'top', horizontal:'center' }} 
            open={open} 
            autoHideDuration={6000} 
            onClose={handleClose}
        >
            <Alert onClose={handleClose} severity={type} elevation={6} variant="filled">
                <div style={{margin:'0px 30px 0px 30px'}}>
                    {message}
                </div>
            </Alert>
        </Snackbar>
    )
}