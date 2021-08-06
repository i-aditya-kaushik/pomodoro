import React, { useState, useContext, useEffect } from "react";
import Navbar from "../navigation/Navbar";
import { makeStyles } from '@material-ui/core/styles';
import { GlobalState } from "../../GlobalState";
import { Grid, Button, AppBar, Toolbar, Typography, Avatar, Box} from "@material-ui/core"
import { Link as RouterLink } from 'react-router-dom';
import '../../static/fonts/HarryP.TTF'; 
import ReactTypingEffect from 'react-typing-effect';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import NotFound from "../utilities/NotFound";



const useStyles = makeStyles((theme) => ({
  harryfont:{
    fontFamily: 'Harry P',
    fontSize: "70px",
    color: "black",
  },
    image: {
      backgroundImage: 'url(https://res.cloudinary.com/adityakaushik/image/upload/v1628144994/Hp/sorting_hat_twrqbs.png)',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    },
    
}));

  

function Sortinghat() {
  const classes = useStyles();
  const state = useContext(GlobalState);
  const [sortingdone] = state.userAPI.sortingdone;
  const [house,setHouse] = state.userAPI.house;
  const [characteristics] = state.userAPI.characteristics;
  const [isLogged] = state.userAPI.isLogged;
  const matches = useMediaQuery('(max-width:768px)');
  var col = "white"
  var fontcol = "black"
  if(house=="Gryffindor"){
    col = "#7f0909"
    fontcol="#ffc500"
  }
  if(house=="Slytherin"){
    col = "#0d6217"
    fontcol="#aaaaaa"
  }
  if(house=="Ravenclaw"){
    col="#000a90"
    fontcol="#946b2d"
  }
  if(house=="Hufflepuff"){
    col="#eee117"
    fontcol="#000000"
  }
  return <div> {isLogged ? (
      <div>
      <Navbar/>
      <Grid container component="main" className={classes.root}>
        
        <Grid item xs={false} sm={false} md={7} >
          <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justify="center"
          
          className= {classes.image}
          style={{ minHeight: '91vh',backgroundColor: "#9c9264" }}
        > </Grid></Grid>
        <Grid item xs={12} sm={12} md={5} component={Paper} elevation={4} style={{backgroundColor:col}} square>
        <Grid container spacing={0} direction="column" alignItems="center"  justify="center" className={classes.padding1} >
          {matches ? (
            <ReactTypingEffect 
            text={["I can see some " + characteristics[0] + ". But there is "+characteristics[1] 
            + ".. Hmm.. " +characteristics[2] + ", Lots of "+ characteristics[2]+"... Better be... "+ house.toUpperCase()+"!!!"]} className={classes.harryfont} style={{fontSize:"40px",padding:"50px",color:fontcol}} speed= "100" eraseSpeed="9999999999" eraseDelay= "9999999999" typingDelay="100" 
            cursor=" "/>
          ):(
            <ReactTypingEffect 
            text={["I can see some " + characteristics[0] + ". But there is "+characteristics[1] 
            + ".. Hmm.. " +characteristics[2] + ", Lots of "+ characteristics[2]+"... Better be... "+ house.toUpperCase()+"!!!"]} className={classes.harryfont} style={{fontSize:"70px",padding:"20px",color:fontcol}} speed= "100" eraseSpeed="9999999999" eraseDelay= "9999999999" typingDelay="100" 
            cursor=" "/>
          )}
          </Grid>
          </Grid></Grid>
      </div>
    ) : (
      <NotFound/>
    )}
    </div>
    ;
}

export default Sortinghat;
