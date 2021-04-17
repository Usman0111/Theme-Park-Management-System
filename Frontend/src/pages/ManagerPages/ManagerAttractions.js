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
import AddCircleIcon from "@material-ui/icons/AddCircle";

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

export default function ManagerAttractions() {
  const classes = useStyles();
  let { url, path } = useRouteMatch();
  const [Attractions, setAttractions] = useState([]);
  const [unassinged, setUnassinged] = useState([]);
  const [attendant, setAttendant] = useState({});
  const [attractionPicked, setattractionPicked] = useState({});
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

  const handleClickOpen = async (attraction) => {
    setattractionPicked(attraction);
    const unassingedAttendants = await axios
      .get("manager/unassinged-attendants")
      .then((res) => res.data)
      .catch((err) => console.log(err));
    setUnassinged(unassingedAttendants);

    if (attraction.attendant_id) {
      const currentAttendant = await axios
        .post("manager/get-one-attendant", { attendant_id: attraction.attendant_id })
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
      attractionPicked.attendant_id !== attendant.account_id &&
      attendant.account_id != null
    ) {
      axios
        .post("manager/new-assignment", {
          assignment_type: "attraction",
          attendant_id: attendant.account_id,
          attraction_id: attractionPicked.attraction_id,
        })
        .then((res) => {
          console.log(res.data);
          const newattraction = res.data;
          setAttractions(
            Attractions.map((attraction) =>
              attraction.attraction_id === newattraction.attraction_id ? newattraction : attraction
            )
          );
          setSnackMsg("Attendant successfully assigned!");
          setOpenSnack(true);
        })
        .catch((err) => console.log(err));
    }
    handleClose();
  };

  const unassgin = (attraction) => {
    console.log({
      assignment_type: "attraction",
      attendant_id: attraction.attendant_id,
      attraction_id: attraction.attraction_id,
    });
    axios
      .delete("manager/remove-assignment", {
        data: {
          assignment_type: "attraction",
          attendant_id: attraction.attendant_id,
          attraction_id: attraction.attraction_id,
        },
      })
      .then((res) => {
        console.log(res.data);
        const newattraction = res.data;
        setAttractions(
          Attractions.map((attraction) =>
            attraction.attraction_id === newattraction.attraction_id ? newattraction : attraction
          )
        );
        setSnackMsg("Attendant successfully removed!");
        setOpenSnack(true);
      })
      .catch((err) => console.log(err));
  };

  const setArchive = (config) => {
    axios
      .put("manager/attraction-archive", config)
      .then((res) => {
        setAttractions(
          Attractions.map((attraction) =>
            attraction.attraction_id === config.attraction_id
              ? { ...attraction, archived: config.archive }
              : attraction
          )
        );
        if (config.archive) {
          setSnackMsg("attraction successfully archived!");
          setOpenSnack(true);
        } else {
          setSnackMsg("attraction successfully unarchived!");
          setOpenSnack(true);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    axios
      .get("attraction/all")
      .then((res) => {
        setAttractions(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  console.log(Attractions);

  return (
    <Container className={classes.cardGrid}>
      <CssBaseline />
      <Link to={`${url}/add-attraction`} style={{ textDecoration: "none" }}>
        <Button
          variant="contained"
          color="primary"
          style={{ paddingLeft: 13, marginBottom: 10 }}
        >
          <AddCircleIcon style={{ marginRight: 5 }} />
          Add New
        </Button>
      </Link>
      <Grid container spacing={4}>
        {Attractions.map((attraction) => (
          <Grid item key={attraction.attraction_id} md={3}>
            <Card className={classes.card}>
              <CardMedia className={classes.cardMedia} image={attraction.picture} />
              <CardContent className={classes.cardContent}>
                <Typography variant="h5">
                  {attraction.name}
                  {attraction.broken ? (
                    <Tooltip title="broken">
                      <BrokenImageIcon color="disabled" />
                    </Tooltip>
                  ) : null}
                  {attraction.rainedout ? (
                    <Tooltip title="rained out">
                      <OpacityIcon color="disabled" />
                    </Tooltip>
                  ) : null}
                </Typography>
              </CardContent>
              <CardActions className={classes.buttons}>
                {attraction.attendant_id ? (
                  <div>
                    <Button
                      color="primary"
                      variant="contained"
                      onClick={() => unassgin(attraction)}
                      title={`Assigned to ${attraction.first_name} ${attraction.last_name}`}
                    >
                      Unassign
                    </Button>
                  </div>
                ) : (
                  <Button
                    color="primary"
                    variant="contained"
                    onClick={() => handleClickOpen(attraction)}
                  >
                    Assign
                  </Button>
                )}

                <Link
                  to={`${url}/info-attraction/${attraction.attraction_id}`}
                  style={{ textDecoration: "none" }}
                >
                  <Button variant="contained" style={{ paddingLeft: 13 }}>
                    Info
                  </Button>
                </Link>

                {attraction.archived ? (
                  <Button
                    title="Unarchive"
                    variant="contained"
                    onClick={() =>
                      setArchive({ attraction_id: attraction.attraction_id, archive: false })
                    }
                  >
                    <UnarchiveIcon />
                  </Button>
                ) : (
                  <Button
                    title="Archive"
                    variant="contained"
                    onClick={() =>
                      setArchive({ attraction_id: attraction.attraction_id, archive: true })
                    }
                  >
                    <ArchiveIcon />
                  </Button>
                )}
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
