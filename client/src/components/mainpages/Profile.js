import Navbar from "../navigation/Navbar";
import { Divider, makeStyles, Paper, TextField, useMediaQuery} from "@material-ui/core";
import React, { useState, useContext,useEffect } from "react";
import { GlobalState } from "../../GlobalState";
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import { Grid, Button, AppBar, Toolbar, Typography, Avatar, Box} from "@material-ui/core"
import Loading from '../utilities/Loading'
import Autocomplete from "@material-ui/lab/Autocomplete";
import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
    root:{
        height: '91vh',
    },
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
        margin: theme.spacing(0,0,3,2),
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

export default function Profile(){
    const classes = useStyles();
    function sleep(delay = 0) {
        return new Promise(resolve => {
          setTimeout(resolve, delay);
        });
      }
    const state = useContext(GlobalState);
    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = React.useState([]);
    const loading = open && options.length === 0;
    const [isloading,setisloading] = state.userAPI.isloading
    const [isLogged] = state.userAPI.isLogged;
    const [house] = state.userAPI.house;

    const onChangeHandle = async (value) => {
        // use the changed value to make request and then use the result. Which
        console.log(value);
        const response = await fetch(
          "/user/gettags"
        )
          .then((response) => response.json())
          .then((data) => setOptions(data.tags));
      };
    
      React.useEffect(() => {
        if (!open) {
          setOptions([]);
        }
      }, [open]);
    const matches = useMediaQuery('(max-width:768px)');
    var col = "#9c9264"
    var fontcol = "black"
    var altcol = "white"
    var img = "https://res.cloudinary.com/adityakaushik/image/upload/v1628269706/Hp/hog_banner_inmxc4.png"
    if(house=="Gryffindor"){
        col = "#7f0909"
        fontcol="#ffc500"
        altcol = "#eeba30"
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
                    <Navbar/>
                        {matches ? (
                            <div>
                                <Grid container component="main" className={classes.root}>
                                    <Grid container component={Paper} style={{backgroundColor: "#f9f7f5",padding:"20px"}}>
                                        <Box mt={1}>
                                            <Typography component="h1" variant="h3" className={classes.harryfont} style={{color: altcol}}>
                                                What are your hobbies/profession in the muggle world?
                                            </Typography>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </div>
                        ) : (
                            <div>
                                <Grid container component="main" className={classes.root}>
                                    <Grid container component={Paper} xs={2} sm={2} md={1} lg={1} xl={1} className={classes.image} style={{backgroundImage:'url('+ img +')', backgroundColor:col}}></Grid>
                                    <Grid container component={Paper} xs={8} sm={8} md={10} lg={10} xl={10} style={{backgroundColor: "#f9f7f5",padding:"20px"}}>
                                        <Grid container style={{backgroundColor: "#f9f7f5",maxHeight:"200px"}}>
                                                <Typography component="h1" variant="h3" className={[classes.harryfont,classes.paddingt]} style={{color: altcol}}>
                                                    How would you describe yourself in the muggle world?
                                                </Typography>
                                                <Autocomplete
                                                    style={{minWidth:"500px"}}
                                                    multiple
                                                    freeSolo={true}
                                                    open={open}
                                                    onOpen={() => {
                                                        setOpen(true);
                                                    }}
                                                    onClose={() => {
                                                        setOpen(false);
                                                    }}
                                                    getOptionSelected={(option, value) => option.name === value.name}
                                                    getOptionLabel={(option) => option.name}
                                                    options={options}
                                                    loading={loading}
                                                    onChange={(event, newValue) => {
                                                        console.log(newValue);
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
                                                <Button className={[classes.buttonPc,classes.buttonFontSize,classes.loginButton,classes.harryfont]} style={{color:col,backgroundColor:fontcol,maxHeight: '50px',maxWidth:"70px"}}>Add</Button>
                                        </Grid>
                                        <Grid style={{backgroundColor: "#f9f7f5"}}>
                                            
                                        </Grid>
                                    </Grid>
                                    <Grid container component={Paper} xs={2} sm={2} md={1} lg={1} xl={1} className={classes.image} style={{backgroundImage:'url('+ img +')', backgroundColor:col}}></Grid>
                                </Grid>
                            </div>
                        )}
                </div>
            ) : (
                <Loading/>
            )}    
        </div>
    );
}