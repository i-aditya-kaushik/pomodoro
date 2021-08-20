import Navbar from "../navigation/Navbar";
import { makeStyles, Paper, useMediaQuery} from "@material-ui/core";
import React, { useState, useContext,useEffect } from "react";
import { GlobalState } from "../../GlobalState";
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import { Grid, Button, AppBar, Toolbar, Typography, Avatar, Box} from "@material-ui/core"
import Loading from '../utilities/Loading'
import Timer from './Timer'
import NotFound from "../utilities/NotFound";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import axios from "axios";
import ArrowForwardIosOutlinedIcon from '@material-ui/icons/ArrowForwardIosOutlined';
import ArrowBackIosOutlinedIcon from '@material-ui/icons/ArrowBackIosOutlined';
const useStyles = makeStyles((theme) => ({
    root:{
        height: '91vh',
    },
    cardroot: {
        minHeight:'32vh',
        maxHeight:'32vh',
    },
    bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
    },
    harryfont:{
        fontFamily: 'Harry P',
        color: 'black'
    },
    paddingt:{
        padding:"16px"
    },
    pos: {
    marginBottom: 12,
    },
    image:{
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        resizeMode: 'contain', 
        minHeight: '91vh'
    },
    '@global': {
        '*::-webkit-scrollbar': {
          width: '0.4em',
          borderRadius:"10px"
        },
        '*::-webkit-scrollbar-track': {
          '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)'
        },
        '*::-webkit-scrollbar-thumb': {
          backgroundColor: 'rgba(0,0,0,.1)',
          outline: '1px solid slategrey'
        }
      }
}));

