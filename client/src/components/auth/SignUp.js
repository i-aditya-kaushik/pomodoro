import React, {useEffect, useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import { Link as RouterLink} from "react-router-dom";
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import '../../static/fonts/HarryP.TTF'; 
import axios from "axios";
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

import Logo from '../../static/images/Logo.png'


function getRandomHouse(){
  var houses = Array('Gryffindor',
                    'Slytherin',
                    'Hufflepuff',
                    'Ravenclaw'
  )
    return houses[Math.floor(Math.random()*houses.length)];
}

export const useImage = (src) => {
  const [hasLoaded, setHasLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [hasStartedInitialFetch, setHasStartedInitialFetch] = useState(false);

  useEffect(() => {
      setHasStartedInitialFetch(true);
      setHasLoaded(false);
      setHasError(false);

      const image = new Image();
      image.src = src;

      const handleError = () => {
          setHasError(true);
      };

      const handleLoad = () => {
          setHasLoaded(true);
          setHasError(false);
      };

      image.onerror = handleError;
      image.onload = handleLoad;

      return () => {
          image.removeEventListener("error", handleError);
          image.removeEventListener("load", handleLoad);
      };
  }, [src]);

  return { hasLoaded, hasError, hasStartedInitialFetch };
};


const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', 
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  harryfont:{
    fontFamily: 'Harry P',
    color: 'black'
  },
  logo: {
    backgroundImage: `url(${Logo})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight:100,
    minWidth: 107
  },
  logocover: {
    backgroundImage: `url(${Logo})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  }
}));

export default function SignUp() {
  const classes = useStyles();
  const img = "https://res.cloudinary.com/adityakaushik/image/upload/v1627661406/Hp/slytherin_vb1xzz.jpg"
  const { hasLoaded, hasError } = useImage(img);
    if (hasError) {
        return null;
  }
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    password2:""
  });
  var col = "black"
  var fontcol = "#aaa"
  var altcol = "white"
  const [open, setOpen] = React.useState(false);
  const [error, seterror] = React.useState("Some Kind of error occured!");
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  const onChangeInput = e => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  const erroroccur = (err) => {
    setOpen(true);
    seterror(err);
  };
  const registerSubmit = async e => {
    e.preventDefault();
    try {
      if(password2.value!=password.value) {alert('Passwords do not match');return}
      const houseval = getRandomHouse()
      await axios.post("/user/register", { ...user , house: houseval});
      localStorage.setItem("firstLogin", true);
      window.location.href = "/sortinghat";
    } catch (err) {
      try{
        erroroccur(err.response.data.msg)}catch (err) {
        erroroccur("Some Kind of Error Occured. Try Again.")
    }}
  };

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={hasLoaded ? classes.image : classes.logocover} style={{backgroundImage: hasLoaded ? 'url('+ img +')': 'url('+ Logo +')'}} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Snackbar open={open} autoHideDuration={4000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
            <Alert onClose={handleClose} severity="error">
              {error}
            </Alert>
          </Snackbar>
          <Link component={RouterLink} variant="body1" to='/'>
            <Grid variant="outline" className={classes.logo}>
            </Grid>
          </Link>
          <Box mt={1}>
            <Typography component="h1" variant="h5" className={classes.harryfont}>
              WELCOME TO MAGICAL POMODORO
            </Typography>
            </Box>
          <form className={classes.form} onSubmit={registerSubmit}>
          <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="name"
              label="Enter Your Name"
              name="name"
              autoComplete="name"
              onChange={onChangeInput}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              onChange={onChangeInput}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={onChangeInput}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password2"
              label="Re-Enter Password"
              type="password"
              id="password2"
              autoComplete="current-password"
              onChange={onChangeInput}
            />
            <Button
              type="submit"
              fullWidth
              style={{color:altcol, backgroundColor:col}}
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign Up
            </Button>
            <Grid container>
              <Grid container justifyContent="flex-end">
                  <Link component= {RouterLink} variant="body1" to='/login'
                    className={classes.harryfont} style={{fontSize: "18px"}}>
                      {"ALREADY HAVE AN ACCOUNT? SIGNIN"}
                  </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}