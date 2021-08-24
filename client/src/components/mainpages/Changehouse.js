import Navbar from "../navigation/Navbar";
import { CardActionArea, CardContent, CardMedia, makeStyles, Paper, useMediaQuery, CardActions, Dialog } from "@material-ui/core";
import React, { useState, useContext,useEffect } from "react";
import { GlobalState } from "../../GlobalState";
import { Grid, Button, Card, Toolbar, Typography, Avatar, Box} from "@material-ui/core"
import axios from "axios";
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Loading from "../utilities/Loading";
const useStyles = makeStyles((theme) => ({
    root:{
        height: '91vh',
    },
    image:{
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        resizeMode: 'contain', 
        minHeight: '90vh'
    },
    shat: {
        backgroundImage: 'url(https://res.cloudinary.com/adityakaushik/image/upload/v1628144994/Hp/sorting_hat_twrqbs.png)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      },
      media: {
        height: 140,
      },
      harryfont:{
        fontFamily: 'Harry P',
      },
}));

export default function ChangeHouse(){
    const classes = useStyles();
    const state = useContext(GlobalState);
    const [isLogged] = state.userAPI.isLogged;
    const [isloading,setisloading] = state.userAPI.isloading
    const [house,setHouse] = state.userAPI.house;
    const [token] = state.token;
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const matches = useMediaQuery('(max-width:768px)');
    const gotosortinghat = () => {
        window.location.href = "/sortinghat";
    }
    const changehouseto = async house => {
        setHouse(house)
        await axios.patch(
          "/user/house",
          { house },
          {
            headers: { Authorization: token },
          }
        );
        handleClickOpen()
      };
    var col = "#9c9264"
    var fontcol = "black"
    var altcol = "white"
    var img = "https://res.cloudinary.com/adityakaushik/image/upload/v1628269706/Hp/hog_banner_inmxc4.png"
    if(house=="Gryffindor"){
        col = "#7f0909"
        fontcol="#ffc500"
        altcol = "#eeba30"
        img = "https://res.cloudinary.com/adityakaushik/image/upload/v1628269706/Hp/gry_banner_grwluz.png"
    }
    if(house=="Slytherin"){
        col = "#2a623d"
        fontcol="#aaaaaa"
        altcol = "#5d5d5d"
        img = "https://res.cloudinary.com/adityakaushik/image/upload/v1628269706/Hp/sly_banner_yvl105.png"
    }
    if(house=="Ravenclaw"){
        col="#222f5b"
        fontcol="#946b2d"
        altcol = "#5d5d5d"
        img = "https://res.cloudinary.com/adityakaushik/image/upload/v1628269706/Hp/rav_banner_oba4vi.png"
    }
    if(house=="Hufflepuff"){
        col="#fff4b1"
        fontcol="#000000"
        altcol = "#726255"
        img = "https://res.cloudinary.com/adityakaushik/image/upload/v1628269706/Hp/huf_banner_j4rbs1.png"
    }
    return(
        <div>
            {!isloading ? (
                <div>
                <Navbar/>
                
                    {matches ? (
                        <div>
                            <Grid container component="main" className={classes.root}>
                                <Grid container component={Paper} style={{backgroundColor: "#f9f7f5"}}>
                                    <Grid container xs={6} sm={4} md={4} style={{backgroundColor: "#f9f7f5"}}>
                                        <Grid container style={{justifyContent:"center"}}>
                                        <Card style={{padding:"12px",margin: "12px",backgroundColor:"#7f0909",color: "#ffc500"}}>
                                            <CardActionArea>
                                                <CardMedia
                                                    className={classes.media}
                                                    image="https://res.cloudinary.com/adityakaushik/image/upload/v1627663840/Hp/gryffindor3_zedlqb.jpg"
                                                    title="Gryffindor"
                                                    style={{borderColor:"#ffc500",border:"10"}}
                                                />
                                                <CardContent>
                                                <Typography gutterBottom variant="h6" component="h4" className={classes.harryfont}>
                                                    GRYFFINDOR
                                                </Typography>
                                                    <Button
                                                        onClick={()=>{changehouseto("Gryffindor");}}
                                                        fullWidth
                                                        variant="contained"
                                                        style={{backgroundColor:"#ffc500", color:"#7f0909"}}
                                                        >
                                                        Choose
                                                    </Button>
                                                </CardContent>
                                            </CardActionArea>
                                            </Card>
                                        </Grid>
                                        <Grid container style={{justifyContent:"center"}}>
                                        <Card style={{padding:"12px",margin: "12px",backgroundColor:"#2a623d",color: "#aaaaaa"}}>
                                            <CardActionArea>
                                                <CardMedia
                                                className={classes.media}
                                                image="https://res.cloudinary.com/adityakaushik/image/upload/v1627661406/Hp/slytherin_vb1xzz.jpg"
                                                title="Slytherin"
                                                />
                                                <CardContent>
                                                <Typography gutterBottom variant="h6" component="h4" className={classes.harryfont}>
                                                    SLYTHERIN
                                                </Typography>
                                                <Button
                                                    onClick={()=>{changehouseto("Slytherin");}}
                                                    fullWidth
                                                    variant="contained"
                                                    color="primary"
                                                    style={{backgroundColor:"#aaaaaa", color:"#2a623d"}}
                                                    >
                                                    Choose
                                                </Button>
                                                </CardContent>
                                            </CardActionArea>
                                            </Card>
                                        </Grid>
                                    </Grid>
                                    <Grid container xs={6} sm={4} md={4} style={{backgroundColor: "#f9f7f5"}}>
                                        <Grid container style={{justifyContent:"center"}}>
                                        <Card style={{padding:"12px",margin: "12px",backgroundColor:"#222f5b",color: "#946b2d"}}>
                                            <CardActionArea>
                                                <CardMedia
                                                    className={classes.media}
                                                    image="https://res.cloudinary.com/adityakaushik/image/upload/v1627661406/Hp/ravenclaw3_pmr0wh.jpg"
                                                    title="Ravenclaw"
                                                    style={{borderColor:"#ffc500",border:"10"}}
                                                />
                                                <CardContent>
                                                <Typography gutterBottom variant="h6" component="h4" className={classes.harryfont}>
                                                    RAVENCLAW
                                                </Typography>
                                                    <Button
                                                        onClick={()=>{changehouseto("Ravenclaw");}}
                                                        fullWidth
                                                        variant="contained"
                                                        style={{backgroundColor:"#946b2d", color:"#222f5b"}}
                                                        >
                                                        Choose
                                                    </Button>
                                                </CardContent>
                                            </CardActionArea>
                                            </Card>
                                        </Grid>
                                        <Grid container style={{justifyContent:"center"}}>
                                        <Card style={{padding:"12px",margin: "12px",backgroundColor:"#ffdb00",color: "#000000"}}>
                                            <CardActionArea>
                                                <CardMedia
                                                className={classes.media}
                                                image="https://res.cloudinary.com/adityakaushik/image/upload/v1627663805/Hp/hufflepuff2_g1ldfl.jpg"
                                                title="Hufflepuff"
                                                />
                                                <CardContent>
                                                <Typography gutterBottom variant="h6" component="h4" className={classes.harryfont}>
                                                    HUFFLEPUFF
                                                </Typography>
                                                <Button
                                                    onClick={()=>{changehouseto("Hufflepuff");}}
                                                    fullWidth
                                                    variant="contained"
                                                    color="primary"
                                                    style={{backgroundColor:"#000000", color:"#ffdb00"}}
                                                    >
                                                    Choose
                                                </Button>
                                                </CardContent>
                                            </CardActionArea>
                                            </Card>
                                        </Grid>
                                    </Grid>
                                    <Grid container xs={false} sm={4} md={4} style={{backgroundColor: "#9c9264"}} className= {classes.shat}></Grid>
                                </Grid>
                            </Grid>
                        </div>
                    ) : (
                        <div>
                            <Grid container component="main" className={classes.root}>
                                <Grid container component={Paper} xs={2} sm={2} md={1} lg={1} xl={1} className={classes.image} style={{backgroundImage:'url('+ img +')', backgroundColor:col}}></Grid>
                                    <Grid container component={Paper} xs={8} sm={10} md={11} lg={11} xl={11} style={{backgroundColor: "#f9f7f5"}}>
                                    <Grid container xs={6} sm={4} md={4} style={{backgroundColor: "#f9f7f5"}}>
                                        <Grid container style={{justifyContent:"center"}}>
                                        <Card style={{padding:"12px",margin: "12px",backgroundColor:"#7f0909",color: "#ffc500",minWidth:"250px"}}>
                                            <CardActionArea>
                                                <CardMedia
                                                    className={classes.media}
                                                    image="https://res.cloudinary.com/adityakaushik/image/upload/v1627663840/Hp/gryffindor3_zedlqb.jpg"
                                                    title="Gryffindor"
                                                    style={{borderColor:"#ffc500",border:"10"}}
                                                />
                                                <CardContent>
                                                <Typography gutterBottom variant="h6" component="h4" className={classes.harryfont}>
                                                    GRYFFINDOR
                                                </Typography>
                                                    <Button
                                                        onClick={()=>{changehouseto("Gryffindor");}}
                                                        fullWidth
                                                        variant="contained"
                                                        style={{backgroundColor:"#ffc500", color:"#7f0909"}}
                                                        >
                                                        Choose
                                                    </Button>
                                                </CardContent>
                                            </CardActionArea>
                                            </Card>
                                        </Grid>
                                        <Grid container style={{justifyContent:"center"}}>
                                        <Card style={{padding:"12px",margin: "12px",backgroundColor:"#2a623d",color: "#aaaaaa",minWidth:"250px"}}>
                                            <CardActionArea>
                                                <CardMedia
                                                className={classes.media}
                                                image="https://res.cloudinary.com/adityakaushik/image/upload/v1627661406/Hp/slytherin_vb1xzz.jpg"
                                                title="Slytherin"
                                                />
                                                <CardContent>
                                                <Typography gutterBottom variant="h6" component="h4" className={classes.harryfont}>
                                                    SLYTHERIN
                                                </Typography>
                                                <Button
                                                    onClick={()=>{changehouseto("Slytherin");}}
                                                    fullWidth
                                                    variant="contained"
                                                    color="primary"
                                                    style={{backgroundColor:"#aaaaaa", color:"#2a623d"}}
                                                    >
                                                    Choose
                                                </Button>
                                                </CardContent>
                                            </CardActionArea>
                                            </Card>
                                        </Grid>
                                    </Grid>
                                    <Grid container xs={6} sm={4} md={4} style={{backgroundColor: "#f9f7f5"}}>
                                        <Grid container style={{justifyContent:"center"}}>
                                        <Card style={{padding:"12px",margin: "12px",backgroundColor:"#222f5b",color: "#946b2d",minWidth:"250px"}}>
                                            <CardActionArea>
                                                <CardMedia
                                                    className={classes.media}
                                                    image="https://res.cloudinary.com/adityakaushik/image/upload/v1627661406/Hp/ravenclaw3_pmr0wh.jpg"
                                                    title="Ravenclaw"
                                                    style={{borderColor:"#ffc500",border:"10"}}
                                                />
                                                <CardContent>
                                                <Typography gutterBottom variant="h6" component="h4" className={classes.harryfont}>
                                                    RAVENCLAW
                                                </Typography>
                                                    <Button
                                                        onClick={()=>{changehouseto("Ravenclaw");}}
                                                        fullWidth
                                                        variant="contained"
                                                        style={{backgroundColor:"#946b2d", color:"#222f5b"}}
                                                        >
                                                        Choose
                                                    </Button>
                                                </CardContent>
                                            </CardActionArea>
                                            </Card>
                                        </Grid>
                                        <Grid container style={{justifyContent:"center"}}>
                                        <Card style={{padding:"12px",margin: "12px",backgroundColor:"#ffdb00",color: "#000000",minWidth:"250px"}}>
                                            <CardActionArea>
                                                <CardMedia
                                                className={classes.media}
                                                image="https://res.cloudinary.com/adityakaushik/image/upload/v1627663805/Hp/hufflepuff2_g1ldfl.jpg"
                                                title="Hufflepuff"
                                                />
                                                <CardContent>
                                                <Typography gutterBottom variant="h6" component="h4" className={classes.harryfont}>
                                                    HUFFLEPUFF
                                                </Typography>
                                                <Button
                                                    onClick={()=>{changehouseto("Hufflepuff");}}
                                                    fullWidth
                                                    variant="contained"
                                                    color="primary"
                                                    style={{backgroundColor:"#000000", color:"#ffdb00"}}
                                                    >
                                                    Choose
                                                </Button>
                                                </CardContent>
                                            </CardActionArea>
                                            </Card>
                                        </Grid>
                                    </Grid>
                                    <Grid container xs={false} sm={4} md={4} style={{backgroundColor: "#9c9264"}} className= {classes.shat}></Grid>
    
                                    </Grid>
                            </Grid>
                        </div>
                    )}
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Your house has been changed, do you want to revisit the sorting hat?"}</DialogTitle>
                    <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Even though this practice is frowned upon, you decided to go against the will of the sorting hat. However, we are sure that you had the characteristics of a true {house}. Do you want to visit the sorting hat?
                    </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        No
                    </Button>
                    <Button onClick={gotosortinghat} color="primary" autoFocus>
                        Yes
                    </Button>
                    </DialogActions>
                </Dialog>
            </div>
                ) : (
                <Loading/>
            )}
        </div>
        
    );
}

