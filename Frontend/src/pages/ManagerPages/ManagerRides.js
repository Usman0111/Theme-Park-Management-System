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
import BrokenImageIcon from "@material-ui/icons/BrokenImage";
import OpacityIcon from "@material-ui/icons/Opacity";
import { useRouteMatch, Link } from "react-router-dom";
import RestoreFromTrashIcon from "@material-ui/icons/RestoreFromTrash";
import DeleteIcon from "@material-ui/icons/Delete";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import ArchiveIcon from "@material-ui/icons/Archive";
import UnarchiveIcon from "@material-ui/icons/Unarchive";

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

export default function ManagerRides() {
  const classes = useStyles();
  let { url, path } = useRouteMatch();
  const [rides, setRides] = useState([]);
  const [unassinged, setUnassinged] = useState([]);
  const [attendant, setAttendant] = useState({});
  const [ridePicked, setRidePicked] = useState({});
  const [openSnack, setOpenSnack] = useState(false);
  const [snackMsg, setSnackMsg] = useState("");

  const handleCloseSnack = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnack(false);
  };

  const handleChange = (event) => {
    console.log(event.target.value);

    setAttendant(event.target.value);
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = async (ride) => {
    setRidePicked(ride);
    const unassingedAttendants = await axios
      .get("manager/unassinged-attendants")
      .then((res) => res.data)
      .catch((err) => console.log(err));
    setUnassinged(unassingedAttendants);

    if (ride.attendant_id) {
      const currentAttendant = await axios
        .post("manager/get-one-attendant", { attendant_id: ride.attendant_id })
        .then((res) => res.data)
        .catch((err) => console.log(err));
      setAttendant(currentAttendant);
    } else {
      setAttendant({});
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const assign = () => {
    if (
      ridePicked.attendant_id !== attendant.account_id &&
      attendant.account_id != null
    ) {
      axios
        .post("manager/new-assignment", {
          assignment_type: "ride",
          attendant_id: attendant.account_id,
          ride_id: ridePicked.ride_id,
        })
        .then((res) => {
          console.log(res.data);
          const newRide = res.data;
          setRides(
            rides.map((ride) =>
              ride.ride_id === newRide.ride_id ? newRide : ride
            )
          );
          setSnackMsg("Attendant successfully assigned!");
          setOpenSnack(true);
        })
        .catch((err) => console.log(err));
    }
    handleClose();
  };

  const unassgin = (ride) => {
    console.log({
      assignment_type: "ride",
      attendant_id: ride.attendant_id,
      ride_id: ride.ride_id,
    });
    axios
      .delete("manager/remove-assignment", {
        data: {
          assignment_type: "ride",
          attendant_id: ride.attendant_id,
          ride_id: ride.ride_id,
        },
      })
      .then((res) => {
        console.log(res.data);
        const newRide = res.data;
        setRides(
          rides.map((ride) =>
            ride.ride_id === newRide.ride_id ? newRide : ride
          )
        );
        setSnackMsg("Attendant successfully removed!");
        setOpenSnack(true);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    axios
      .get("ride/all")
      .then((res) => {
        setRides(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  // console.log(rides);
  // console.log(unassinged);

  return (
    <Container className={classes.cardGrid}>
      <CssBaseline />
      <Grid container spacing={4}>
        {rides.map((ride) => (
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
                {ride.attendant_id ? (
                  <div>
                    <Button
                      color="primary"
                      variant="contained"
                      onClick={() => unassgin(ride)}
                    >
                      Unassign
                    </Button>
                  </div>
                ) : (
                  <Button
                    color="primary"
                    variant="contained"
                    onClick={() => handleClickOpen(ride)}
                  >
                    Assign
                  </Button>
                )}

                <Link
                  to={`${url}/info-ride/${ride.ride_id}`}
                  style={{ textDecoration: "none" }}
                >
                  <Button variant="contained" style={{ paddingLeft: 13 }}>
                    Info
                  </Button>
                </Link>

                <Button variant="contained">
                  <ArchiveIcon />
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
        <div>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="form-dialog-title"
          >
            <DialogContent>
              <FormControl className={classes.formControl} fullWidth>
                <InputLabel>Attendant</InputLabel>
                {console.log()}
                <Select
                  value={attendant.account_id ? attendant : ""}
                  onChange={handleChange}
                >
                  {attendant.account_id ? (
                    <MenuItem value={attendant}>
                      {attendant.first_name + " " + attendant.last_name}
                    </MenuItem>
                  ) : null}
                  {unassinged.map((attendant) => (
                    <MenuItem value={attendant} key={attendant.account_id}>
                      {/* {console.log(attendant.account_id)} */}
                      {attendant.first_name + " " + attendant.last_name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => assign()} color="primary">
                Confirm
              </Button>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
            </DialogActions>
          </Dialog>
        </div>
        <Snackbar
          open={openSnack}
          autoHideDuration={2000}
          onClose={handleCloseSnack}
        >
          <Alert onClose={handleCloseSnack} severity="success">
            {snackMsg}
          </Alert>
        </Snackbar>
      </Grid>
    </Container>
  );
}
