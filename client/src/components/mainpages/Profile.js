import Navbar from "../navigation/Navbar";
import { Divider, makeStyles, Paper, Slider, TextField, useMediaQuery} from "@material-ui/core";
import React, { useState, useContext,useEffect } from "react";
import { GlobalState } from "../../GlobalState";
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import { Grid, Button, AppBar, Toolbar, Typography, Avatar, Box} from "@material-ui/core"
import Loading from '../utilities/Loading'
import Autocomplete from "@material-ui/lab/Autocomplete";
import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";
import { withStyles } from "@material-ui/styles";
import zIndex from "@material-ui/core/styles/zIndex";
import Switch from '@material-ui/core/Switch';
import NotFound from "../utilities/NotFound";

const useStyles = makeStyles((theme) => ({
    image:{
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        resizeMode: 'contain', 
        minHeight: '91vh'
    },
    harryfont:{
        fontFamily: 'Harry P',
        color: 'black'
    },
    paddingt:{
        padding:theme.spacing(1, 'auto')
    },
    buttonFontSize:{
        fontSize:"15px",
        color:"black",
    },
    buttonPc: {
        fontSize:"18px",
    },
    loginButton:{
        background:"black",
        color:'white',
        borderRadius:"10px",
        padding:"0px 10px",
    
        '&:hover':{
          background: "black",
          boxShadow: "0px 2px 10px #888888"
        }
    },
    harryfont:{
          fontFamily: 'Harry P',
    },
}));


const PrettoSlider =  withStyles({
    root: {
      color: '#000',
      height: 8,
    },
    thumb: {
      height: 24,
      width: 24,
      backgroundColor: '#fff',
      border: '2px solid currentColor',
      marginTop: -8,
      marginLeft: -12,
      '&:focus, &:hover, &$active': {
        boxShadow: 'inherit',
      },
    },
    active: {},
    valueLabel: {
      left: 'calc(-50% + 4px)',
    },
    track: {
      height: 8,
      borderRadius: 4,
    },
    rail: {
      height: 8,
      borderRadius: 4,
    },
  })(Slider);


const TimerComp = props =>{
    const {title , col, altcol, fontcol , def ,token,matches} = props;
    const classes = useStyles();
    const state = useContext(GlobalState);
    const [worktime, setworktime] = state.userAPI.worktime 
    const [shortbreak, setshortbreak] = state.userAPI.shortbreak
    const [longbreak, setlongbreak] = state.userAPI.longbreak
    var minwi = "500px"
    if(matches) minwi = "250px"
    var vari = "h6"
    if(matches) vari = "body1"
    return(
    <div><Typography component="h1" variant={vari} className={[classes.paddingt]} style={{color: fontcol, paddingTop:"2vh"}}>
        {title.toUpperCase()}
    </Typography>
    <PrettoSlider
        style={{minWidth:minwi}}
        step={5}
        key={`slider-${def}`}
        min = {5}
        max = {55}
        onChange = {async (event,value)=> {
            if(title=="Work Duration:"){
                setworktime(value)
            }
            if(title=="Short Break Duration:"){
                setshortbreak(value)
            }
            if(title=="Long Break Duration:"){
                setlongbreak(value)
            }
        }}
        defaultValue = {def}
        valueLabelDisplay="auto"
        marks={[
            {
                value: 5,
                label: '5',
            },
            {
                value: 10,
                label: '10',
            },
            {
                value: 25,
                label: '25',
            },
            {
                value: 40,
                label: '40',
            },
            {
                value: 55,
                label: '55',
            },
        ]}
    />
    </div>)
}

const TimerPassComp = props =>{
    const {title , col, altcol, fontcol , def ,matches} = props;
    const classes = useStyles();
    const state = useContext(GlobalState);
    var minwi = "500px"
    if(matches) minwi = "250px"
    var vari = "h6"
    if(matches) vari = "body1"
    return(
    <div>
        <Typography component="h1" variant={vari} className={[classes.paddingt]} style={{color: fontcol, paddingTop:"2vh"}}>
            {title.toUpperCase()}
        </Typography>
    </div>
    )
}

