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
    
    return(
        <div>
            <Navbar/>
            <Typography>Checking</Typography>
        </div>
    );
}