import React, { useState, useContext } from "react";
import Navbar from "../navigation/Navbar";
import { Grid } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import { GlobalState } from "../../GlobalState";

const useStyles = makeStyles((theme) => ({
  logo: {
      backgroundImage: `url(https://res.cloudinary.com/adityakaushik/image/upload/v1628144994/Hp/sorting_hat_twrqbs.png)`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight:254,
      minWidth: 290
    }
}));
  

function Sortinghat() {
  const classes = useStyles();
  const state = useContext(GlobalState);
  const [sortingdone] = state.userAPI.sortingdone;
  console.log(sortingdone)
  return <div>
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justify="center"
      style={{ minHeight: '100vh' }}
    >
      <Grid item xs={3} variant="outline" className={classes.logo}></Grid>  

    </Grid> 
    </div>;
}

export default Sortinghat;