export default function Profile(){
    const classes = useStyles();
    const state = useContext(GlobalState);
    const [open1, setopen1] = React.useState(false);
    const [options, setOptions] = React.useState([]);
    const [usertag,setusertag] = state.userAPI.usertag
    const [worktime, setworktime] = state.userAPI.worktime 
    const [changepass, setchangepass] = useState({
        password: "",
        newpassword: "",
        newpassword2: ""
      });
    const onChangeInput = e => {
        const { name, value } = e.target;
        setchangepass({ ...changepass, [name]: value });
    };
    const [shortbreak, setshortbreak] = state.userAPI.shortbreak
    const [longbreak, setlongbreak] = state.userAPI.longbreak
    const loading = open1 && options.length === 0;
    const [isloading,setisloading] = state.userAPI.isloading
    const [tags,settags] = state.userAPI.tags
    const [isLogged] = state.userAPI.isLogged;
    const [newval,setnewval] = useState(null)
    const [house] = state.userAPI.house;
    const [token] = state.token;
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
    useEffect(async () => {
        try{
            await axios.put("/user/userupdate", {work_duration: worktime,
                short_break_duration: shortbreak,
                long_break_duration: longbreak,
            },{
                headers: { 'Authorization': token }
            })
            erroroccur("Configurations updated successfully!")
        } catch (err) {
            
        }
    }, [shortbreak,longbreak,worktime])

    useEffect(()=>{
        setTimeout( function() { if(isloading){
            setisloading(false)
        } }, 7000);
    },[])

    const onChangeHandle = async (value) => {
        const response = await fetch(
          "/user/gettags"
        )
          .then((response) => response.json())
          .then((data) => setOptions(data.tags));
      };
    
      React.useEffect(async () => {
        if (!open1) {
          setOptions([]);
        }
      }, [open1,tags]);
    const matches = useMediaQuery('(max-width:768px)');
    var minwi = "600px"
    if(matches) minwi = "250px"
    var vari = "h6"
    if(matches) vari = "body1"
    var col = "#9c9264"
    var fontcol = "black"
    var altcol = "white"
    var img = "https://res.cloudinary.com/adityakaushik/image/upload/v1628269706/Hp/hog_banner_inmxc4.png"
    if(house=="Gryffindor"){
        col = "#7f0909"
        fontcol="#eeba30"
        altcol = "#ae0001"
        img = "https://res.cloudinary.com/adityakaushik/image/upload/v1628269706/Hp/gry_banner_grwluz.png"
    }
    if(house=="Slytherin"){
        col = "#0b4d00"
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
        col="#ffdb00"
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
                                <Grid container component="main" className={classes.root} style={{backgroundColor: "#f9f7f5"}}>
                                    <Snackbar open={open} autoHideDuration={4000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                                        <Alert onClose={handleClose} severity="info">
                                            {error}
                                        </Alert>
                                    </Snackbar>
                                    <Grid container style={{backgroundColor: "#f9f7f5",maxHeight:"50vh",padding: "20px",zIndex: 5}}>
                                                <Typography component="h1" variant="h4" className={[classes.harryfont,classes.paddingt]} style={{color: altcol}}>
                                                    What are the hobbies/interests that define you in the muggle world?
                                                </Typography>
                                                <Autocomplete
                                                    fullWidth
                                                    style={{paddingTop:"20px"}}
                                                    multiple
                                                    limitTags={4}
                                                    freeSolo={true}
                                                    open={open1}
                                                    onOpen={() => {
                                                        setopen1(true);
                                                    }}
                                                    onClose={() => {
                                                        setopen1(false);
                                                    }}
                                                    getOptionSelected={(option, value) => {try{option === value.name}catch (err) {option.name ===value.name}}}
                                                    getOptionLabel={(option) => option.name || option}
                                                    options={options}
                                                    loading={loading}
                                                    defaultValue = {usertag}
                                                    onChange={async (event, newValue) => {
                                                        setnewval(newValue)
                                                    }}
                                                    id="tags-outlined"
                                                    renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                        variant="outlined"
                                                        onChange={ev => {
                                                            if (ev.target.value !== "" || ev.target.value !== null) {
                                                              onChangeHandle(ev.target.value);
                                                            }
                                                          }}
                                                        label="Set Your Tags"
                                                        placeholder= "Press Enter to add a new tag or select from the options"
                                                        InputProps={{
                                                            ...params.InputProps,
                                                            maxLength: 20,
                                                            endAdornment: (
                                                              <React.Fragment>
                                                                {loading ? (
                                                                  <CircularProgress color="inherit" size={20} />
                                                                ) : null}
                                                                {params.InputProps.endAdornment}
                                                              </React.Fragment>
                                                            )
                                                          }}
                                                    />
                                                    )}
                                                />
                                        </Grid>
                                        <Grid item xs = {8} style={{backgroundColor: "#f9f7f5",minHeight:"50vh",padding: "20px"}}>
                                            <Button className={classes.loginButton,classes.harryfont} style={{color:fontcol,backgroundColor:col}} onClick={async ()=>{
                                                if(newval){
                                                    try{
                                                        setisloading(true)
                                                        setusertag(newval)
                                                        await axios.delete("/user/deletetags", {
                                                            headers: { 'Authorization': token },
                                                        }).then(async ()=>{
                                                            try{
                                                                await axios.post("/user/addmultipletags",
                                                                {newValue: newval},
                                                                {headers: { 'Authorization': token }})
                                                                } catch(err){
                                                                    console.log(err.response)
                                                                }
                                                        })
                                                        setisloading(false)
                                                    } catch(err){
                                                        console.log(err.response)
                                                    }
                                                }
                                            }}>Update Tags</Button>
                                            <Typography component="h1" variant="h4" className={[classes.harryfont,classes.paddingt]} style={{color: altcol,marginTop:"20px"}}>
                                                Your Settings
                                            </Typography>
                                            <TimerComp title = {"Work Duration:"} col = {col} fontcol = {fontcol} altcol = {altcol} def={worktime} token={token}  matches={matches}/>
                                            <TimerComp title = {"Short Break Duration:"} col = {col} fontcol = {fontcol} altcol = {altcol} def={shortbreak} token={token} matches={matches}/>
                                            <TimerComp title = {"Long Break Duration:"} col = {col} fontcol = {fontcol} altcol = {altcol} def={longbreak} token={token} matches={matches}/>
                                        </Grid>
                                        <Grid container style={{backgroundColor: "#f9f7f5",minHeight:"50vh",padding: "20px"}}>
                                            <Grid container>
                                                <Typography component="h4" variant="h4" className={[classes.harryfont]} style={{color: altcol,paddingTop:"9vh"}}>
                                                    Change Your Password
                                                </Typography>
                                            </Grid>
                                            <Grid container>
                                                <Box flexGrow={1}>
                                                    <form noValidate>
                                                        <TimerPassComp title = {"Current Password:"} col = {col} fontcol = {fontcol} altcol = {altcol} matches={matches}/>
                                                        <TextField fullWidth onChange={onChangeInput} autoComplete='off' required id="password" name="password" type="password" label="Your Current Password" variant="outlined"/>
                                                        <TimerPassComp title = {"New Password:"} col = {col} fontcol = {fontcol} altcol = {altcol} matches={matches}/>
                                                        <TextField fullWidth onChange={onChangeInput} autoComplete='off' required id="newpassword" name="newpassword" type="password" label="New Password" variant="outlined"/>
                                                        <TimerPassComp title = {"Re-enter new Password:"} col = {col} fontcol = {fontcol} altcol = {altcol} matches={matches}/>
                                                        <TextField fullWidth onChange={onChangeInput} autoComplete='off' required id="newpassword2" name="newpassword2" type="password" label="Re-Enter New Password" variant="outlined"/>
                                                    </form>
                                                </Box>
                                            </Grid>
                                            <Grid container style={{paddingTop:"1vh"}}>
                                                <Button onClick={async() => {
                                                    if(changepass.newpassword!=changepass.newpassword2){
                                                        erroroccur("New Passwords do not match.")
                                                    }
                                                    else if(changepass.newpassword.length<8){
                                                        erroroccur("Passwords have to be atleast 8 characters long.")
                                                    }
                                                    else{
                                                        try{
                                                            console.log(changepass)
                                                            await axios.post("/user/changepass",
                                                            {...changepass},
                                                            {headers: { 'Authorization': token }})
                                                            erroroccur("Password Changed Successfully")
                                                        } catch(err){
                                                            erroroccur("Your current password is not correct")
                                                        }
                                                    }
                                                }} className={classes.loginButton,classes.harryfont} style={{color:fontcol,backgroundColor:col}}>Change Password</Button>
                                            </Grid>
                                        </Grid>
                                </Grid>
                            </div>
                        ) : (
                            <div>
                                <Grid container component="main" className={classes.root}>
                                    <Snackbar open={open} autoHideDuration={4000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                                        <Alert onClose={handleClose} severity="info">
                                            {error}
                                        </Alert>
                                    </Snackbar>
                                    <Grid item component={Paper} xs={2} sm={2} md={1} lg={1} xl={1} className={classes.image} style={{backgroundImage:'url('+ img +')', backgroundColor:col}}></Grid>
                                    <Grid item component={Paper} xs={8} sm={8} md={10} lg={10} xl={10} style={{backgroundColor: "#f9f7f5",padding:"20px",zIndex: 5}}>
                                        <Grid container style={{backgroundColor: "#f9f7f5",minHeight:"20vh"}}>
                                                <Typography component="h1" variant="h3" className={[classes.harryfont,classes.paddingt]} style={{color: altcol}}>
                                                    What are the hobbies/interests that define you in the muggle world?
                                                </Typography>
                                                <Autocomplete
                                                    fullWidth
                                                    multiple
                                                    freeSolo={true}
                                                    open={open1}
                                                    limitTags={4}
                                                    onOpen={() => {
                                                        setopen1(true);
                                                    }}
                                                    onClose={() => {
                                                        setopen1(false);
                                                    }}
                                                    getOptionSelected={(option, value) => {try{option === value.name}catch (err) {option.name ===value.name}}}
                                                    getOptionLabel={(option) => option.name || option}
                                                    options={options}
                                                    loading={loading}
                                                    defaultValue = {usertag}
                                                    onChange={async (event, newValue) => {
                                                        setnewval(newValue)
                                                    }}
                                                    id="tags-outlined"
                                                    renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                        variant="outlined"
                                                        onChange={ev => {
                                                            if (ev.target.value !== "" || ev.target.value !== null) {
                                                              onChangeHandle(ev.target.value);
                                                            }
                                                          }}
                                                        label="Set Your Tags"
                                                        placeholder= "Press Enter to add a new tag or select from the options"
                                                        InputProps={{
                                                            ...params.InputProps,
                                                            endAdornment: (
                                                              <React.Fragment>
                                                                {loading ? (
                                                                  <CircularProgress color="inherit" size={20} />
                                                                ) : null}
                                                                {params.InputProps.endAdornment}
                                                              </React.Fragment>
                                                            )
                                                          }}
                                                    />
                                                    )}
                                                />
                                            <Grid container>
                                                <Box flexGrow={1}>
                                                <Grid item style={{backgroundColor: "#f9f7f5",minHeight:"65vh",paddingTop:"1vh",marginRight:"10vh"}}>
                                                    <Button className={classes.loginButton,classes.buttonPc,classes.harryfont} style={{color:fontcol,backgroundColor:col}} onClick={async ()=>{
                                                    if(newval){
                                                        try{
                                                            setisloading(true)
                                                            setusertag(newval)
                                                            await axios.delete("/user/deletetags", {
                                                                headers: { 'Authorization': token },
                                                            }).then(async ()=>{
                                                                try{
                                                                    await axios.post("/user/addmultipletags",
                                                                    {newValue: newval},
                                                                    {headers: { 'Authorization': token }})
                                                                    
                                                                    } catch(err){
                                                                        console.log(err.response)
                                                                    }
                                                            })
                                                            setisloading(false)
                                                        } catch(err){
                                                            console.log(err.response)
                                                        }
                                                    }
                                                }}>Update Tags</Button>
                                                    <Typography component="h1" variant="h3" className={[classes.harryfont]} style={{color: altcol,paddingTop:"4vh"}}>
                                                        Your Settings
                                                    </Typography>
                                                    <TimerComp title = {"Work Duration:"} col = {col} fontcol = {fontcol} altcol = {altcol} def={worktime} token={token}/>
                                                    <TimerComp title = {"Short Break Duration:"} col = {col} fontcol = {fontcol} altcol = {altcol} def={shortbreak} token={token}/>
                                                    <TimerComp title = {"Long Break Duration:"} col = {col} fontcol = {fontcol} altcol = {altcol} def={longbreak} token={token}/>
                                                </Grid>
                                                </Box>
                                                <Box flexGrow={1}>
                                                    <Grid item style={{backgroundColor: "#f9f7f5",minHeight:"65vh"}}>
                                                        <Typography component="h1" variant="h3" className={[classes.harryfont]} style={{color: altcol,paddingTop:"9vh"}}>
                                                            Change Your Password
                                                        </Typography>
                                                        <form noValidate>
                                                            <TimerPassComp title = {"Current Password:"} col = {col} fontcol = {fontcol} altcol = {altcol}/>
                                                            <TextField fullWidth onChange={onChangeInput} autoComplete='off' required id="password" name="password" type="password" label="Your Current Password" variant="outlined"/>
                                                            <TimerPassComp title = {"New Password:"} col = {col} fontcol = {fontcol} altcol = {altcol}/>
                                                            <TextField fullWidth onChange={onChangeInput} autoComplete='off' required id="newpassword" name="newpassword" type="password" label="New Password" variant="outlined"/>
                                                            <TimerPassComp title = {"Re-enter new Password:"} col = {col} fontcol = {fontcol} altcol = {altcol}/>
                                                            <TextField fullWidth onChange={onChangeInput} autoComplete='off' required id="newpassword2" name="newpassword2" type="password" label="Re-Enter New Password" variant="outlined"/>
                                                        </form>
                                                        <Grid style={{paddingTop:"1vh"}}>
                                                        <Button onClick={async() => {
                                                            if(changepass.newpassword!=changepass.newpassword2){
                                                                erroroccur("New Passwords do not match.")
                                                            }
                                                            else if(changepass.newpassword.length<8){
                                                                erroroccur("Passwords have to be atleast 8 characters long.")
                                                            }
                                                            else{
                                                                try{
                                                                    console.log(changepass)
                                                                    await axios.post("/user/changepass",
                                                                    {...changepass},
                                                                    {headers: { 'Authorization': token }})
                                                                    erroroccur("Password Changed Successfully")
                                                                } catch(err){
                                                                    erroroccur("Your current password is not correct")
                                                                }
                                                            }
                                                        }} className={classes.loginButton,classes.harryfont} style={{color:fontcol,backgroundColor:col}}>Change Password</Button>
                                                        </Grid>
                                                    </Grid>
                                                </Box>
                                            </Grid>
                                            
                                        </Grid>
                                    </Grid>
                                    <Grid item component={Paper} xs={2} sm={2} md={1} lg={1} xl={1} className={classes.image} style={{backgroundImage:'url('+ img +')', backgroundColor:col}}></Grid>
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