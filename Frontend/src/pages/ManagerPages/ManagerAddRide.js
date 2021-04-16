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

const useStyles = makeStyles({
  input: {
    margin: "10px",
  },
  textField: {
    padding: "10px",
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
  const [ride, setRide] = useState({});
  const { id } = useParams();

  const [editBool, setEditBool] = useState(false);
  useEffect(() => {
    console.log(id);
    axios
      .get("ride/all")
      .then((res) => {
        setRide(res.data.find((ride) => ride.ride_id === Number(id)));
      })
      .catch((err) => console.log(err));
  }, []);

  return (
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
                    <strong>Height Resctriction</strong>
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom>
                    {ride.height_resctriction}
                  </Typography>

                  <Typography variant="h6" gutterBottom>
                    <strong>Age Resctriction</strong>
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom>
                    {ride.age_resctriction}
                  </Typography>
                  <Typography variant="h6" gutterBottom>
                    <strong>Description</strong>
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom>
                    Have a seat, but don’t get too used to having your feet on
                    the ground. These chairs will soon swing in a peaceful
                    circle around the stunning 242-foot-tall tower. By the time
                    you get to the top, you will be careening around the center
                    base at 40 miles per hour!
                  </Typography>
                </div>
                <CardActions>
                  <Button
                    title="Edit"
                    size="small"
                    color="primary"
                    variant="contained"
                    onClick={() => setEditBool(true)}
                  >
                    <EditIcon style={{ marginRight: "5px" }} />
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
                />
                <TextField
                  className={classes.textField}
                  required
                  label="Location"
                  id="location"
                  variant="outlined"
                  fullWidth
                />

                <TextField
                  className={classes.textField}
                  required
                  label="Age Restriction"
                  id="age_restriction"
                  type="number"
                  variant="outlined"
                  fullWidth
                />
                <TextField
                  className={classes.textField}
                  required
                  label="Height Restriction Feet"
                  id="height_restriction_feet"
                  type="number"
                  variant="outlined"
                  fullWidth
                />
                <TextField
                  className={classes.textField}
                  required
                  label="Height Restriction Inches"
                  id="height_restriction_inches"
                  type="number"
                  variant="outlined"
                  fullWidth
                />
                <TextField
                  className={classes.textField}
                  label="Description"
                  type="description"
                  variant="outlined"
                  rows="5"
                  multiline
                  fullWidth
                  rows={6}
                  required
                />
                <CardActions>
                  <Button size="small" color="primary" variant="contained">
                    Confirm
                  </Button>
                  <Button
                    size="small"
                    color="primary"
                    variant="contained"
                    onClick={() => setEditBool(false)}
                  >
                    Cancel
                  </Button>
                </CardActions>
              </div>
            )}
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card square className={classes.cover}>
            <CardMedia
              style={{ height: "100%" }}
              image="https://media.beam.usnews.com/de/2248f0a712a4c92fa641b0dd037bb7/media:01216eb80ba74e33b55f2ebe4d36faceTheme_Parks-Slow_Reopening_73567.jpg"
              title="your assignment"
            />
            {/* <CardActions style={{ height: "8%" }}>
              <Button size="small" color="primary" variant="contained">
                <PublishIcon style={{ marginRight: "5px" }} />
                Upload Picture
              </Button>
            </CardActions> */}
          </Card>
        </Grid>
      </Grid>
    </Paper>
  );
}
