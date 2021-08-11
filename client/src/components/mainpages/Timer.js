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
import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  harryfont:{
    fontFamily: 'Harry P',
  },
}));

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

  //Long Break Handler

  useEffect(() => {
    if (sessionNumber > 4) {
      setSessionType("Long Break");
      setSessionNumber(0);
    }
  }, [sessionNumber]);

  return (
    <Grid item xs={12} style={{paddingTop:"10vh"}}>
      <Typography align = "center" variant="h1" className={classes.harryfont}>
        {Duration.fromObject({
          minutes: timerLength,
        }).toFormat("mm:")}
        <span style={{color:fontcol}}>{Duration.fromObject({
          seconds: seconds,
        }).toFormat("ss")}</span>
      </Typography>
      
      <p className="uppercase border text-lg my-6 py-4 px-2">
        Session Number: {sessionNumber}
      </p>
      <div className="mb-6 animate-bounce">
        {sessionType === "Break" && (
          <FreeBreakfastOutlinedIcon
            style={{ color: "white", fontSize: "50px" }}
          />
        )}
        {sessionType === "Work" && (
          <LaptopChromebookOutlinedIcon
            style={{ color: "#69f0ae", fontSize: "50px" }}
          />
        )}
        {sessionType === "Long Break" && (
          <LocalHotelOutlinedIcon
            style={{ color: "white", fontSize: "50px" }}
          />
        )}
        <span className="ml-2 text-gray-400 text-xl">{sessionType} Mode</span>
      </div>
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
  );
};

export default Timer;
