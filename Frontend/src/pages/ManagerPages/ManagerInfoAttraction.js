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

export default function ManagerAddattraction() {
  const classes = useStyles();
  const { id } = useParams();

  const [attraction, setattraction] = useState({});
  const [editBool, setEditBool] = useState(false);
  const [editattraction, setEditattraction] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const [editPicture, setEditPicture] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const openEdit = () => {
    const split = {
      ...attraction,
    };
    setEditattraction(split);
    setEditBool(true);
  };

  const confrimEdit = () => {
    const newattraction = {
      attraction_id: editattraction.attraction_id,
      name: editattraction.name,
      description: editattraction.description,
      location: editattraction.location,
      age_restriction: editattraction.age_restriction,
      picture: editattraction.picture,
    };

    axios
      .put("manager/attraction-edit", newattraction)
      .then((res) => {
        setattraction(newattraction);
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
          setEditattraction({
            ...editattraction,
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
      .get("attraction/all")
      .then((res) => {
        const currentattraction = res.data.find(
          (attraction) => attraction.attraction_id === Number(id)
        );
        if (currentattraction.picture) {
          setattraction(currentattraction);
        } else {
          setattraction({
            ...currentattraction,
            picture: "http://100.26.17.215:5000/default-coverImage.png",
          });
        }
      })
      .catch((err) => console.log(err));
  }, []);

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
                      {attraction.name}
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                      <strong>Location</strong>
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom>
                      {attraction.location}
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                      <strong>Age Restriction</strong>
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom>
                      {attraction.age_restriction
                        ? attraction.age_restriction
                        : "None"}
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                      <strong>Description</strong>
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom>
                      {attraction.description}
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
                    label="attraction Name"
                    id="name"
                    variant="outlined"
                    fullWidth
                    value={editattraction.name}
                    onChange={(event) =>
                      setEditattraction({
                        ...editattraction,
                        name: event.target.value,
                      })
                    }
                  />
                  <TextField
                    className={classes.textField}
                    required
                    label="Location"
                    id="location"
                    variant="outlined"
                    fullWidth
                    value={editattraction.location}
                    onChange={(event) =>
                      setEditattraction({
                        ...editattraction,
                        location: event.target.value,
                      })
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
                    value={editattraction.age_restriction}
                    onChange={(event) =>
                      setEditattraction({
                        ...editattraction,
                        age_restriction:
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
                    value={editattraction.description}
                    onChange={(event) =>
                      setEditattraction({
                        ...editattraction,
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
                        setEditattraction({});
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
                  image={attraction.picture}
                  title="your assignment"
                />
              </Card>
            ) : (
              <Card square className={classes.cover}>
                <CardMedia
                  style={{ height: "100%" }}
                  image={editattraction.picture}
                  title="attraction picture"
                >
                  <IconButton aria-label="upload picture" component="span">
                    <EditIcon
                      style={{
                        margin: "5px",
                        color:
                          editattraction.picture ==
                          "http://100.26.17.215:5000/default-coverImage.png"
                            ? "black"
                            : "white",
                      }}
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
                  {editPicture ? editPicture.picture.name : null}
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
    </div>
  );
}
