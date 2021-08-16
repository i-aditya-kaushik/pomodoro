import React, { useContext, useState, useEffect, useCallback } from "react";
import Duration from "luxon/src/duration.js";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import LaptopChromebookOutlinedIcon from "@material-ui/icons/LaptopChromebook";
import FreeBreakfastOutlinedIcon from "@material-ui/icons/FreeBreakfast";
import LocalHotelOutlinedIcon from "@material-ui/icons/LocalHotel";
import Button from "@material-ui/core/Button";
import PauseIcon from "@material-ui/icons/Pause";
import RefreshIcon from '@material-ui/icons/Refresh';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import AddIcon from '@material-ui/icons/Add';
import Paper from '@material-ui/core/Paper';

import endshortbreak from "../../static/Audio/short_break_end.wav";
import endlongbreak from "../../static/Audio/long_break_end.wav";
import longbreakstart from "../../static/Audio/longbreak.wav";
import workend from "../../static/Audio/work_end.wav";
import unpause from "../../static/Audio/unpause.wav";
import startedAudio from "../../static/Audio/notification_simple-01.wav";
import { GlobalState } from "../../GlobalState";
import { Box, CircularProgress, Grid, List, ListItem, Snackbar, Typography } from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/styles";
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
  harryfont:{
    fontFamily: 'Harry P',
  },
  listItem:{
    margin:"15px 10px 0px 0px",
    padding:"10px",
  }
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
  const [timerLength, setTimerLength] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [timerOn, setTimerOn] = useState(false);
  const [timerDone, setTimerDone] = useState(true);
  const [sessionType, setSessionType] = useState("Work");
  const [sessionNumber, setSessionNumber] = useState(0);
  const startedSound = new Audio(startedAudio);
  const endshortbreak_aud = new Audio(endshortbreak);
  const endlongbreak_aud = new Audio(endlongbreak);
  const workend_aud = new Audio(workend);
  const unpause_aud = new Audio(unpause);
  const longbreakstart_aud = new Audio(longbreakstart);
  const state = useContext(GlobalState);
  const [tasks,settasks] = state.userAPI.tasks
  const [isLogged] = state.userAPI.isLogged;
  const [longbreak,setlongbreak] = state.userAPI.longbreak
  const [shortbreak,setshortbreak] = state.userAPI.shortbreak
  const [worktime,setworktime] = state.userAPI.worktime
  const [islocked,setislocked] = state.islocked
  const [open, setOpen] = React.useState(false);
  const [error, seterror] = React.useState("Some Kind of error occured!");
  const erroroccur = (err) => {
      setOpen(true);
      seterror(err);
    };
  const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }

      setOpen(false);
    };
  useEffect(()=>{
    if(timerOn){
      const target_date = new Date(new Date().getTime() + timerLength * 60000 + seconds * 1000)
      const interval = setInterval(() => {
        const current_date = new Date().getTime();
        if(document.hidden || !document.hidden){
          if(parseInt(target_date-current_date) <=0 ){
            if (timerOn) {
              if(sessionType=="Work"){
                workend_aud.play()
                setTimeout(() => {
                unpause_aud.play()
              }, 10000);
              };
              if(sessionType=="Break"){
                endshortbreak_aud.play()
                setTimeout(() => {
                unpause_aud.play()
              }, 10000);
              };
              if(sessionType=="Long Break"){
                endlongbreak_aud.play()
                setTimeout(() => {
                unpause_aud.play()
              }, 10000);
              };
              setTimerOn(false);
              setTimerDone(true);
              setSessionType((prevType) => {
                if (prevType === "Work") return "Break";
                if (prevType === "Break") return "Work";
                if (prevType === "Long Break") return "Work";
              });
            }
          }
        }
        var seconds_left = (target_date - current_date) / 1000;
        var days = parseInt(seconds_left / 86400);
        seconds_left = seconds_left % 86400;
        var hours = parseInt(seconds_left / 3600);
        seconds_left = seconds_left % 3600;
        if(Math.round(parseFloat(seconds_left % 60))==60) {setTimerLength(parseInt(seconds_left / 60) + 1);setSeconds(0)}
        else {setTimerLength(parseInt(seconds_left / 60));setSeconds(Math.round(parseFloat(seconds_left % 60)))};
      }, 1000);
      return () => {
        clearInterval(interval);
      };
    }
    
  },[timerOn])

  //Switching Timers: From Work Mode to Break Mode
  useEffect(() => {
    if (sessionType === "Work") {
      setTimerLength(parseInt(worktime));
    }
  }, [sessionType, parseInt(worktime)]);

  useEffect(() => {
    if (sessionType === "Break") {
      setTimerLength(parseInt(shortbreak));
    }
  }, [parseInt(shortbreak), sessionType]);

  useEffect(() => {
    if (sessionType === "Long Break") {
      setTimeout(() => {
        longbreakstart_aud.play()
      }, 2000);
      setTimerLength(parseInt(longbreak));
    }
  }, [parseInt(longbreak), sessionType]);

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
        setProgress(((timerLength*60 + seconds)/((parseInt(worktime))*60))*100);
      }
      if (sessionType === "Break") {
        setProgress(((timerLength*60 + seconds)/((parseInt(shortbreak))*60))*100);
      }
      if (sessionType === "Long Break") {
        setProgress(((timerLength*60 + seconds)/((parseInt(longbreak))*60))*100);
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
      <Snackbar open={open} autoHideDuration={4000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
          <Alert onClose={handleClose} severity="info">
            {error}
          </Alert>
        </Snackbar>
      <Grid item xs={12} md={12} lg={6} xl={6} style={{paddingTop:"20vh"}}>
        <CircularProgressWithLabel value={progress} timerLength = {timerLength} seconds= {seconds} fontcol={fontcol} col={col} altcol={altcol}/>
        <Typography align = "center" variant="h3" className={classes.harryfont}>
          Session Number: {sessionNumber}/4
        </Typography>
        <Grid align = "center" style={{paddingTop:"1vh"}}>
          <Typography align = "center" variant="h5" style={{color:fontcol}}>{sessionType} Mode</Typography>
        </Grid>
        <Grid align = "center" style={{paddingTop:"3vh"}}>
          <Button
              style = {{backgroundColor:col, color:fontcol, padding:"10px" , margin:"10px"
                      , borderRadius:"20%", textAlign:"center"}}
              color="default"
              variant="contained"
              size="large"
              onClick={() => {
                setTimerOn(false)
                setislocked(false)
                if (sessionType === "Work") {
                  setTimerLength(parseInt(worktime));
                  setSeconds(0)
                }
                if (sessionType === "Break") {
                  setTimerLength(parseInt(shortbreak));
                  setSeconds(0)
                }
                if (sessionType === "Long Break") {
                  setTimerLength(parseInt(longbreak));
                  setSeconds(0)
                }
              }}> <RefreshIcon />
          </Button>
          <Button
              style = {{backgroundColor:col, color:fontcol}}
              color="default"
              variant="contained"
              size="large"
              startIcon={timerOn ? <PauseIcon /> : <PlayArrowIcon />}
              onClick={() => {
                setislocked(!islocked);
                if(!islocked){erroroccur("Pause the timer to change your settings.")}
                setTimerOn(!timerOn);
                startedSound.play();
              }}
            >
            {timerOn ? "Pause" : "Run"}
          </Button>
          <Button
              style = {{backgroundColor:col, color:fontcol, padding:"10px" , margin:"10px"
                      , borderRadius:"20%", textAlign:"center"}}
              color="default"
              variant="contained"
              size="large"
              onClick={() => {
                setTimerOn(false)
                setislocked(false)
                setSessionType((prevType) => {
                  if (prevType === "Work") return "Break";
                  if (prevType === "Break") return "Work";
                  if (prevType === "Long Break") return "Work";
                });
                if (sessionType === "Work") {
                  setTimerLength(parseInt(worktime));
                  setSeconds(0)
                }
                if (sessionType === "Break") {
                  setTimerLength(parseInt(shortbreak));
                  setSeconds(0)
                }
                if (sessionType === "Long Break") {
                  setTimerLength(parseInt(longbreak));
                  setSeconds(0)
                }
              }}> <SkipNextIcon />
          </Button>
        </Grid>
        <Grid>
          {tasks.length ? "abc" : <div></div>}
        </Grid>
      </Grid>
      <Grid item xs={12} md={12} lg={6} xl={6} style={{paddingTop:"11vh"}}>
        <Typography align = "center" variant="h4" className={classes.harryfont}>
          TASKS <Button
              style = {{backgroundColor:col, color:fontcol, padding:"10px", marginTop:"-10px"
                      , borderRadius:"20%", textAlign:"center"}}
              color="default"
              variant="contained"
              size="large"
              onClick={() => {
                setTimerOn(false)
                setSessionType((prevType) => {
                  if (prevType === "Work") return "Break";
                  if (prevType === "Break") return "Work";
                  if (prevType === "Long Break") return "Work";
                });
                if (sessionType === "Work") {
                  setTimerLength(parseInt(worktime));
                  setSeconds(0)
                }
                if (sessionType === "Break") {
                  setTimerLength(parseInt(shortbreak));
                  setSeconds(0)
                }
                if (sessionType === "Long Break") {
                  setTimerLength(parseInt(longbreak));
                  setSeconds(0)
                }
              }}> <AddIcon />
          </Button>
        </Typography>
        <List style={{padding:"10px"}}>
            {
              tasks.map(item => (
                <div key = {item._id}>
                    <ListItem component={Paper} elevation={2}
                        style={{fontSize:"20px",color:col}}
                        className= {classes.listItem} 
                        selectedLead = {item}
                      ><Grid container>
                        <Grid container justifyContent="flex-start">
                          {item.name.toUpperCase()}
                        </Grid>
                        <Grid container justifyContent="flex-end">
                        {item.pomodoro_done}/{item.total_pomodoro}
                        </Grid>
                      </Grid>
                    </ListItem>
                </div>
              ))
            }
          </List>
      </Grid>
    </Grid>
  );
};

export default Timer;
