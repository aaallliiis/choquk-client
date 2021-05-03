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
                {message}
            </Alert>
        </Snackbar>
    )
}