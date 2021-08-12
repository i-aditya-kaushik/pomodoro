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
    var col = "#9c9264"
    var fontcol = "black"
    var altcol = "white"
    var img = "https://res.cloudinary.com/adityakaushik/image/upload/v1628269706/Hp/hog_banner_inmxc4.png"

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
                        {matches ? (
                            <div>
                                <Grid container component="main" className={classes.root}>
                                    <Grid container component={Paper} style={{backgroundColor: "#f9f7f5"}}>
                                        <Timer col={col} fontcol= {fontcol} altcol= {altcol}/>
                                    </Grid>
                                </Grid>
                            </div>
                        ) : (
                            <div>
                                <Grid container component="main" className={classes.root}>
                                    <Grid container component={Paper} xs={2} sm={2} md={1} lg={1} xl={1} className={classes.image} style={{backgroundImage:'url('+ img +')', backgroundColor:col}}></Grid>
                                    <Grid container component={Paper} xs={8} sm={8} md={10} lg={10} xl={10} style={{backgroundColor: "#f9f7f5"}}>
                                        <Timer  col={col} fontcol= {fontcol} altcol= {altcol}/>
                                    </Grid>
                                    <Grid container component={Paper} xs={2} sm={2} md={1} lg={1} xl={1} className={classes.image} style={{backgroundImage:'url('+ img +')', backgroundColor:col}}></Grid>
                                </Grid>
                            </div>
                        )}
                </div>
            ) : (
                <Loading/>
            )}    
        </div>
    );
}