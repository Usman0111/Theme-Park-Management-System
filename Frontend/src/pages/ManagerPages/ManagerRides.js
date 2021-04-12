import React from "react";
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
import { useHistory } from "react-router-dom";
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

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
}));

const cards = [1, 2, 3, 4, 5, 6, 7, 8];

const btnStyle = { fontSize: 15, margin: "10px 0" };

const boxStyle = { margin: "10px 10px", fontSize: 25 };

export default function ManagerRides() {
  const classes = useStyles();
  let history = useHistory();
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Container className={classes.cardGrid}>
      <CssBaseline />
      <button 
      type="submit"
      variant="contained"
      color="blue"
      fullWidth
      style={btnStyle}
      onClick={() => history.push(`rides/add-ride`)}
      >
        Move
      </button>

      <Grid container spacing={4}>
        {cards.map((card) => (
          <Grid item key={card} xs={3}>
            <Card className={classes.card}>
              <CardMedia
                className={classes.cardMedia}
                image="https://media.beam.usnews.com/de/2248f0a712a4c92fa641b0dd037bb7/media:01216eb80ba74e33b55f2ebe4d36faceTheme_Parks-Slow_Reopening_73567.jpg"
                title="Image title"
              />
              <CardContent className={classes.cardContent}>
                <Typography variant="h5">Name</Typography>
              </CardContent>
              <CardActions className={classes.buttons}>
                <Button color="primary" variant="contained">
                  Assign
                </Button>
                <Button variant="contained" onClick={handleClickOpen}>Edit</Button>

                <Dialog open={open} onClose={handleClose}>
                  <DialogTitle id="form-dialog-title">Edit Ride</DialogTitle>
                  <Grid
                      container
                      alignItems="center"
                      justify="center"
                  >
                    <TextField
                        required
                        label="Ride Name"
                        id="name"
                        className={classes.textField}
                        variant="filled"
                        style = {boxStyle}
                    />
                    <TextField
                        required
                        label="Description"
                        id="description"
                        className={classes.textField}
                        variant="filled"
                        style = {boxStyle}
                    />
                    <TextField
                        required
                        label="Location"
                        id="location"
                        className={classes.textField}
                        variant="filled"
                        style = {boxStyle}
                    />
                    <TextField
                        required
                        label="Age Restriction"
                        id="age_restriction"
                        className={classes.textField}
                        variant="filled"
                        style = {boxStyle}
                    />
                    <TextField
                        required
                        label="Picture?? Need help implementing"
                        id="picture"
                        className={classes.textField}
                        variant="filled"
                        style = {boxStyle}
                    />
                  </Grid>
                  <DialogActions>
                    <Button onClick={handleClose}>
                      Cancel
                    </Button>
                    <Button onClick={handleClose} color="primary">
                      Submit
                    </Button>
                  </DialogActions>

                </Dialog>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
