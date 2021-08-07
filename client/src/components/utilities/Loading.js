import React from "react";
import Navbar from "../navigation/Navbar";
import { Grid } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import Logo from '../../static/images/Logo.png'


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
  return <div>
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justify="center"
      style={{ minHeight: '80vh' }}
    >
      <Grid item xs={3} variant="outline" className={classes.logo}></Grid>  

    </Grid> 
    </div>;
}

export default Loading;
