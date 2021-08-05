import Navbar from "../navigation/Navbar";
import { makeStyles} from "@material-ui/core";
import Typography from '@material-ui/core/Typography';
import React, { useState, useContext,useEffect } from "react";
import { GlobalState } from "../../GlobalState";
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
const useStyles = makeStyles((theme) => ({
    
}));

export default function Home(){
    const classes = useStyles();
    const state = useContext(GlobalState);
    const [isLogged] = state.userAPI.isLogged;
    const [open, setOpen] = React.useState(false);
    console.log(open,isLogged)
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpen(false)
      };
      useEffect(() => {
        setTimeout(() => {
            if(!isLogged){setOpen(true);return}
        }, 5000);
      }, []);
    
    return(
        <div>
            <Navbar/>
            <Snackbar open={open} autoHideDuration={4000} onClose={handleClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
                <Alert onClose={handleClose} severity="info">
                    {"Login to Add Tasks and to get sorted in a House!"}
                </Alert>
            </Snackbar>
            <Typography>Checking</Typography>
        </div>
    );
}