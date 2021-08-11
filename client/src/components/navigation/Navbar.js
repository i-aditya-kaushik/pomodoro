import React, { useState, useContext } from "react";
import ReactDOM from "react-dom";
import { makeStyles,withStyles } from '@material-ui/core/styles';
import { Link as RouterLink } from 'react-router-dom';
import { GlobalState } from "../../GlobalState";
import axios from "axios";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import ListItemText from '@material-ui/core/ListItemText';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListOutlinedIcon from '@material-ui/icons/ListOutlined';

import { Grid, Button, AppBar, Toolbar, Typography, Avatar, Box} from "@material-ui/core"
import Logo from '../../static/images/Logo.png'
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import Paper from '@material-ui/core/Paper';

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const useStyles = makeStyles((theme) => ({
    grow:{
      flexGrow:1
    },
    buttonFontSize:{
      fontSize:"15px",
      color:"black",
    },
    buttonPc: {
      fontSize:"18px",
      margin: theme.spacing(1),
    },
    AppBar:{
      backgroundColor:"#fff",
      backgroundSize:"cover"
    },
    mainLogo:{
      color: "#a1a1a1",
      justifyContent: "center",
      '&:hover':{
        background:"transparent"
      },
      margin:"auto"
    },
  
    avatar:{
      height:"100%",
      borderRadius:0,
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
    menubutton:{
      background:"black",
      color: "white",
      '&:hover':{
        background: "black",
        boxShadow: "0px 2px 10px #888888"
      }
    },
    harryfont:{
        fontFamily: 'Harry P',
      },
    right:{
        margin: "right",
    },
}));
  
export default function Navbar(){
    const state = useContext(GlobalState);
    const [isLogged] = state.userAPI.isLogged;
    const [isAdmin] = state.userAPI.isAdmin;
    const [open, setOpen] = React.useState(false);
    const [error, seterror] = React.useState("Some Kind of error occured!");
    const matches = useMediaQuery('(max-width:768px)');
    const [anchorEl, setAnchorEl] = useState(null);
    const [house,setHouse] = state.userAPI.house;
    var col="white";
    var fontcol="black";
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const erroroccur = (err) => {
      setOpen(true);
      seterror(err);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
    const logoutUser = async () => {
      await axios.get("/user/logout");

      localStorage.clear();
      window.location.href = "/";

      window.location.href = "/";
    };
    var altcol = "white"
    if(house=="Gryffindor"){
      col = "#d3a625"
      fontcol="#ae0001"
      altcol = "#eeba30"
    }
    if(house=="Slytherin"){
      col = "#aaaaaa"
      fontcol="#2a623d"
      altcol = "#5d5d5d"
    }
    if(house=="Ravenclaw"){
      col="#946b2d"
      fontcol="#222f5b"
      altcol = "#5d5d5d"
    }
    if(house=="Hufflepuff"){
      col="#ffdb00"
      fontcol="#000000"
      altcol = "#726255"
    }
    const classes = useStyles();
    const handleClose1 = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      setOpen(false);
    };
        return(
          <div className={classes.root} style={{border: "10px"}}>
            <AppBar component={Paper} elevation={6} square position="static" color="default" className={classes.AppBar}>
            <Snackbar open={open} autoHideDuration={4000} onClose={handleClose1} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
              <Alert variant="filled" onClose={handleClose1} severity="info">
                {error}
              </Alert>
            </Snackbar>
                <Toolbar style= {{backgroundColor:col	}}>
                  <Grid className={classes.grow}>
                    <Button component={RouterLink} to="/" className={classes.mainLogo}>
                      <Avatar src={Logo} className={classes.avatar} />
                    </Button>
                  </Grid>
                  <Box component={Grid} display={matches ? "none" : "block"} className={classes.right}>
                    {isLogged ? (
                      <div>
                      <Button component={RouterLink} to="/changehouse" color="inherit" className={[classes.buttonPc,classes.buttonFontSize,classes.harryfont]} style={{color: fontcol}}>Change House</Button>
                      <Button component={RouterLink} to="/profile" color="inherit" className={[classes.buttonPc,classes.buttonFontSize,classes.harryfont]} style={{color: fontcol}}>Profile</Button>
                      <Button component={RouterLink} to="/" onClick={logoutUser} className={[classes.buttonPc,classes.buttonFontSize,classes.loginButton,classes.harryfont]} style={{color:col,backgroundColor:fontcol}}>Logout</Button>
                      </div>
                      ) : (
                        <div>
                      <Button onClick={() => erroroccur("Login to make a profile and get sorted.")} color="inherit" className={[classes.buttonPc,classes.buttonFontSize,classes.harryfont]} style={{color: fontcol}}>Change House</Button>
                      <Button onClick={() => erroroccur("Login to view your Profile")} color="inherit" className={[classes.buttonPc,classes.buttonFontSize,classes.harryfont]} style={{color: fontcol}}>Profile</Button>
                      <Button component={RouterLink} to="/login" className={[classes.buttonPc,classes.buttonFontSize,classes.loginButton,classes.harryfont]} style={{color:col,backgroundColor:fontcol}}>Login</Button>
                      <Button component={RouterLink} to="/register" className={[classes.buttonPc,classes.buttonFontSize,classes.loginButton,classes.harryfont]} style={{color:col,backgroundColor:fontcol}}>Register</Button>
                        </div>
                    )}
                  </Box>
                  <Box component={Grid} display={matches ? "block" : "none"} className={classes.right}>
                  <Button aria-controls="customized-menu" aria-haspopup="true" variant="contained" color="primary" className={[classes.buttonFontSize,classes.menubutton,classes.harryfont]} 
                  onClick={handleClick}><ListOutlinedIcon/></Button>
                    <StyledMenu id="customized-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}  >
                      
                      {isLogged ? (
                        <div>
                          <MenuItem component={RouterLink} to="/changehouse">
                            <Button  color="inherit" className={[classes.buttonFontSize,classes.harryfont]} style={{color: fontcol}}>Change House</Button>
                          </MenuItem>
                          <MenuItem component={RouterLink} to="/profile">
                            <Button  color="inherit" className={[classes.buttonFontSize,classes.harryfont]} style={{color: fontcol}}>Profile</Button>
                          </MenuItem>
                          <MenuItem>
                            <Button component={RouterLink} to="/" onClick={logoutUser} className={[classes.buttonFontSize,classes.loginButton,classes.harryfont]} style={{color:col,backgroundColor:fontcol}}>Logout</Button>
                          </MenuItem>
                        </div>
                      ) : (
                        <div>
                          <MenuItem onClick={() => erroroccur("Login to make a profile and get sorted.")}>
                            <Button  color="inherit" className={[classes.buttonFontSize,classes.harryfont]} style={{color: fontcol}}>Change House</Button>
                          </MenuItem>
                          <MenuItem onClick={() => erroroccur("Login to view your Profile")}>
                            <Button  color="inherit" className={[classes.buttonFontSize,classes.harryfont]} style={{color: fontcol}}>Profile</Button>
                          </MenuItem>
                          <MenuItem>
                            <Button component={RouterLink} to="/login" className={[classes.buttonFontSize,classes.loginButton,classes.harryfont]} style={{color:col,backgroundColor:fontcol}}>Login</Button>
                          </MenuItem>
                          <MenuItem>
                            <Button component={RouterLink} to="/register" className={[classes.buttonFontSize,classes.loginButton,classes.harryfont]} style={{color:col,backgroundColor:fontcol}}>Register</Button>
                          </MenuItem>
                        </div>
                      )}
                      
                    </StyledMenu>
                  </Box>
                </Toolbar>
            </AppBar>
          </div>
        );
}