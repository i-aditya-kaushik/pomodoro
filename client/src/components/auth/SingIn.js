import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import axios from "axios";
import '../../static/fonts/HarryP.TTF'; 
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';

import Logo from '../../static/images/Logo.png'
import CardMedia from '@material-ui/core/CardMedia';
import Navbar from '../navigation/Navbar'

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link component={RouterLink} variant="body1" to='/'>
        {'A Magical Pomodoro'}
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

function getRandomPicture(){
  var links = Array('https://res.cloudinary.com/adityakaushik/image/upload/v1627663840/Hp/gryffindor3_zedlqb.jpg',
                    'https://res.cloudinary.com/adityakaushik/image/upload/v1627661406/Hp/slytherin_vb1xzz.jpg',
                    'https://res.cloudinary.com/adityakaushik/image/upload/v1627661406/Hp/slytherin2_s4aj1q.jpg',
                    'https://res.cloudinary.com/adityakaushik/image/upload/v1627661406/Hp/hufflepuff3_wz7asl.jpg',
                    'https://res.cloudinary.com/adityakaushik/image/upload/v1627661406/Hp/ravenclaw3_pmr0wh.jpg',
                    'https://res.cloudinary.com/adityakaushik/image/upload/v1627661406/Hp/ravenclaw_ew3xyy.jpg',
                    'https://res.cloudinary.com/adityakaushik/image/upload/v1627661405/Hp/gryffindor2_hsbvi0.jpg',
                    'https://res.cloudinary.com/adityakaushik/image/upload/v1627661406/Hp/ravenclaw2_uppkr7.jpg',
                    'https://res.cloudinary.com/adityakaushik/image/upload/v1627661405/Hp/slytherin3_ohlils.jpg',
                    'https://res.cloudinary.com/adityakaushik/image/upload/v1627661405/Hp/hufflepuff_idp0gj.jpg',
                    'https://res.cloudinary.com/adityakaushik/image/upload/v1627661405/Hp/gryffindor_xitgpf.jpg'
  )
  return links[Math.floor(Math.random()*links.length)];
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url('+ getRandomPicture() +')',
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
    width: '100%', // Fix IE 11 issue.
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
  }
}));

export default function SignIn() {
  const classes = useStyles();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [remem, setRemem] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [error, seterror] = React.useState("Some Kind of error occured!");
  const rememberme_change = (event) => {
    setRemem( event.target.checked );
  };
  const onChangeInput = e => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  const erroroccur = (err) => {
    setOpen(true);
    seterror(err);
  };
  const loginSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post("/user/login", { ...user , remem});
      localStorage.setItem("firstLogin", true);
      if(remem){
        localStorage.setItem("remember_me",true)
      }
      window.location.href = "/";
    } catch (err) {
      erroroccur(err.response.data.msg)
    }
  };
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
        <Snackbar open={open} autoHideDuration={4000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
          <Alert onClose={handleClose} severity="error">
            {error}
          </Alert>
        </Snackbar>
          <Link component={RouterLink} variant="body1" to='/'>
            <Grid variant="outline" className={classes.logo}></Grid>
          </Link>
          <Box mt={1}>
            <Typography component="h1" variant="h5" className={classes.harryfont}>
              SIGN IN TO MAGICAL POMODORO
            </Typography>
            </Box>
          <form className={classes.form} onSubmit={loginSubmit}>
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
            <FormControlLabel
              control={<Checkbox color="primary" checked={remem.value} onChange={rememberme_change} name="remem" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            <Grid container>
              <Box flexGrow={1}>
              
                <Typography variant="body1" className={classes.harryfont}>
                  {"FORGOT PASSWORD? UN-OBLIVIATE."}
                </Typography>
              
              </Box>
              <Box>
                  <Link component={RouterLink} variant="body1" to='/register'
                    className={classes.harryfont}>
                    {"DON'T HAVE AN ACCOUNT? SIGNUP"}
                  </Link>
              </Box>
            </Grid>
            <Box mt={3}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}