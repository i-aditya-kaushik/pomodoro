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
import emailjs from 'emailjs-com'

import Logo from '../../static/images/Logo.png'
import CardMedia from '@material-ui/core/CardMedia';
import Navbar from '../navigation/Navbar'


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

export default function ForgotPassword() {
  const classes = useStyles();
  const [user, setUser] = useState({
    email: "",
  });
  var col = "black"
  var fontcol = "#aaa"
  var altcol = "white"
  const [open, setOpen] = React.useState(false);
  const [error, seterror] = React.useState("Some Kind of error occured!");
  const [variant,setvariant] = useState("error")

  const onChangeInput = e => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  const erroroccur = (err,variant) => {
    setOpen(true);
    setvariant(variant)
    seterror(err);
  };

  function makepassword(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@!#$%^&*()';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * 
        charactersLength));
        }
    return result;
    }


  const forgotpasswordform = async (e) => {
    e.preventDefault();
    try {
        const res = await axios.post("/user/forgotpass", { ...user});
        var password = makepassword(10)
        var temp_details = {name:res.data.name,email: res.data.email, password: password};
        const res2 = await axios.post("/user/updatepass", { ...temp_details });
        emailjs.send('service_ms4ka67', 'template_i6i6d5f', temp_details, 'user_LX0XWLa3jevsQyqQZq2Ba')
        erroroccur("Your Password Reset Details have been sent to your mail","info")
    } catch (err) {
        erroroccur(err.response.data.msg, "error")
    }
  }
  
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
          <Alert onClose={handleClose} severity={variant}>
            {error}
          </Alert>
        </Snackbar>
          <Link component={RouterLink} variant="body1" to='/'>
            <Grid variant="outline" className={classes.logo}></Grid>
          </Link>
          <Box mt={1}>
            <Typography component="h1" variant="h5" className={classes.harryfont}>
              FORGOT PASSWORD?
            </Typography>
            </Box>
          <form className={classes.form} onSubmit={forgotpasswordform}>
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
            
            <Button
              type="submit"
              fullWidth
              style={{color:altcol, backgroundColor:col}}
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Verify this email
            </Button>
            <Grid container>
              <Box flexGrow={1}>
              
              <Link component={RouterLink} variant="body1" to='/login'
                    className={classes.harryfont} style={{fontSize: "18px"}}>
                    {" SIGNIN TO MY ACCOUNT"}
                  </Link>
              
              </Box>
              <Box>
                  <Link component={RouterLink} variant="body1" to='/register'
                    className={classes.harryfont} style={{fontSize: "18px"}}>
                    {" DON'T HAVE AN ACCOUNT?! SIGNUP!"}
                  </Link>
              </Box>
            </Grid>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}