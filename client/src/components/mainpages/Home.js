import Navbar from "../navigation/Navbar";
import { makeStyles} from "@material-ui/core";
import Typography from '@material-ui/core/Typography';
import React, { useState, useContext } from "react";
import { GlobalState } from "../../GlobalState";

const useStyles = makeStyles((theme) => ({
    
}));

export default function Home(){
    const classes = useStyles();
    const state = useContext(GlobalState);
    return(
        <div>
            <Navbar/>
            <Typography>Checking</Typography>
        </div>
    );
}