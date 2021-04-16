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
  const { id } = useParams();

  const [ride, setRide] = useState({});
  const [editBool, setEditBool] = useState(false);
  const [editRide, setEditRide] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const [editPicture, setEditPicture] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const openEdit = () => {
    const split = {
      ...ride,
      height_restriction_feet: Math.floor(ride.height_restriction / 12),
      height_restriction_inches: ride.height_restriction % 12,
    };
    setEditRide(split);
    setEditBool(true);
  };

  const confrimEdit = () => {
    const newRide = {
      ride_id: editRide.ride_id,
      name: editRide.name,
      description: editRide.description,
      location: editRide.location,
      age_restriction: editRide.age_restriction,
      height_restriction:
        editRide.height_restriction_feet * 12 +
        editRide.height_restriction_inches,
      picture: editRide.picture,
    };
    console.log(newRide);

    axios
      .put("manager/ride-edit", newRide)
      .then((res) => {
        setRide(newRide);
        setEditBool(false);
      })
      .catch((err) => console.log(err));
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

  useEffect(() => {
    axios
      .get("ride/all")
      .then((res) => {
        setRide(res.data.find((ride) => ride.ride_id === Number(id)));
      })
      .catch((err) => console.log(err));
  }, []);

  console.log(ride);

  return (
    <div>
      <Paper square>
        <Grid container>
          <Grid item xs={6}>
            <Card className={classes.card} square>
              {!editBool ? (
                <div>
                  <div style={{ margin: "15px" }}>
                    <Typography variant="h6" gutterBottom>
                      <strong>Name</strong>
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom>
                      {ride.name}
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                      <strong>Location</strong>
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom>
                      {ride.location}
                    </Typography>

                    <Typography variant="h6" gutterBottom>
                      <strong>Height Restriction</strong>
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom>
                      {ride.height_restriction
                        ? `${Math.floor(ride.height_restriction / 12)}' ${
                            ride.height_restriction % 12
                          }'' `
                        : "None"}
                    </Typography>

                    <Typography variant="h6" gutterBottom>
                      <strong>Age Restriction</strong>
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom>
                      {ride.age_restriction ? ride.age_restriction : "None"}
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                      <strong>Description</strong>
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom>
                      {ride.description}
                    </Typography>
                  </div>
                  <CardActions>
                    <Button
                      title="Edit"
                      size="small"
                      color="primary"
                      variant="contained"
                      onClick={() => openEdit()}
                    >
                      Edit
                    </Button>
                  </CardActions>
                </div>
              ) : (
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
                          event.target.value < 0
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
                          event.target.value < 0
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
                          event.target.value < 0
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
                      onClick={() => confrimEdit()}
                    >
                      Confirm
                    </Button>
                    <Button
                      size="small"
                      color="disable"
                      variant="contained"
                      onClick={() => {
                        setLoading(false);
                        setEditRide({});
                        setEditBool(false);
                      }}
                    >
                      Cancel
                    </Button>
                  </CardActions>
                </div>
              )}
            </Card>
          </Grid>
          <Grid item xs={6}>
            {!editBool ? (
              <Card square className={classes.cover}>
                <CardMedia
                  style={{ height: "100%" }}
                  image={ride.picture}
                  title="your assignment"
                />
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
                <div style={{ marginBottom: 20 }}>
                  {editPicture ? editPicture.picture.name : null}
                </div>
                <Button
                  variant="outlined"
                  component="label"
                  style={{ margin: 5 }}
                >
                  Select
                  <input
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
    </div>
  );
}
