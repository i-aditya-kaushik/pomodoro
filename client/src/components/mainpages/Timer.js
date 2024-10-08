import React, { useContext, useState, useEffect, useCallback } from "react";
import Duration from "luxon/src/duration.js";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import Button from "@material-ui/core/Button";
import PauseIcon from "@material-ui/icons/Pause";
import RefreshIcon from '@material-ui/icons/Refresh';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/DeleteOutlineOutlined';
import { Link as RouterLink } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Pagination from '@material-ui/lab/Pagination';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import EditIcon from '@material-ui/icons/EditOutlined';
import Tooltip from '@material-ui/core/Tooltip';
import CheckOutlinedIcon from '@material-ui/icons/CheckOutlined';
import endshortbreak from "../../static/Audio/short_break_end.wav";
import endlongbreak from "../../static/Audio/long_break_end.wav";
import longbreakstart from "../../static/Audio/longbreak.wav";
import workend from "../../static/Audio/work_end.wav";
import unpause from "../../static/Audio/unpause.wav";
import startedAudio from "../../static/Audio/notification_simple-01.wav";
import { GlobalState } from "../../GlobalState";
import { Box, CircularProgress, FormControl, Grid, List, ListItem, MenuItem, Snackbar, TextField, Typography } from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/styles";
import Alert from "@material-ui/lab/Alert";
import EventNoteOutlinedIcon from '@material-ui/icons/EventNoteOutlined';
import axios from "axios";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const useStyles = makeStyles((theme) => ({
  harryfont:{
    fontFamily: 'Harry P',
  },
  listItem:{
    margin:"15px 10px 0px 0px",
    padding:"10px",
  },
  formControl:{
    minWidth: 200,
  },
  loginButton:{
    '&:hover':{
      background: "black",
      boxShadow: "0px 2px 10px #888888"
    }
  },
  logo: {
    backgroundImage: `url(https://res.cloudinary.com/adityakaushik/image/upload/c_scale,w_247/v1629829596/Hp/nothing_here_jvrkvg.png)`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    maxHeight: '47vh',
    minHeight:"47vh",
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
  const [addtask, setaddtask] = useState({
    total_pomodoro: 0,
    notes: ""
  });
  const [timerLength, setTimerLength] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [timerOn, setTimerOn] = useState(false);
  const [timerDone, setTimerDone] = useState(true);
  const [sessionNumber, setSessionNumber] = useState(0);
  const [page, setPage] = React.useState(1);
  const startedSound = new Audio(startedAudio);
  const endshortbreak_aud = new Audio(endshortbreak);
  const endlongbreak_aud = new Audio(endlongbreak);
  const workend_aud = new Audio(workend);
  const unpause_aud = new Audio(unpause);
  const [open1, setOpen1] = React.useState(false);
  const [opendialog, setOpendialog] = React.useState(false);

  const handleClickOpendialog = () => {
    setOpendialog(true);
  };

  const handleClosedialog = () => {
    setOpendialog(false);
  };
  const [opendialognotes, setOpendialognotes] = React.useState(false);

  const handleClickOpendialognotes = () => {
    setOpendialognotes(true);
  };

  const handleClosedialognotes = () => {
    setOpendialognotes(false);
  };
  const [notes,setnotes] = React.useState(null)
  const [options, setOptions] = React.useState([]);
  const loading = open1 && options.length === 0;
  const longbreakstart_aud = new Audio(longbreakstart);
  const state = useContext(GlobalState);
  const [isloading,setisloading] = state.userAPI.isloading
  const [sessionType, setSessionType] = state.userAPI.sessionType;
  const [tasktag, settasktag] = React.useState('');
  const [taskname,settaskname] = useState("")
  const [usertag,setusertag] = state.userAPI.usertag
  const [tasks,settasks] = state.userAPI.tasks;
  const [current_task,setcurrenttask] = tasks.length ? useState(tasks[0]) : useState()
  const [isLogged] = state.userAPI.isLogged;
  const [longbreak,setlongbreak] = state.userAPI.longbreak
  const [shortbreak,setshortbreak] = state.userAPI.shortbreak
  const [worktime,setworktime] = state.userAPI.worktime
  const [islocked,setislocked] = state.islocked
  const [open, setOpen] = React.useState(false);
  const [token] = state.token;
  const onChangeInput = e => {
    const { name, value } = e.target;
    setaddtask({ ...addtask, [name]: value });
  };
  var subset = tasks.slice(0+(page-1)*3, 3+(page-1)*3)
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

    useEffect(async ()=>{
      const response1 = await axios.get(
        "/user/gettagsuser", {
            headers: { Authorization: token },
          }
        );
        setOptions(response1.data.tags)
    },[usertag,isLogged])

  const removeactive = async (current_task,token) =>{
    try{
      await axios.put("/user/deleteactivetask", 
        {...current_task},{
          headers: { 'Authorization': token }
      });
  } catch(err) {
    console.log(err.response)
  }
  try{
    const response2 = await axios.get(
      "/user/gettasksuser", {
        headers: { "Authorization": token },
      }
    );
    settasks(response2.data.final_ret)
    tasks.length ? setcurrenttask(tasks[0]) : setcurrenttask(null)
  } catch(err) {
    console.log(err.response.data)
  }
  }

  const updatepomodoro = async (current_task,token) =>{
    try{
      await axios.post("/user/increasecurrentpomodoro", 
        { id: current_task._id , pomodoro_done: current_task.pomodoro_done},{
          headers: { 'Authorization': token }
      });
    } catch (err) {
      console.log(err)
    }
  }

  const addthistask = async e => {
    e.preventDefault();
    if(addtask.total_pomodoro<=0) {erroroccur("Pomodoros have to be greater than 0."); return}
    try {
      handleClosedialog()
      setisloading(true)
      await axios.post("/user/addtask", { ...addtask, tags:tasktag },
      {
        headers: { 'Authorization': token }
      });
      const response2 = await axios.get(
        "/user/gettasksuser", {
          headers: { "Authorization": token },
        }
      );
      settasks(response2.data.final_ret)
      setcurrenttask(tasks[0])
      setisloading(false)
      setaddtask({
        total_pomodoro: 0,
        notes: ""})
    } catch (err) {
      console.log(err.response)
    }
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
                if(tasks.length>=2){
                  updatepomodoro(current_task,token)
                  current_task.pomodoro_done+=1
                  if(current_task.total_pomodoro==current_task.pomodoro_done){
                    erroroccur(`${current_task.name} has been completed.`)
                    removeactive(current_task,token)
                  }
                }
                else {if(tasks.length){updatepomodoro(tasks[0],token);tasks[0].pomodoro_done+=1;if(tasks[0].total_pomodoro==tasks[0].pomodoro_done){
                  removeactive(tasks[0],token)
                }}}
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
              setislocked(false)
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
        if(parseInt(target_date-current_date) < 0 ) setSeconds(0)
      }, 1000);
      return () => {
        clearInterval(interval);
      };
    }
    
  },[timerOn])

  useEffect(()=>{
    setcurrenttask(tasks[0])
  },[tasks])

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
      <Grid item xs={12} md={12} lg={isLogged?6:12} xl={isLogged?6:12} style={{paddingTop:"14vh"}}>
        <CircularProgressWithLabel value={progress} timerLength = {timerLength} seconds= {seconds} fontcol={fontcol} col={col} altcol={altcol}/>
        <Typography align = "center" variant="h3" className={classes.harryfont}>
          Session Number: {sessionNumber}/4
        </Typography>
        <Grid align = "center" style={{paddingTop:"1vh"}}>
          <Typography align = "center" variant="h4" style={{color:fontcol,fontFamily: 'PfefferMediaeval'}}>{sessionType} Mode</Typography>
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
                if(!islocked){erroroccur("Pause the timer to change your settings/tasks.")}
                setTimerOn(!timerOn);
                startedSound.play();
              }}
            >
            {timerOn ? "Pause Timer" : sessionType=="Work" ? "Start Working" : "Start the Break"}
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
        <Grid align="center" style={{paddingTop:"10px"}}>
          {tasks.length ? 
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">Working on</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              defaultValue={tasks[0]}
              disabled={islocked}
              onChange={(event,value)=>{
                setcurrenttask(value.props.value)
              }}
            >
              {tasks.map(item => {
                return <MenuItem value={item}>{item.name}</MenuItem>
              })}
            </Select>
          </FormControl> : <div></div>}
        </Grid>
      </Grid>
      {isLogged ? (<Grid item xs={12} md={12} lg={6} xl={6} style={{paddingTop:"9vh"}}>
          <Grid style={{minHeight:"65vh"}}>
            <Typography align = "center" variant="h4" style={{fontFamily:"PfefferMediaeval"}}>
              YOUR TASKS 
            </Typography>
            <Dialog open={opendialognotes} onClose={handleClosedialognotes} aria-labelledby="form-dialog-title">
              <DialogTitle style={{color:col}}>Edit Notes for the task : {notes ? notes.name : ""}</DialogTitle>
              <DialogContent>
                <DialogContentText style={{color:fontcol,fontFamily: 'PfefferMediaeval'}}>
                  You can add some subtasks, objectives, or simply include something which you should not forget.
                </DialogContentText>
                  <Grid>
                      <Grid style={{marginTop:"10px"}}>
                      <TextField
                          id="notes"
                          name="notes"
                          label="Notes for the task"
                          variant="outlined"
                          multiline
                          defaultValue={(notes)?notes.notes:""}
                          onChange={onChangeInput}
                          fullWidth
                          rows={4}
                          variant="outlined"
                        />
                      </Grid>
                  </Grid>
                  <DialogActions>
                    <Tooltip title="Cancel"><Button onClick={handleClosedialognotes} className={classes.loginButton} style={{fontFamily:"PfefferMediaeval",backgroundColor:col,color:fontcol,margin:"10px"}}>Cancel</Button></Tooltip>
                    <Tooltip title="Update Notes"><Button onClick={async () => {
                      try{
                        notes.notes = addtask.notes
                        await axios.post("/user/taskupdatenotes", 
                          { id: notes._id , notes: addtask.notes },{
                            headers: { 'Authorization': token }
                        });
                        handleClosedialognotes()
                      } catch (err) {
                        console.log(err)
                      }
                    }} className={classes.loginButton} style={{fontFamily:"PfefferMediaeval",backgroundColor:col,color:fontcol,margin:"10px"}}>Edit Task Notes</Button></Tooltip> 
                  </DialogActions>
              </DialogContent>
              
            </Dialog>

            <Dialog open={opendialog} onClose={handleClosedialog} aria-labelledby="form-dialog-title">
              <DialogTitle style={{color:col}}>Add a Task</DialogTitle>
              <DialogContent>
                <DialogContentText style={{color:fontcol,fontFamily: 'PfefferMediaeval'}}>
                  A task contains a name, the tag associated with the task [if you do not have a suitable tag, edit your tag in the profile section], and the total work pomodoros required to complete the task.
                  <br/>You can add some subtasks, objectives, or simply include something which you should not forget as your notes.
                </DialogContentText>
                  <form className={classes.root} onSubmit={addthistask} Autocomplete="off">
                  <Grid>
                    <Grid style={{marginTop:"10px"}}>
                      <TextField fullWidth inputProps={{maxLength: 20}} onChange={onChangeInput} required id="name" name="name" label="Task Name[Keep it short]" variant="outlined"/>
                    </Grid>
                    <Grid style={{marginTop:"10px"}}>
                        <InputLabel fullWidth id="tags" name="tags" onChange={onChangeInput}></InputLabel>
                          <Select
                            variant="outlined"
                            value={tasktag}
                            className={classes.formControl}
                            displayEmpty
                            fullWidth
                            id="tags" name="tags"
                            onChange={(event,value)=>{
                              settasktag(value.props.value)
                            }}
                          ><MenuItem value="" disabled>
                              <span color="#aaa">Choose Tag *</span>
                            </MenuItem>
                            {options.map(item => {
                              return <MenuItem value={item}>{item.name}</MenuItem>
                            })}
                          </Select>
                      </Grid>
                      <Grid style={{marginTop:"10px"}}>
                        <Tooltip title="The number of work pomodoros required"><TextField fullWidth onChange={onChangeInput} required id="total_pomodoro" name="total_pomodoro" label="Pomodoros" variant="outlined" type="number"
                          /></Tooltip>
                      </Grid>
                      <Grid style={{marginTop:"10px"}}>
                      <TextField
                          id="notes"
                          name="notes"
                          label="Notes for the task"
                          variant="outlined"
                          multiline
                          onChange={onChangeInput}
                          fullWidth
                          rows={4}
                          variant="outlined"
                        />
                      </Grid>
                  </Grid>
                  <DialogActions>
                    <Tooltip title="Cancel"><Button onClick={handleClosedialog} className={classes.loginButton} style={{fontFamily:"PfefferMediaeval",backgroundColor:col,color:fontcol,margin:"10px"}}>Cancel</Button></Tooltip>
                    <Tooltip title="Add Task"><Button type="submit" className={classes.loginButton} style={{fontFamily:"PfefferMediaeval",backgroundColor:col,color:fontcol,margin:"10px"}}>Add this task</Button></Tooltip> 
                  </DialogActions>
                </form>
              </DialogContent>
              
            </Dialog>
              <Grid container style={{padding:"10px"}}>
                <Box flexGrow={1}>
                  <Tooltip title="Add Task"><Button disabled={islocked} onClick={handleClickOpendialog} className={classes.loginButton} style={{ fontFamily:"PfefferMediaeval",backgroundColor:col,color:fontcol}}>Add a Task</Button></Tooltip>
                </Box>
                <Box>
                  <Tooltip title="Task Management"><Button disabled={islocked} component={RouterLink} to="/tasks" className={classes.loginButton} style={{ fontFamily:"PfefferMediaeval",backgroundColor:col,color:fontcol}}>Task Management</Button></Tooltip>
                </Box>
              </Grid>
            <List style={{padding:"5px"}} className={subset.length ? classes.noclass : classes.logo}>
                { 
                  subset.map(item => (
                    <div key = {item._id}>
                      <ListItem variant="outlined" component={Paper} elevation={2}
                          style={{fontFamily: 'PfefferMediaeval',fontSize:"20px",color:fontcol, borderColor:col}}
                          className= {classes.listItem} 
                        ><Grid container>
                          <Grid container justifyContent="flex-start">
                            {item.name}
                          </Grid>
                          <Grid container justifyContent="flex-end">
                          <Tooltip title="Notes for this task"><Button onClick={async()=>{
                            setnotes(item)
                            handleClickOpendialognotes()
                          }} style={{fontSize:"20px",color:fontcol,
                          minHeight:"0",minWidth:"0",padding:"0",margin:"0 10px 0 0"}}><EventNoteOutlinedIcon/></Button></Tooltip>
                          <Tooltip title="Delete Task"><Button onClick={async()=>{
                            removeactive(item,token)
                          }} style={{fontSize:"20px",color:fontcol,
                          minHeight:"0",minWidth:"0",padding:"0",margin:"0 10px 0 0"}}><DeleteIcon/></Button></Tooltip>
                          <Tooltip title="Mark as Completed"><Button onClick={async()=>{
                            item.pomodoro_done=item.total_pomodoro
                            removeactive(item,token)
                          }} style={{fontSize:"20px",color:fontcol,
                          minHeight:"0",minWidth:"0",padding:"0",margin:"0 10px 0 0"}}><CheckOutlinedIcon/></Button></Tooltip>
                          {item.pomodoro_done}/{item.total_pomodoro}
                          </Grid>
                        </Grid>
                      </ListItem>
                  </div>
                  )) 
                }
              </List>
            </Grid>
            <Grid>
              <Pagination count={Math.ceil(tasks.length/3)} color="primary" variant="outlined" 
                onChange={(event, value) => {setPage(value)}} shape="rounded" page={page} style={{margin:"10px"}}/>
            </Grid>
        </Grid>) : (<div></div>)}
    </Grid>
  );
};

export default Timer;
