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

                  <Tooltip
                    title={
                      <React.Fragment>
                        <Typography color="inherit" variant="subtitle1">
                          Description
                        </Typography>
                        <div className={classes.paragraph}>
                          {ride.description}
                        </div>
                        <Typography color="inherit" variant="subtitle1">
                          Location
                        </Typography>
                        <div className={classes.paragraph}>{ride.location}</div>
                        <Typography color="inherit" variant="subtitle1">
                          Age Restriciton
                        </Typography>
                        <div className={classes.paragraph}>
                          {ride.age_restriction ? ride.age_restriction : "None"}
                        </div>
                        <Typography color="inherit" variant="subtitle1">
                          Height Resctriction
                        </Typography>
                        <div className={classes.paragraph}>
                          {ride.height_restriction
                            ? ride.height_restriction
                            : "None"}
                        </div>
                      </React.Fragment>
                    }
                  >
                    <Button variant="contained">Info</Button>
                  </Tooltip>
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
      </Grid>
    </Container>
  );
}
