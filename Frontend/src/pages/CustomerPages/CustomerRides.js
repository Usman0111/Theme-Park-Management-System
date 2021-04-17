import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import axios from "axios";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import PassNeeded from "./PassNeeded";
import BrokenImageIcon from "@material-ui/icons/BrokenImage";
import OpacityIcon from "@material-ui/icons/Opacity";

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardTitle: {
    padding: 0,
    margin: 0,
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
    padding: theme.spacing(1),
    justifyContent: "center",
  },
  buttons: {
    paddingTop: 0,
  },
  paragraph: {
    fontSize: 12,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function CustomerRides() {
  const classes = useStyles();
  const [rides, setRides] = useState([]);
  const [validpass, setValidpass] = useState(true);

  useEffect(() => {
    axios
      .post("ride/all-customer", {
        customer_id: localStorage.getItem("user_id"),
      })
      .then((res) => {
        if (res.data !== "You have an unexpired entry pass") {
          setRides(res.data.rides);
        } else {
          setValidpass(false);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const [info, setInfo] = React.useState({});

  const [openDialog, setOpenDialog] = React.useState(false);
  const dialogHandleClickOpen = () => {
    setOpenDialog(true);
  };
  const dialogHandleClose = () => {
    setOpenDialog(false);
  };

  const visit = (ride_id) => {
    const data = {
      ride_id,
      customer_id: Number(localStorage.getItem("user_id")),
    };

    axios
      .post("ride/ride", data)
      .then((res) => {
        handleClick();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  console.log(rides);

  return (
    <Container className={classes.cardGrid}>
      <CssBaseline />
      <Grid container spacing={4}>
        {!validpass ? (
          <PassNeeded type={"rides"} />
        ) : (
          rides.map((ride) => (
            <Grid item key={ride.ride_id} md={3}>
              <Card className={classes.card}>
                <CardMedia
                  className={classes.cardMedia}
                  image={ride.picture}
                  title="Image title"
                />
                <CardContent className={classes.cardContent}>
                  <Typography variant="h5">
                    {ride.name}
                    {ride.broken ? (
                      <Tooltip title="broken">
                        <BrokenImageIcon color="disabled" />
                      </Tooltip>
                    ) : null}
                    {ride.rainedout ? (
                      <Tooltip title="rained out">
                        <OpacityIcon color="disabled" />
                      </Tooltip>
                    ) : null}
                  </Typography>
                </CardContent>
                <CardActions className={classes.buttons}>
                  {ride.rainedout || ride.broken ? (
                    <Button color="primary" variant="contained" disabled>
                      Ride!
                    </Button>
                  ) : (
                    <Button
                      color="primary"
                      variant="contained"
                      onClick={() => visit(ride.ride_id)}
                    >
                      Ride!
                    </Button>
                  )}
                  <Button variant="contained" onClick={dialogHandleClickOpen}>Info</Button>
                </CardActions>
                
              </Card>
            </Grid>
          ))
        )}
        <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success">
            Wheee! enjoying the fun ride
          </Alert>
        </Snackbar>
        <Dialog
                    open={openDialog}
                    TransitionComponent={Transition}
                    onClose={dialogHandleClose}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                  >
                    <DialogTitle id="alert-dialog-slide-title">(ride.name)</DialogTitle>
                    <DialogContent>
                      <DialogContentText>(ride.description)</DialogContentText>
                      <DialogContentText>Location</DialogContentText>
                      <DialogContentText>(ride.location)</DialogContentText>
                      <DialogContentText>Age Restriction</DialogContentText>
                      <DialogContentText>(ride.age_restriction)</DialogContentText>
                      <DialogContentText>Height Restriction</DialogContentText>
                      <DialogContentText>ride.height_restriction</DialogContentText>
                      <DialogContentText></DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={dialogHandleClose} color="primary">
                        Close
                      </Button>
                    </DialogActions>
                  </Dialog>
      </Grid>
      
    </Container>
  );
}