export default function Tasks(){
    const classes = useStyles();
    const state = useContext(GlobalState);
    const [isloading,setisloading] = state.userAPI.isloading
    const [isLogged] = state.userAPI.isLogged;
    const [house,setHouse] = state.userAPI.house;
    const [similartasks,setsimilartasks] = state.userAPI.similartasks
    const [usertag,setusertag] = state.userAPI.usertag
    const [token] = state.token
    const [tasks,settasks] = state.userAPI.tasks;
    const [showwhat,setshowwhat] = useState(false)
    const [prev,setprev] = state.userAPI.prev
    useEffect(async ()=>{
        const response3 = await axios.get("/user/gettasks", {
            headers: { "Authorization": token },
          })
        setsimilartasks(response3.data.Tasks)
    },[usertag])
    useEffect(async ()=>{
        const response4 = await axios.get("/user/getprevtasks", {
            headers: { "Authorization": token },
          })
        setprev(response4.data.final_ret)
    },[tasks])

    const matches = useMediaQuery('(max-width:768px)');
    var col = "#9c9264"
    var fontcol = "black"
    var altcol = "white"
    var img = "https://res.cloudinary.com/adityakaushik/image/upload/v1628269706/Hp/hog_banner_inmxc4.png"

    if(house=="Gryffindor"){
        col = "#7f0909"
        fontcol="#ffc500"
        altcol = "#ae0001"
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
                {isLogged ? (
                    <div>
                    <Navbar/>
                        {matches ? (
                            <div>
                                <Grid container component="main">
                                    {!showwhat ? (
                                        <Grid container>
                                        <Grid style={{maxHeight:"20vh"}}>
                                            <Typography component="h1" variant="h4" className={[classes.harryfont,classes.paddingt]} style={{color: altcol,margin:"20px"}}>
                                                TASKS BASED ON YOUR INTERESTS:
                                            </Typography>
                                        </Grid>
                                        <Grid container component={Paper} style={{backgroundColor: "#f9f7f5"}}>
                                            <Grid style={{maxHeight: '55vh',minHeight:"55vh", width:"100%" , overflow: 'auto'}}>
                                                {similartasks.map(item =>{
                                                    return <Grid item xs={12} style={{margin:"20px"}}> 
                                                    <Card style={{ borderColor:col}} className={classes.cardroot} variant="outlined">
                                                    <CardContent>
                                                        <Typography component="h1" variant="h5" style={{color:fontcol}}>
                                                            {item.name}
                                                        </Typography>
                                                        <Typography variant="h5" component="h2">
                                                        </Typography>
                                                        <Typography className={classes.pos} color="textSecondary">
                                                         Tag: {item.tagname} <br/>
                                                         Total Pomodoros: {item.total_pomodoro}<br/>
                                                         Popularity: {item.popularity}
                                                        </Typography>
                                                    </CardContent>
                                                    <CardActions>
                                                        <Button className={classes.loginButton,classes.harryfont} style={{color:fontcol,backgroundColor:col}} onClick={async ()=>{
                                                            try {
                                                                await axios.post("/user/addtask", { ...item},
                                                                {
                                                                    headers: { 'Authorization': token }
                                                                });
                                                                const response2 = await axios.get(
                                                                    "/user/gettasksuser", {
                                                                    headers: { "Authorization": token },
                                                                    }
                                                                );
                                                                settasks(response2.data.final_ret)
                                                                } catch (err) {
                                                                console.log(err.response)
                                                            }
                                                        }}>Add this task</Button>
                                                    </CardActions><br/>
                                                    </Card>
                                                    </Grid>
                                                })}
                                            </Grid>
                                        </Grid>
                                        </Grid>
                                    ) : (
                                        <Grid container>
                                    <Grid style={{maxHeight:"20vh"}}>
                                        <Typography component="h1" variant="h4" className={[classes.harryfont,classes.paddingt]} style={{color: altcol,margin:"20px"}}>
                                            YOUR COMPLETED TASKS:
                                        </Typography>
                                    </Grid>
                                    <Grid container component={Paper} style={{backgroundColor: "#f9f7f5"}}>
                                        <Grid style={{maxHeight: '55vh',minHeight:"55vh", width:"100%" , overflow: 'auto'}}>
                                            {prev.map(item =>{
                                                return <Grid item xs={12} style={{margin:"20px"}}> 
                                                <Card style={{ borderColor:col}} className={classes.cardroot} variant="outlined">
                                                <CardContent>
                                                    <Typography component="h1" variant="h5" style={{color:fontcol}}>
                                                        {item.name}
                                                    </Typography>
                                                    <Typography variant="h5" component="h2">
                                                    </Typography>
                                                    <Typography className={classes.pos} color="textSecondary">
                                                     Total Pomodoros: {item.total_pomodoro}<br/>
                                                     Popularity: {item.popularity}
                                                    </Typography>
                                                </CardContent>
                                                <CardActions>
                                                    <Button className={classes.loginButton,classes.harryfont} style={{color:fontcol,backgroundColor:col}} onClick={async ()=>{
                                                        try {
                                                            await axios.post("/user/addtask", { ...item},
                                                            {
                                                                headers: { 'Authorization': token }
                                                            });
                                                            const response2 = await axios.get(
                                                                "/user/gettasksuser", {
                                                                headers: { "Authorization": token },
                                                                }
                                                            );
                                                            settasks(response2.data.final_ret)
                                                            } catch (err) {
                                                            console.log(err.response)
                                                        }
                                                    }}>Add this task</Button>
                                                </CardActions><br/>
                                                </Card>
                                                </Grid>
                                            })}
                                        </Grid>
                                    </Grid>
                                    </Grid>
                                    )}
                                    <Grid style={{padding:"10px"}}>
                                    <Button className={classes.loginButton,classes.harryfont} style={{color:fontcol,backgroundColor:col}} onClick={async ()=>{
                                        setshowwhat(!showwhat)
                                    }}>{showwhat ? <ArrowBackIosOutlinedIcon/> : <ArrowForwardIosOutlinedIcon/>}</Button>
                                    </Grid>
                                </Grid>
                            </div>
                        ) : (
                            <div>
                                <Grid container component="main">
                                    <Grid container component={Paper} xs={2} sm={2} md={1} lg={1} xl={1} className={classes.image} style={{backgroundImage:'url('+ img +')', backgroundColor:col}}></Grid>
                                    <Grid item className={classes.root} component={Paper} xs={8} sm={8} md={10} lg={10} xl={10} style={{backgroundColor: "#f9f7f5"}}>
                                        {!showwhat ? (
                                            <div>
                                                <Grid style={{maxHeight:"10vh"}}>
                                                    <Typography component="h1" variant="h4" className={[classes.harryfont,classes.paddingt]} style={{color: altcol}}>
                                                        TASKS BASED ON YOUR INTERESTS:
                                                    </Typography>
                                                </Grid>
                                                <Grid container style={{maxHeight: '60vh',minHeight:"60vh", width:"100%" , overflow: 'auto'}}>
                                                    {similartasks.map(item =>{
                                                        return  <Grid item xs={2} style={{margin:"10px"}}> 
                                                        <Card style={{ borderColor:col}} className={classes.cardroot} variant="outlined">
                                                        <CardContent>
                                                            <Typography component="h1" variant="h5" style={{color:fontcol}}>
                                                            {item.name}
                                                            </Typography>
                                                            <Typography variant="h5" component="h2">
                                                            </Typography>
                                                            <Typography className={classes.pos} color="textSecondary">
                                                            Tag: {item.tagname} <br/>
                                                            Total Pomodoros: {item.total_pomodoro}<br/>
                                                            Popularity: {item.popularity}
                                                            </Typography>
                                                        </CardContent>
                                                        <CardActions>
                                                            <Button className={classes.loginButton,classes.buttonPc,classes.harryfont} style={{color:fontcol,backgroundColor:col}} onClick={async ()=>{
                                                                try {
                                                                    await axios.post("/user/addtask", { ...item},
                                                                    {
                                                                        headers: { 'Authorization': token }
                                                                    });
                                                                    const response2 = await axios.get(
                                                                        "/user/gettasksuser", {
                                                                        headers: { "Authorization": token },
                                                                        }
                                                                    );
                                                                    settasks(response2.data.final_ret)
                                                                    } catch (err) {
                                                                    console.log(err.response)
                                                                }
                                                            }}>Add this task</Button>
                                                        </CardActions>
                                                        </Card>
                                                        </Grid>
                                                    })}
                                                </Grid>
                                            </div>
                                        ) : (
                                            <div>
                                                <Grid style={{maxHeight:"10vh"}}>
                                            <Typography component="h1" variant="h4" className={[classes.harryfont,classes.paddingt]} style={{color: altcol}}>
                                                YOUR COMPLETED TASKS:
                                            </Typography>
                                        </Grid>
                                        <Grid container style={{maxHeight: '60vh',minHeight:"60vh", width:"100%" , overflow: 'auto'}}>
                                            {prev.map(item =>{
                                                return  <Grid item xs={2} style={{margin:"10px"}}> 
                                                <Card style={{ borderColor:col}} className={classes.cardroot} variant="outlined">
                                                <CardContent>
                                                    <Typography component="h1" variant="h5" style={{color:fontcol}}>
                                                    {item.name}
                                                    </Typography>
                                                    <Typography variant="h5" component="h2">
                                                    </Typography>
                                                    <Typography className={classes.pos} color="textSecondary">
                                                    Total Pomodoros: {item.total_pomodoro}<br/>
                                                    Popularity: {item.popularity}
                                                    </Typography>
                                                </CardContent>
                                                <CardActions>
                                                    <Button className={classes.loginButton,classes.buttonPc,classes.harryfont} style={{color:fontcol,backgroundColor:col}} onClick={async ()=>{
                                                        try {
                                                            await axios.post("/user/addtask", { ...item},
                                                            {
                                                                headers: { 'Authorization': token }
                                                            });
                                                            const response2 = await axios.get(
                                                                "/user/gettasksuser", {
                                                                headers: { "Authorization": token },
                                                                }
                                                            );
                                                            settasks(response2.data.final_ret)
                                                            } catch (err) {
                                                            console.log(err.response)
                                                        }
                                                    }}>Add this task</Button>
                                                </CardActions>
                                                </Card>
                                                </Grid>
                                            })}
                                        </Grid>
                                            </div>
                                        )}
                                        <Grid style={{padding:"10px"}}>
                                        <Button className={classes.loginButton,classes.harryfont} style={{color:fontcol,backgroundColor:col}} onClick={async ()=>{
                                            setshowwhat(!showwhat)
                                        }}>{showwhat ? <ArrowBackIosOutlinedIcon/> : <ArrowForwardIosOutlinedIcon/>}</Button>
                                        </Grid>
                                    </Grid>
                                    <Grid container component={Paper} xs={2} sm={2} md={1} lg={1} xl={1} className={classes.image} style={{backgroundImage:'url('+ img +')', backgroundColor:col}}></Grid>
                                </Grid>
                            </div>
                        )}
                </div>
                ) : (
                    <NotFound/>
                )}
                </div>
            ) : (
                <Loading/>
            )}    
            
        </div>
    );
}