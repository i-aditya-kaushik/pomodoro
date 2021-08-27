import React, { useContext, useEffect } from "react";
import Navbar from "../navigation/Navbar";
import { Grid, Snackbar } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import Logo from '../../static/images/Logo.png'
import { CircularProgress } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import { GlobalState } from "../../GlobalState";

const useStyles = makeStyles((theme) => ({
  logo: {
      backgroundImage: `url(${Logo})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight:300,
      minWidth: 321
    }
}));
  

function Loading() {
  const classes = useStyles();
  const state = useContext(GlobalState);
  const [open, setOpen] = React.useState(false);
  const [error, seterror] = React.useState("Some Kind of error occured!");
  const [isloading,setisloading] = state.userAPI.isloading
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
  useEffect(()=>{
    setTimeout( function() { if(isloading){
        erroroccur("Loading your configurations. Please Wait!")
      } }, 2000);
  },[])
  return <div>
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justify="center"
      style={{ minHeight: '80vh' }}
    >
      <Snackbar open={open} autoHideDuration={4000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
          <Alert onClose={handleClose} severity="info">
            {error}
          </Alert>
        </Snackbar>
      <Grid item xs={3} variant="outline" className={classes.logo}></Grid>  

    </Grid> 
    <Grid item align="center"><CircularProgress/></Grid>
    </div>;
}

export default Loading;
