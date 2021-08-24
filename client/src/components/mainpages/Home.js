import Navbar from "../navigation/Navbar";
import { makeStyles, Paper, useMediaQuery} from "@material-ui/core";
import React, { useState, useContext,useEffect } from "react";
import { GlobalState } from "../../GlobalState";
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import { Grid, Button, AppBar, Toolbar, Typography, Avatar, Box} from "@material-ui/core"
import Loading from '../utilities/Loading'
import Timer from './Timer'

const useStyles = makeStyles((theme) => ({
    root:{
        height: '91vh',
    },
    image:{
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        resizeMode: 'contain', 
        minHeight: '91vh'
    }
}));

export default function Home(){
    const classes = useStyles();
    const state = useContext(GlobalState);
    const [isloading,setisloading] = state.userAPI.isloading
    const [isLogged] = state.userAPI.isLogged;
    const [house,setHouse] = state.userAPI.house;
    const matches = useMediaQuery('(max-width:768px)');
    var col = "black"
    var fontcol = "#aaa"
    var altcol = "white"
    var img = ""

    useEffect(()=>{
        const firstLogin = localStorage.getItem("firstLogin");
        if(!firstLogin) {setisloading(false)}
    },[])

    if(house=="Gryffindor"){
        col = "#7f0909"
        fontcol="#ffc500"
        altcol = "#eeba30"
        img = "https://res.cloudinary.com/adityakaushik/image/upload/v1628269706/Hp/gry_banner_grwluz.png"
    }
    if(house=="Slytherin"){
        col = "#2a623d"
        fontcol="#aaaaaa"
        altcol = "#5d5d5d"
        img = "https://res.cloudinary.com/adityakaushik/image/upload/v1628269706/Hp/sly_banner_yvl105.png"
    }
    if(house=="Ravenclaw"){
        col="#222f5b"
        fontcol="#946b2d"
        altcol = "#5d5d5d"
        img = "https://res.cloudinary.com/adityakaushik/image/upload/v1628269706/Hp/rav_banner_oba4vi.png"
    }
    if(house=="Hufflepuff"){
        col="#fff4b1"
        fontcol="#000000"
        altcol = "#726255"
        img = "https://res.cloudinary.com/adityakaushik/image/upload/v1628269706/Hp/huf_banner_j4rbs1.png"
    }
    return(
        <div>
            {!isloading ? (
                <div>
                    <Navbar/>
                        <div>
                            <Grid container component="main" className={classes.root}>
                                <Grid item component={Paper} xs={false} sm={false} md={matches?false:1} lg={matches?false:1} xl={matches?false:1} className={classes.image} style={{backgroundImage:'url('+ img +')', backgroundColor: isLogged ? col : fontcol}}></Grid>
                                <Grid item component={Paper} xs={12} sm={12} md={matches?12:10} lg={matches?12:10} xl={matches?12:10} style={{backgroundColor: "#f9f7f5"}}>
                                    <Timer  col={col} fontcol= {fontcol} altcol= {altcol}/>
                                </Grid>
                                <Grid item component={Paper} xs={false} sm={false} md={matches?false:1} lg={matches?false:1} xl={matches?false:1} className={classes.image} style={{backgroundImage:'url('+ img +')', backgroundColor: col}}></Grid>
                            </Grid>
                        </div>
                </div>
            ) : (
                <Loading/>
            )}    
        </div>
    );
}