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
  
    AppBar:{
      backgroundColor:"#fff",
      backgroundSize:"cover"
    },
    mainLogo:{
      color: "#a1a1a1",
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
      borderRadius:"25px",
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
    const [cart] = state.userAPI.cart;
    const matches = useMediaQuery('(max-width:768px)');
    const [anchorEl, setAnchorEl] = useState(null);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
    const logoutUser = async () => {
      await axios.get("/user/logout");

      localStorage.removeItem("firstLogin");
      window.location.href = "/";

      window.location.href = "/";
    };
    const classes = useStyles();
    
        return(
          <div className={classes.root}>
            <AppBar position="static" color="default" className={[classes.AppBar,classes.grow]}>
                <Toolbar>
                  <Grid className={classes.grow}>
                    <Button className={[classes.mainLogo]}>
                      <Avatar src={Logo} className={classes.avatar} />
                    </Button>
                  </Grid>
                  <Box component={Grid} display={matches ? "none" : "block"} className={classes.right}>
                    <Button color="inherit" className={[classes.buttonFontSize,classes.harryfont]}>Discover</Button>
                    <Button color="inherit" className={[classes.buttonFontSize,classes.harryfont]}>Profile</Button>
                    {isLogged ? (
                      <Button component={RouterLink} to="/" onClick={logoutUser} color="inherit" className={[classes.buttonFontSize,classes.loginButton,classes.harryfont]}>Logout</Button>
                    ) : (
                      <Button component={RouterLink} to="/login" color="inherit" className={[classes.buttonFontSize,classes.loginButton,classes.harryfont]}>Login/Register</Button>
                    )}
                  </Box>
                  <Box component={Grid} display={matches ? "block" : "none"} className={classes.right}>
                  <Button aria-controls="customized-menu" aria-haspopup="true" variant="contained" color="primary" className={[classes.buttonFontSize,classes.menubutton,classes.harryfont]} 
                  onClick={handleClick}><ListOutlinedIcon/></Button>
                    <StyledMenu id="customized-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}  >
                      <MenuItem>
                        <Button color="inherit" className={[classes.buttonFontSize,classes.harryfont]}>Discover</Button>
                      </MenuItem>
                      <MenuItem>
                        <Button color="inherit" className={[classes.buttonFontSize,classes.harryfont]}>Profile</Button>
                      </MenuItem>
                      <MenuItem>
                      {isLogged ? (
                        <Button component={RouterLink} to="/" onClick={logoutUser} color="inherit" className={[classes.buttonFontSize,classes.loginButton,classes.harryfont]}>Logout</Button>
                      ) : (
                        <Button component={RouterLink} to="/login" color="inherit" className={[classes.buttonFontSize,classes.loginButton,classes.harryfont]}>Login/Register</Button>
                      )}
                      </MenuItem>
                    </StyledMenu>
                    {/* <Button color="inherit" className={[classes.buttonFontSize,classes.harryfont]}>Discover</Button>
                    <Button color="inherit" className={[classes.buttonFontSize,classes.harryfont]}>Profile</Button>
                    {isLogged ? (
                      <Button component={RouterLink} to="/" onClick={logoutUser} color="inherit" className={[classes.buttonFontSize,classes.loginButton,classes.harryfont]}>Logout</Button>
                    ) : (
                      <Button component={RouterLink} to="/login" color="inherit" className={[classes.buttonFontSize,classes.loginButton,classes.harryfont]}>Login/Register</Button>
                    )} */}
                  </Box>
                </Toolbar>
            </AppBar>
          </div>
        );
}