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
      margin: theme.spacing(1),
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
    const [open, setOpen] = React.useState(false);
    const [error, seterror] = React.useState("Some Kind of error occured!");
    const matches = useMediaQuery('(max-width:768px)');
    const [anchorEl, setAnchorEl] = useState(null);
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
    const classes = useStyles();
    const handleClose1 = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      setOpen(false);
    };
        return(
          <div className={classes.root}>
            <AppBar position="static" color="default" className={classes.AppBar}>
            <Snackbar open={open} autoHideDuration={4000} onClose={handleClose1} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
              <Alert variant="filled" onClose={handleClose1} severity="info">
                {error}
              </Alert>
            </Snackbar>
                <Toolbar>
                  <Grid className={classes.grow}>
                    <Button component={RouterLink} to="/" className={classes.mainLogo}>
                      <Avatar src={Logo} className={classes.avatar} />
                    </Button>
                  </Grid>
                  <Box component={Grid} display={matches ? "none" : "block"} className={classes.right}>
                    {isLogged ? (
                      <div>
                      <Button component={RouterLink} to="/changehouse" color="inherit" className={[classes.buttonPc,classes.buttonFontSize,classes.harryfont]}>Change House</Button>
                      <Button component={RouterLink} to="/profile" color="inherit" className={[classes.buttonPc,classes.buttonFontSize,classes.harryfont]}>Profile</Button>
                      <Button component={RouterLink} to="/" onClick={logoutUser} color="inherit" className={[classes.buttonPc,classes.buttonFontSize,classes.loginButton,classes.harryfont]}>Logout</Button>
                      </div>
                      ) : (
                        <div>
                      <Button onClick={() => erroroccur("Login to change your House")} color="inherit" className={[classes.buttonPc,classes.buttonFontSize,classes.harryfont]}>Change House</Button>
                      <Button onClick={() => erroroccur("Login to view your Profile")} color="inherit" className={[classes.buttonPc,classes.buttonFontSize,classes.harryfont]}>Profile</Button>
                      <Button component={RouterLink} to="/login" color="inherit" className={[classes.buttonPc,classes.buttonFontSize,classes.loginButton,classes.harryfont]}>Login/Register</Button>
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
                            <Button  color="inherit" className={[classes.buttonFontSize,classes.harryfont]}>Change House</Button>
                          </MenuItem>
                          <MenuItem component={RouterLink} to="/profile">
                            <Button  color="inherit" className={[classes.buttonFontSize,classes.harryfont]}>Profile</Button>
                          </MenuItem>
                          <MenuItem>
                            <Button component={RouterLink} to="/" onClick={logoutUser} color="inherit" className={[classes.buttonFontSize,classes.loginButton,classes.harryfont]}>Logout</Button>
                          </MenuItem>
                        </div>
                      ) : (
                        <div>
                          <MenuItem onClick={() => erroroccur("Login to change your House")}>
                            <Button  color="inherit" className={[classes.buttonFontSize,classes.harryfont]}>Change House</Button>
                          </MenuItem>
                          <MenuItem onClick={() => erroroccur("Login to view your Profile")}>
                            <Button  color="inherit" className={[classes.buttonFontSize,classes.harryfont]}>Profile</Button>
                          </MenuItem>
                          <MenuItem>
                            <Button component={RouterLink} to="/login" color="inherit" className={[classes.buttonFontSize,classes.loginButton,classes.harryfont]}>Login/Register</Button>
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