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
import Loading from "../utilities/Loading";



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
  buttonFontSize:{
    fontSize:"15px",
    color:"black",
  },
  buttonPc: {
    fontSize:"18px",
    margin: theme.spacing(1),
  },
  loginButton:{
    background:"black",
    color:'white',
    borderRadius:"10px",
    padding:"0px 25px",

    '&:hover':{
      background: "black",
      boxShadow: "0px 2px 10px #888888"
    }
  },
    
}));

  

function Sortinghat() {
  const classes = useStyles();
  const state = useContext(GlobalState);
  const [isloading,setisloading] = state.userAPI.isloading
  const [sortingdone] = state.userAPI.sortingdone;
  const [house,setHouse] = state.userAPI.house;
  const [characteristics] = state.userAPI.characteristics;
  const [isLogged] = state.userAPI.isLogged;
  const matches = useMediaQuery('(max-width:1025px)');
  useEffect(()=>{
    setTimeout( function() { if(isloading){
        setisloading(false)
    } }, 7000);
  },[])
  var col = "white"
  var fontcol = "black"
  var altcol = "#9c9264"
  if(house=="Gryffindor"){
    col = "#7f0909"
    fontcol="#ffc500"
    altcol = "#eeba30"
  }
  if(house=="Slytherin"){
    col = "#0b4d00"
    fontcol="#aaaaaa"
    altcol = "#5d5d5d"
  }
  if(house=="Ravenclaw"){
    col="#222f5b"
    fontcol="#946b2d"
    altcol = "#5d5d5d"
  }
  if(house=="Hufflepuff"){
    col="#ffdb00"
    fontcol="#000000"
    altcol = "#726255"
  }
  return <div>
    {!isloading ? (
        <div> {isLogged ? (
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
              style={{ minHeight: '91vh',backgroundColor: altcol }}
            > </Grid></Grid>
            <Grid item xs={12} sm={12} md={5} component={Paper} elevation={4} style={{backgroundColor:col}} square>
            <Grid container spacing={0} direction="column" className={classes.padding1} style={{minHeight:"80vh"}}>
                <ReactTypingEffect 
                text={["I can see some " + characteristics[0] + ". But..! "+characteristics[1] 
                + " as well... Hmm.. " +characteristics[2] + ", Lots of "+ characteristics[2]+"... Better be... "+ house.toUpperCase()+"!!!"]} className={classes.harryfont} style={{fontSize: matches?"40px":"60px",padding: matches?"50px":"20px",color:fontcol}} speed= "100" eraseSpeed="9999999999" eraseDelay= "9999999999" typingDelay="100" 
                cursor=" "/>
            </Grid><Grid align = "center">
              <Button component={RouterLink} to="/" className={[classes.buttonFontSize,classes.loginButton,classes.harryfont]} style={{fontSize:"20px",margin:"10px"}}>Go to Home Page</Button>
              <Button component={RouterLink} to="/profile" className={[classes.buttonFontSize,classes.loginButton,classes.harryfont]} style={{fontSize:"20px",margin:"10px"}}>Set up my Profile</Button>
            </Grid>
            </Grid></Grid>
          </div>
        ) : (
          <NotFound/>
        )}
        </div>
      ) : (
      <Loading/>
    )}
    </div>
    
}

export default Sortinghat;
