import React, { useState, useContext } from "react";
import Navbar from "../navigation/Navbar";
import { makeStyles } from '@material-ui/core/styles';
import { GlobalState } from "../../GlobalState";
import { Grid, Button, AppBar, Toolbar, Typography, Avatar, Box} from "@material-ui/core"
import { Link as RouterLink } from 'react-router-dom';
import { Shake } from 'reshake'
import '../../static/fonts/HarryP.TTF'; 
import ReactTypingEffect from 'react-typing-effect';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';



const useStyles = makeStyles((theme) => ({
  harryfont:{
    fontFamily: 'Harry P',
    fontSize: "40px",
    color: "black",
  },
  harryfont2:{
    fontFamily: 'Harry P',
    fontSize: "50px",
    color: "black",
  },
  logo: {
      backgroundImage: `url(https://res.cloudinary.com/adityakaushik/image/upload/v1628144994/Hp/sorting_hat_twrqbs.png)`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    },
    image: {
      backgroundImage: 'url(https://res.cloudinary.com/adityakaushik/image/upload/v1628144994/Hp/sorting_hat_twrqbs.png)',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    },
}));


const Loader = props => {
  
  const { characteristics , house } = props;
  const classes = useStyles();
  const [messageIndex, setMessageIndex] = React.useState(0);
  var finalmessage = React.useState("")
  React.useEffect(() => {
    let timeout;
    console.log(messageIndex)
    if (messageIndex>=0) {
      timeout = setTimeout(() => setMessageIndex(messageIndex + 1), 3500);
      if(messageIndex>=5){
        finalmessage=String(house)
      }
    }
  }, [characteristics, messageIndex]);
  if(messageIndex==0){
    finalmessage = "I see "+characteristics[messageIndex]
  }
  if(messageIndex==1){
    finalmessage = "But there is "+characteristics[messageIndex]
  }
  if(messageIndex==2){
    finalmessage = characteristics[messageIndex] + "... It's decisive "
  }
  if(messageIndex==0)
  {return (<Grid container spacing={0} direction="column" alignItems="center" justify="center">
  <ReactTypingEffect
    text={[finalmessage]} className={classes.harryfont2} speed= "100" eraseSpeed="100" eraseDelay= "100"  typingDelay="100" cursor=" "
  /></Grid>);}
  if(messageIndex==1)
  {return (<Grid container spacing={0} direction="column" alignItems="center" justify="center">
  <ReactTypingEffect
    text={[finalmessage]} className={classes.harryfont} speed= "100" eraseSpeed="100" eraseDelay= "100" typingDelay="100" cursor=" "
  /></Grid>);}
  else{
  return (<Grid container  spacing={0} direction="column" alignItems="center" justify="center">
  <ReactTypingEffect
    text={[finalmessage]} className={classes.harryfont2} speed= "100" eraseSpeed="100" eraseDelay= "100"  typingDelay="100"cursor=" "
  /></Grid>);
  }
};

  

function Sortinghat() {
  const classes = useStyles();
  const state = useContext(GlobalState);
  const [sortingdone] = state.userAPI.sortingdone;
  const [house] = state.userAPI.house;
  const [characteristics] = state.userAPI.characteristics;
  return <div>
    <Grid container component="main" className={classes.root}>
      
      <Grid item xs={false} sm={4} md={7} >
        <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        className= {classes.image}
        style={{ minHeight: '100vh' , backgroundColor: "#795c34"}}
      > </Grid></Grid>
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
      <Loader characteristics={characteristics} house={house} />
        </Grid></Grid>
    {/* <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justify="center"
      style={{ minHeight: '100vh' , backgroundColor: "#795c34"}}
    >
      <Loader characteristics={characteristics} house={house} />
      
      <Shake 
        h={7}
        v={9}
        r={23}
        dur={340}
        int={53}
        max={100}
        fixed={true}
        fixedStop={true}
        freez={true}>
        <Grid item xs={3} variant="outline" className={classes.logo}></Grid>  
      </Shake>
    </Grid>  */}
    </div>;
}

export default Sortinghat;
