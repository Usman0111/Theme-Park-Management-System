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

import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Paper, TextareaAutosize } from "@material-ui/core";

const boxStyle = { margin: "10px 10px", fontSize: 25 };
const btnStyle = { fontSize: 15, margin: "10px 0" };
const root = {
  height: "20vh",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
};

export default function ManagerAddRide () {

  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
  <Paper style={root} square>
      <Container>
    <Typography>Add Ride</Typography>
    <Grid
        container
        alignItems="center"
        justify="center"

    >
      <TextField
          required
          label="Ride Name"
          id="name"
          variant="filled"
          style = {boxStyle}
      />
      <TextField
          required
          label="Location"
          id="location"
          variant="filled"
          style = {boxStyle}
      />
      <TextField
          required
          label="Age Restriction"
          id="age_restriction"
          variant="filled"
          style = {boxStyle}
      />
      <TextareaAutosize
          required
          label="Description"
          id="description"
          placeholder="Description"
          style = {boxStyle}
      />
      <Button
              type="submit"
              variant="contained"
              color="primary"
              style={btnStyle}
              onClick={handleClickOpen}
      >
              Add Picture
      </Button>
      <Dialog open={open} onClose={handleClose}>
                  <DialogTitle id="form-dialog-title">Add Picture</DialogTitle>
                  <Grid
                      container
                      alignItems="center"
                      justify="center"
                  >
                    <TextField
                        required
                        label="Add picture stuff here"
                        id="name"
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
    </Grid>
  </Container>
  </Paper>

  );
};

