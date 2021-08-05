import React from "react";
import Navbar from "../navigation/Navbar";
import { Grid } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  logo: {
      backgroundImage: `url(https://res.cloudinary.com/adityakaushik/image/upload/v1628163837/Hp/404_qwaray.png)`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight:254,
      minWidth: 240
    }
}));
  

function NotFound() {
  const classes = useStyles();
  return <div>
    <Navbar/>
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

export default NotFound;
