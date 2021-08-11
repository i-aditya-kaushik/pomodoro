import React, { useContext, useState, useEffect } from "react";
import Duration from "luxon/src/duration.js";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import LaptopChromebookOutlinedIcon from "@material-ui/icons/LaptopChromebook";
import FreeBreakfastOutlinedIcon from "@material-ui/icons/FreeBreakfast";
import LocalHotelOutlinedIcon from "@material-ui/icons/LocalHotel";
import Button from "@material-ui/core/Button";
import PauseIcon from "@material-ui/icons/Pause";

import endedAudio from "../../static/Audio/alert_simple.wav";
import startedAudio from "../../static/Audio/notification_simple-01.wav";
import { GlobalState } from "../../GlobalState";
import { Box, CircularProgress, Grid, Typography } from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  harryfont:{
    fontFamily: 'Harry P',
  },
}));

const TimerBorder =  withStyles({
  colorPrimary: {
    color: "#444"
  },
  colorSecondary:{
    color: "#000"
  }
})(CircularProgress);


const CircularProgressWithLabel = props => {
  const classes = useStyles()
  const {timerLength , fontcol, seconds,col,altcol} = props 
  return (
    <Grid item align="center">
      <Box position="relative" display="inline-flex">
        <TimerBorder variant="determinate" thickness={2} size={250}{...props} />
        <Box
          top={0}
          left={0}
          bottom={0}
          right={0}
          position="absolute"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Typography align = "center" variant="h1" className={classes.harryfont}>
          {Duration.fromObject({
            minutes: timerLength,
          }).toFormat("mm:")}
          <span style={{color:fontcol}}>{Duration.fromObject({
            seconds: seconds,
          }).toFormat("ss")}</span>
        </Typography>
        </Box>
      </Box>
      </Grid>
  );
}


const Timer = props => {
  const {col,fontcol,altcol} = props
  const classes = useStyles();
  const [timerLength, setTimerLength] = useState(24);
  const [seconds, setSeconds] = useState(59);
  const [timerOn, setTimerOn] = useState(false);
  const [timerDone, setTimerDone] = useState(true);
  const [sessionType, setSessionType] = useState("Work");
  const [sessionNumber, setSessionNumber] = useState(0);

  const startedSound = new Audio(startedAudio);
  const endedSound = new Audio(endedAudio);
  
  const state = useContext(GlobalState);
  const [isLogged] = state.userAPI.isLogged;
  const [longbreak,setlongbreak] = useState(20);
  const [shortbreak,setshortbreak] = useState(5);
  const [worktime,setworktime] = useState(25);

  const worktimer = parseInt(worktime) - 1;
  const shorttimer = parseInt(shortbreak) - 1;
  const longtimer = parseInt(longbreak) - 1;
  useEffect(()=>{
    if(isLogged){
      setlongbreak(state.userAPI.longbreak)
      setshortbreak(state.userAPI.shortbreak)
      setworktime(state.userAPI.worktime)
    }
  }, [isLogged])

  useEffect(() => {
    const interval = setInterval(() => {
      if (timerOn) {
        setSeconds((seconds) => seconds - 1);
      }
    }, 1000);

    if (seconds === 0) {
      setTimeout(() => {
        setSeconds((seconds) => seconds + 60);
        setTimerLength((timerLength) => timerLength - 1);
        if (timerLength === 0) {
          endedSound.play();
          setTimerOn(false);
          setTimerDone(true);
          setSessionType((prevType) => {
            if (prevType === "Work") return "Break";
            if (prevType === "Break") return "Work";
            if (prevType === "Long Break") return "Work";
          });
        }
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [timerOn, seconds, timerLength]);


  //Switching Timers: From Work Mode to Break Mode
  useEffect(() => {
    if (sessionType === "Work") {
      setTimerLength(worktimer);
    }
  }, [sessionType, worktimer]);

  useEffect(() => {
    if (sessionType === "Break") {
      setTimerLength(shorttimer);
    }
  }, [shorttimer, sessionType]);

  useEffect(() => {
    if (sessionType === "Long Break") {
      setTimerLength(longtimer);
    }
  }, [longtimer, sessionType]);

  //Switching Timers: From Break Mode to Long Break Mode
  useEffect(() => {
    if (sessionType === "Work" && timerDone) {
      setSessionNumber((prevNumber) => prevNumber + 1);
    }
  }, [sessionType, timerDone]);
  
  const [progress, setProgress] = React.useState(100);
  React.useEffect(() => {
    const timer = setInterval(() => {
      if (sessionType === "Work") {
        setProgress(((timerLength*60 + seconds)/((worktimer+1)*60))*100);
      }
      if (sessionType === "Break") {
        setProgress(((timerLength*60 + seconds)/((shorttimer+1)*60))*100);
      }
      if (sessionType === "Long Break") {
        setProgress(((timerLength*60 + seconds)/((longtimer+1)*60))*100);
      }
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, [timerOn, seconds, timerLength,sessionType]);

  useEffect(() => {
    if (sessionNumber > 4) {
      setSessionType("Long Break");
      setSessionNumber(0);
    }
  }, [sessionNumber]);

  return (
    <Grid container>
      <Grid item xs={12} md={12} lg={6} xl={6} style={{paddingTop:"5vh"}}>
        <CircularProgressWithLabel value={progress} timerLength = {timerLength} seconds= {seconds} fontcol={fontcol} col={col} altcol={altcol}/>
        <Typography align = "center" variant="h3" className={classes.harryfont}>
          Session Number: {sessionNumber}/4
        </Typography>
        <Grid align = "center" style={{paddingTop:"1vh"}}>
          <Typography align = "center" variant="h5" style={{color:fontcol}}>{sessionType} Mode</Typography>
        </Grid>
        <Grid align = "center" style={{paddingTop:"3vh"}}>
          <Button
              style = {{backgroundColor:col, color:fontcol}}
              color="default"
              variant="contained"
              size="large"
              startIcon={timerOn ? <PauseIcon /> : <PlayArrowIcon />}
              onClick={() => {
                setTimerOn(!timerOn);
                startedSound.play();
              }}
            >
            {timerOn ? "Pause" : "Run"}
          </Button>
        </Grid>
      </Grid>
      <Grid item xs={12} md={12} lg={6} xl={6} style={{paddingTop:"5vh"}}>
        <Typography align = "center" variant="h3" className={classes.harryfont}>
          Tasks:
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Timer;
