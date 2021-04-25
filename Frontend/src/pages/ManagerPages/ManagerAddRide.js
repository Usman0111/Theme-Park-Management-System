import Reac, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import PublishIcon from "@material-ui/icons/Publish";
import Typography from "@material-ui/core/Typography";
import { useParams } from "react-router-dom";
import axios from "axios";
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import CircularProgress from "@material-ui/core/CircularProgress";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useHistory } from "react-router-dom";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles({
  input: {
    margin: "10px",
  },
  textField: {
    padding: "10px",
    marginTop: "10px",
  },
  card: {
    margin: "0px",
  },
  cover: {
    height: "100%",
  },
});

export default function ManagerAddRide() {
  const classes = useStyles();
  let history = useHistory();
  const [editRide, setEditRide] = useState({
    name: "",
    description: "",
    location: "",
    age_restriction: 0,
    height_restriction: 0,
    height_restriction_feet: 0,
    height_restriction_inches: 0,
    picture: "",
  });
  const [openModal, setOpenModal] = useState(false);
  const [editPicture, setEditPicture] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const [open, setOpen] = useState(false);
  const [err, setErr] = useState("");

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const confirmCreate = () => {
    const sumHeight =
      editRide.height_restriction_feet * 12 +
      editRide.height_restriction_inches;
    const newRide = {
      name: editRide.name,
      description: editRide.description,
      location: editRide.location,
      age_restriction:
        editRide.age_restriction > 0 ? editRide.age_restriction : null,
      height_restriction: sumHeight > 0 ? sumHeight : null,
      picture: editRide.picture,
    };

    //Missing Fields
    if (newRide.name == "") {
      setErr("Name is Empty");
      setOpen(true);
      return;
    }
    if (newRide.location == "") {
      setErr("Location is Empty");
      setOpen(true);
      return;
    }
    if (newRide.description == "") {
      setErr("Description is Empty");
      setOpen(true);
      return;
    }
    //Fields out of bounds
    if (newRide.name.length > 30) {
      setErr("Name Length is Too Large");
      setOpen(true);
      return;
    }
    if (newRide.name.length < 4) {
      setErr("Name Length is Too Small");
      setOpen(true);
      return;
    }
    if (newRide.location.length > 50) {
      setErr("Location Length is Too Large");
      setOpen(true);
      return;
    }
    if (newRide.location.length < 4) {
      setErr("Location Length is Too Small");
      setOpen(true);
      return;
    }
    if (newRide.age_restriction > 21) {
      setErr("Age is Too Large");
      setOpen(true);
      return;
    }
    if (newRide.height_restriction > 96) {
      setErr("Height is Too Large");
      setOpen(true);
      return;
    }

    if (newRide.description.length < 20) {
      setErr("Description Length is Too Small");
      setOpen(true);
      return;
    }
    if (newRide.description.length > 400) {
      setErr("Description Length is Too Large");
      setOpen(true);
      return;
    }

    axios
      .post("manager/ride-create", newRide)
      .then((res) => {
        console.log(res.data);
        history.push(`/dashboard/rides/info-ride/${res.data.ride_id}`);
      })
      .catch((err) => {
        setErr(err.response.data);
        setOpen(true);
        console.log(err.response.data);
      });
  };
  const uploadPicture = async () => {
    if (editPicture) {
      const formData = new FormData();
      formData.append("image", editPicture.picture);
      setLoading(true);
      await axios
        .post("manager/upload-image", formData)
        .then((res) => {
          const name = res.data.path.split("/")[1];
          setEditRide({
            ...editRide,
            picture: `http://100.26.17.215:5000/${name}`,
          });
          setLoading(false);
          handleCloseModal();
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div>
      <Paper square>
        <Grid container>
          <Grid item xs={6}>
            <Card className={classes.card} square>
              <div>
                <TextField
                  className={classes.textField}
                  required
                  label="Ride Name"
                  id="name"
                  variant="outlined"
                  fullWidth
                  value={editRide.name}
                  onChange={(event) =>
                    setEditRide({ ...editRide, name: event.target.value })
                  }
                />
                <TextField
                  className={classes.textField}
                  required
                  label="Location"
                  id="location"
                  variant="outlined"
                  fullWidth
                  value={editRide.location}
                  onChange={(event) =>
                    setEditRide({ ...editRide, location: event.target.value })
                  }
                />

                <TextField
                  className={classes.textField}
                  required
                  label="Age Restriction"
                  id="age_restriction"
                  type="number"
                  variant="outlined"
                  fullWidth
                  value={editRide.age_restriction}
                  onChange={(event) =>
                    setEditRide({
                      ...editRide,
                      age_restriction:
                        event.target.value < 0 || event.target.value > 25
                          ? (event.target.value = 0)
                          : Number(event.target.value),
                    })
                  }
                />
                <TextField
                  className={classes.textField}
                  required
                  label="Height Restriction Feet"
                  id="height_restriction_feet"
                  type="number"
                  variant="outlined"
                  fullWidth
                  value={editRide.height_restriction_feet}
                  onChange={(event) =>
                    setEditRide({
                      ...editRide,
                      height_restriction_feet:
                        event.target.value < 0 || event.target.value > 6
                          ? (event.target.value = 0)
                          : Number(event.target.value),
                    })
                  }
                />
                <TextField
                  className={classes.textField}
                  required
                  label="Height Restriction Inches"
                  id="height_restriction_inches"
                  type="number"
                  variant="outlined"
                  fullWidth
                  value={editRide.height_restriction_inches}
                  onChange={(event) =>
                    setEditRide({
                      ...editRide,
                      height_restriction_inches:
                        event.target.value < 0 || event.target.value > 11
                          ? (event.target.value = 0)
                          : Number(event.target.value),
                    })
                  }
                />
                <TextField
                  className={classes.textField}
                  label="Description"
                  type="description"
                  variant="outlined"
                  rows="5"
                  multiline
                  fullWidth
                  rows={5}
                  required
                  value={editRide.description}
                  onChange={(event) =>
                    setEditRide({
                      ...editRide,
                      description: event.target.value,
                    })
                  }
                />
                <CardActions>
                  <Button
                    size="small"
                    color="primary"
                    variant="contained"
                    onClick={() => confirmCreate()}
                  >
                    Confirm
                  </Button>

                  <Button
                    size="small"
                    color="disable"
                    variant="contained"
                    onClick={() => history.push(`/dashboard/rides`)}
                  >
                    Cancel
                  </Button>
                </CardActions>
              </div>
            </Card>
          </Grid>
          <Grid item xs={6}>
            {editRide.picture === "" ? (
              <Card square className={classes.cover}>
                <CardMedia
                  style={{ height: "100%" }}
                  image={"http://100.26.17.215:5000/default-coverImage.png"}
                  title="Add Picture"
                >
                  <IconButton aria-label="upload picture" component="span">
                    <EditIcon
                      style={{ margin: "5px", color: "black" }}
                      onClick={() => {
                        setOpenModal(true);
                        setEditPicture(null);
                      }}
                    />
                  </IconButton>
                </CardMedia>
              </Card>
            ) : (
              <Card square className={classes.cover}>
                <CardMedia
                  style={{ height: "100%" }}
                  image={editRide.picture}
                  title="your assignment"
                >
                  <IconButton aria-label="upload picture" component="span">
                    <EditIcon
                      style={{ margin: "5px", color: "white" }}
                      onClick={() => {
                        setOpenModal(true);
                        setEditPicture(null);
                      }}
                    />
                  </IconButton>
                </CardMedia>
              </Card>
            )}
          </Grid>
        </Grid>
      </Paper>
      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogContent>
          <Grid justify="center">
            {loading ? (
              <CircularProgress />
            ) : (
              <div>
                <Typography variant="h6" gutterBottom>
                  Select Picture
                </Typography>
                <div style={{ marginBottom: 20 }}>
                  {editPicture !== null ? editPicture.picture.name : null}
                </div>
                <Button
                  variant="outlined"
                  component="label"
                  label="Select Picture"
                  style={{ margin: 5 }}
                >
                  Select
                  <input
                    label="Select Picture"
                    type="file"
                    hidden
                    onChange={(event) =>
                      setEditPicture({ picture: event.target.files[0] })
                    }
                  />
                </Button>
                <Button
                  onClick={() => uploadPicture()}
                  color="primary"
                  variant="contained"
                  style={{ margin: 5 }}
                >
                  Upload
                </Button>
              </div>
            )}
          </Grid>
        </DialogContent>
      </Dialog>
      <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
        <Alert severity="error" style={{ marginTop: "10px" }}>
          {err}
        </Alert>
      </Snackbar>
    </div>
  );
}
