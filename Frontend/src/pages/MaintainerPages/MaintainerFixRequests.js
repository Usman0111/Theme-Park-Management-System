import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import axios from "axios";
import Snackbar from "@material-ui/core/Snackbar";
import Tooltip from "@material-ui/core/Tooltip";
import { Dialog } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";

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
    paddingTop: "56.25%",
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

const getInfo = (breakdown) => {
  const indexT = breakdown.breakdown_date.indexOf("T");
  const indexDot = breakdown.breakdown_date.indexOf(".");
  return {
    r_id: breakdown.ride_id,
    bd_id: breakdown.breakdown_id,
    date: breakdown.breakdown_date.slice(0, indexT),
    time: breakdown.breakdown_date.slice(indexT + 1, indexDot),
    attendant: breakdown.attendant_id,
    name: breakdown.name,
    descript: breakdown.breakdown_description,
    location: breakdown.location,
    status: breakdown.broken,
    picture: breakdown.picture,
  };
};

const MaintainerFixRequests = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const[openSnackbar, setOpenSnackBar] = React.useState(false);
  const [requests, setRequest] = useState([]);

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
    axios
      .get("maintainer/all-maintainence-requests")
      .then((res) => {
        console.log(res.data[2].ride_id);
        const req = res.data.map((breakdown) => getInfo(breakdown));
        setRequest(req);
      })
      .catch((err) => {
        console.log(err.res);
      });
  }, []);

  const fixRide = (ride_id) => {
    const data = {
      maintainer_id: Number(localStorage.getItem("user_id")),
      ride_id,
    };
    axios
      .put("maintainer/resolve-request", data)
      .then((res) => {
        handleClose();
        this.setRequest({
          status: "false",
        });
        console.log(res.data.broken);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <Container>
        <CssBaseline />
        <Grid container spacing={4}>
          {requests.map((request) => (
            <Grid item key={request.bd_id} md={3}>
              <Card className={classes.card}>
                <CardMedia
                  className={classes.cardMedia}
                  image={request.picture}
                  title="Image title"
                />
                <CardContent classsName={classes.cardContent}>
                  <Typography>Ride Name: {request.name}</Typography>
                  <Typography>Location: {request.location}</Typography>
                </CardContent>
                <CardActions className={classes.buttons}>
                <Button
                onClick={handleClickOpen}
                variant="outlined" 
                color="primary" >
                  Inspect Issue
                </Button>
                <Dialog
                  open={open}
                  keepMounted
                >
                  <DialogTitle>{"Breakdown Information"}</DialogTitle>
                    <DialogContent >
                      <DialogContentText >
                        Breakdown Description: {request.descript}
                      </DialogContentText>
                      <DialogContentText >
                        Reported by Attendant: {request.attendant}
                      </DialogContentText>
                      <DialogContentText >
                        Date of Breakdown: {request.date}
                      </DialogContentText>
                      <DialogContentText >
                        Time of Breakdown: {request.r_id}
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button
                        id = "fixed"
                        color="primary"
                        onClick={() => 
                          fixRide(request.r_id)
                        }>
                        Fix Ride
                      </Button>
                      <Button 
                        onClick={handleClose}
                        color="primary">
                        Cancel
                      </Button>
                    </DialogActions>
                </Dialog>
                </CardActions>
              </Card>
              
            </Grid>
            
          ))}
          <Snackbar open={openSnackbar} autoHideDuration={2000} onClick={handleCloseSnackbar}>
          <Alert onClick={handleCloseSnackbar} severity="success">
            test
          </Alert>
        </Snackbar>
          
        </Grid>
      </Container>
    </div>
  );
};

export default MaintainerFixRequests;

      /*<Button
                    color="primary"
                    variant="outlined"
                    onClick={() => fixRide(request.r_id)}
                  >
                    Fix Ride
                  </Button>
                  <Tooltip
                    title={
                      <React.Fragment>
                        <Typography color="inherit" variant="subtitle1">
                          Description:
                        </Typography>
                        <div className={classes.paragraph}>
                          {request.descript}
                        </div>
                        <Typography color="inherit" variant="subtitle1">
                          Repoted by Attendant:
                        </Typography>
                        <div className={classes.paragraph}>
                          {request.attendant}
                        </div>
                        <Typography color="inherit" variant="subtitle1">
                          Date of Breakdown:
                        </Typography>
                        <div className={classes.paragraph}>{request.date}</div>
                        <Typography color="inherit" variant="subtitle1">
                          Time of Breakdown:
                        </Typography>
                        <div className={classes.paragraph}>{request.time}</div>
                      </React.Fragment>
                    }
                  >
                    <Button variant="contained">Inspect Issue</Button>
                  </Tooltip> */
