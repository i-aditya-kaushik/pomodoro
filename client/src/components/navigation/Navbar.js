import React, { useState, useContext } from "react";
import ReactDOM from "react-dom";
import { makeStyles } from '@material-ui/core/styles';
import { Link as RouterLink } from 'react-router-dom';
import { GlobalState } from "../../GlobalState";
import axios from "axios";

import { Grid, Button, AppBar, Toolbar, Typography, MenuItem, Menu, Avatar} from "@material-ui/core"
import Logo from '../../static/images/Logo.png'

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

    const logoutUser = async () => {
      await axios.get("/user/logout");

      localStorage.removeItem("firstLogin");
      window.location.href = "/";

      window.location.href = "/";
    };
    const classes = useStyles();
    // state={
    //     anchorEl:null
    //   };
    
    //   handleMenu = event => {
    //     this.setState({ anchorEl: event.currentTarget });
    //     console.log(event.currentTarget)
    //   };
    
    //   handleClose = () => {
    //     this.setState({ anchorEl: null });
    //   };
    
        return(
          <div className={classes.root}>
            <AppBar position="static" color="default" className={[classes.AppBar,classes.grow]}>
                <Toolbar>
                  <Grid className={classes.grow}>
                    <Button className={[classes.mainLogo]}>
                      <Avatar src={Logo} className={classes.avatar} />
                    </Button>
                  </Grid>
                  <Grid className={classes.right}>
                    <Button color="inherit" className={[classes.buttonFontSize,classes.harryfont]}>Discover</Button>
                    <Button color="inherit" className={[classes.buttonFontSize,classes.harryfont]}>Profile</Button>
                    {isLogged ? (
                      <Button component={RouterLink} to="/" onClick={logoutUser} color="inherit" className={[classes.buttonFontSize,classes.loginButton,classes.harryfont]}>Logout</Button>
                    ) : (
                      <Button component={RouterLink} to="/login" color="inherit" className={[classes.buttonFontSize,classes.loginButton,classes.harryfont]}>Login/Register</Button>
                    )}
                  </Grid>
                </Toolbar>
            </AppBar>
          </div>
        );
}