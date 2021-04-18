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
  let history = useHistory();
  const [editattraction, setEditattraction] = useState({
    name: "",
    description: "",
    location: "",
    age_restriction: 0,
    picture: "",
  });
  const [openModal, setOpenModal] = useState(false);
  const [editPicture, setEditPicture] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const confirmCreate = () => {
    const newattraction = {
      name: editattraction.name,
      description: editattraction.description,
      location: editattraction.location,
      age_restriction:
        editattraction.age_restriction > 0
          ? editattraction.age_restriction
          : null,
      picture: editattraction.picture,
    };

    if(newattraction.name=="")
    {
      console.log("name is empty");
      return;
    }
    if(newattraction.description=="")
    {
      console.log("name is empty");
      return;
    }
    if(newattraction.location=="")
    {
      console.log("name is empty");
      return;
    }

    axios
      .post("manager/attraction-create", newattraction)
      .then((res) => {
        console.log(res.data);
        history.push(
          `/dashboard/attractions/info-attraction/${res.data.attraction_id}`
        );
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
                    onClick={() => confirmCreate()}
                  >
                    Confirm
                  </Button>

                  <Button
                    size="small"
                    color="disable"
                    variant="contained"
                    onClick={() => history.push(`/dashboard/attractions`)}
                  >
                    Cancel
                  </Button>
                </CardActions>
              </div>
            </Card>
          </Grid>
          <Grid item xs={6}>
            {editattraction.picture === "" ? (
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
                  image={editattraction.picture}
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
    </div>
  );
}
