import React, { useState, useContext } from "react";
import Navbar from "../navigation/Navbar";
import { makeStyles } from '@material-ui/core/styles';
import { GlobalState } from "../../GlobalState";
import { Grid, Button, AppBar, Toolbar, Typography, Avatar, Box} from "@material-ui/core"
import { Link as RouterLink } from 'react-router-dom';
import { Shake } from 'reshake'
import '../../static/fonts/HarryP.TTF'; 
import Typewriter from "typewriter-effect";

const useStyles = makeStyles((theme) => ({
  harryfont:{
    fontFamily: 'Harry P',
    fontSize: "40px",
    color: "white"
  },
  logo: {
      backgroundImage: `url(https://res.cloudinary.com/adityakaushik/image/upload/v1628144994/Hp/sorting_hat_twrqbs.png)`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight:254,
      minWidth: 290
    }
}));
  

function Sortinghat() {
  const classes = useStyles();
  const state = useContext(GlobalState);
  const [sortingdone] = state.userAPI.sortingdone;
  const [house] = state.userAPI.house;
  const [trait1,setTrait1] = state.userAPI.trait1;
  const [trait2,setTrait2] = state.userAPI.trait2;
  const [trait3,setTrait3] = state.userAPI.trait3;
  return <div>
    <Navbar />
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justify="center"
      style={{ minHeight: '100vh' , backgroundColor: "#795c34"}}
    >
      <Grid container className={classes.harryfont} spacing={0} direction="column" alignItems="center" justify="center" style={{ minHeight: '20vh' , backgroundColor: "#795c34"}}>
      {trait1}{trait2}{trait3}
      <Typewriter
      onInit={(typewriter)=> {
      typewriter
      .typeString("I SEE "+ {trait1} +"!")
      .pauseFor(1000)
      .deleteAll()
      .typeString("OOO BUT I SEE "+ {trait2} +" AS WELL")
      .deleteAll()
      .typeString("THIS CAN'T BE A COINCIDENCE. PLENTY OF "+ {trait3} +"!")
      .deleteAll()
      .typeString("BETTER BE...... ")
      .deleteAll()
      .typeString({house}+"!!!!")
      .start();
      }}
      /></Grid>
      <Shake 
        h={7}
        v={9}
        r={23}
        dur={340}
        int={53}
        max={100}
        fixed={true}
        fixedStop={false}
        freez={false}>
        <Grid item xs={3} variant="outline" className={classes.logo}></Grid>  
      </Shake>
    </Grid> 
    </div>;
}

export default Sortinghat;
