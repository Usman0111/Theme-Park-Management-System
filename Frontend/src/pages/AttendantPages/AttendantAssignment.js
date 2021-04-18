import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import { Typography } from "@material-ui/core";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import Card from "@material-ui/core/Card";
import Tooltip from "@material-ui/core/Tooltip";
import CardMedia from "@material-ui/core/CardMedia";
import { makeStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import axios from "axios";
import BrokenImageIcon from "@material-ui/icons/BrokenImage";
import EventAvailableIcon from "@material-ui/icons/EventAvailable";
import OpacityIcon from "@material-ui/icons/Opacity";
import CardContent from "@material-ui/core/CardContent";
import red from "@material-ui/core/colors/red";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  details: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 100,
  },
  content: {
    flex: "1 0 auto",
  
  },
  cover: {
    width: 600,
    height: "100%",
  },
  buttons: {
    marginTop: "20px",
  },
}));
const boxStyle = { margin: "10px 10px", fontSize: 25 };

export default function AttendantAssignment() {
  const classes = useStyles();
  const [assignment, setAssignment] = useState({});
  const [type, setType] = useState("");
  const [open, setOpen] = useState(false);
  const [description, setDescription] = useState("");
  const [snackMsg, setSnackMsg] = useState("");
  const [retrevied, setRetreived] = useState(false);
  const [isRide, setIsRide] = useState(false);
  const [ageRestriction, setAgeRestriction] = useState("");


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [openSnack, setOpenSnack] = React.useState(false);

  const handleClickSnack = (msg) => {
    setSnackMsg(msg);
    setOpenSnack(true);
  };

  const handleCloseSnack = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnack(false);
  };

  useEffect(() => {
    axios
      .post("attendant/get-assignment", {
        attendant_id: localStorage.getItem("user_id"),
      })
      .then((res) => {
        console.log(res.data);
        if(res.data === null || res.data === "No assignment"){

        }
        else{
          setRetreived(true)
          setAssignment(res.data.assignment);
          setType(res.data.type);
          if(res.data.type === "ride"){
            setIsRide(true);
          }
        }
        /*
        if(res.data === "No assignment"){
        }
        
        }*/
      })
      .catch((err) => console.log(err));
  }, []);

  const fixRequest = () => {
    console.log(description);
    axios
      .put("attendant/request-maintainence", {
        ride_id: assignment.ride_id,
        breakdown_description: description,
        attendant_id: assignment.attendant_id,
      })
      .then((res) => {
        handleClose();
        setAssignment({ ...assignment, broken: true });
        handleClickSnack("Fix request successfully made!");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const declareRainout = () => {
    if(isRide)
    {
      axios
      .put("attendant/declare-rainout", {
        rainout_type: "ride",
        ride_id: assignment.ride_id,
        attendant_id: assignment.attendant_id,
      })
      .then((res) => {
        setAssignment({ ...assignment, rainedout: true });
        handleClickSnack("Rainout successfully declared!");
      })
      .catch((err) => {
        console.log(err);
      });
    }
    else
    {
      axios
      .put("attendant/declare-rainout", {
        rainout_type: "attraction",
        attraction_id: assignment.attraction_id,
        attendant_id: assignment.attendant_id,
      })
      .then((res) => {
        setAssignment({ ...assignment, rainedout: true });
        handleClickSnack("Rainout successfully declared!");
      })
      .catch((err) => {
        console.log(err);
      });
    }

  };

  const endRainout = () => {
    if(isRide)
    {
      axios
      .put("attendant/end-rainout", {
        rainout_type: "ride",
        ride_id: assignment.ride_id,
      })
      .then((res) => {
        setAssignment({ ...assignment, rainedout: false });
        handleClickSnack("Rainout successfully ended!");
      })
      .catch((err) => {
        console.log(err);
      });
    }
    else
    {
      axios
      .put("attendant/end-rainout", {
        rainout_type: "attraction",
        attraction_id: assignment.attraction_id,
      })
      .then((res) => {
        setAssignment({ ...assignment, rainedout: false });
        handleClickSnack("Rainout successfully ended!");
      })
      .catch((err) => {
        console.log(err);
      });
    }

  };

  return (
    <div>
      {retrevied === true ? (
        <div>
          <Card className={classes.root}>
            <div className={classes.details}>
              <CardContent className={classes.content}>
                <Typography variant="h2">{assignment.name}</Typography>
                <Typography variant="h6">Description</Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  {assignment.description}
                </Typography>
                <Typography variant="h6">Location</Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  {assignment.location} 
                </Typography>
                <Typography variant="h6">Age Restriction</Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  {assignment.age_restriction ? assignment.age_restriction: "None" }
                </Typography>
                {isRide ? 
                  <div>
                    <Typography variant="h6">Height Resctriction</Typography>
                <Typography variant="subtitle1" color="textSecondary">
                {assignment.height_restriction
                        ? `${Math.floor(assignment.height_restriction / 12)}' ${
                            assignment.height_restriction % 12
                          }'' `
                        : "None"}
                </Typography>
                  </div>: null}
                
                <Typography variant="h6">Status</Typography>
                <div>
                  {!assignment.broken && !assignment.rainedout ? (
                    <Tooltip title="Available">
                      <EventAvailableIcon fontSize="large" />
                    </Tooltip>
                  ) : null}
                  {assignment.broken ? (
                    <Tooltip title="Broken">
                      <BrokenImageIcon fontSize="large" />
                    </Tooltip>
                  ) : null}
                  {assignment.rainedout ? (
                    <Tooltip title="Rainedout">
                      <OpacityIcon fontSize="large" />
                    </Tooltip>
                  ) : null}
                </div>
                <Divider />
                <div className={classes.buttons}>
                {isRide ? 
                  assignment.broken ? (
                    <Button variant="contained" color="disabled">
                      Make Fix Request
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      style={{ backgroundColor: red["A200"], color: "white" }}
                      onClick={() => setOpen(true)}
                    >
                      Make Fix Request
                    </Button>
                  )
                : null}
                
                
                  {assignment.rainedout ? (
                    <Button
                      variant="contained"
                      style={{ marginLeft: "15px" }}
                      color="primary"
                      onClick={() => endRainout()}
                    >
                      End Rainout
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      color="primary"
                      style={{ marginLeft: "15px" }}
                      onClick={() => declareRainout()}
                    >
                      Declare Rainout
                    </Button>
                  )}
                </div>
              </CardContent>
            </div>
            <Card>
              <CardMedia
                className={classes.cover}
                image={assignment.picture}
                title="your assignment"
              />
            </Card>
          </Card>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="form-dialog-title"
          >
            <DialogContent>
              <DialogContentText>
                Please leave a short description of the problem
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                type="description"
                fullWidth
                variant="filled"
                multiline="true"
                rows="5"
                onChange={(event) => setDescription(event.target.value)}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => fixRequest()} color="primary">
                Confirm
              </Button>
              <Button onClick={handleClose} color="disable">
                Cancel
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      ) : null}
      <Snackbar
        open={openSnack}
        autoHideDuration={2000}
        onClose={handleCloseSnack}
      >
        <Alert onClose={handleCloseSnack} severity="success">
          {snackMsg}
        </Alert>
      </Snackbar>
    </div>
  );
}
