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
import { GridListTileBar, Paper, TextareaAutosize } from "@material-ui/core";

const boxStyle = { margin: "10px 10px", fontSize: 25 };
const btnStyle = { fontSize: 15, margin: "10px 5px" };
const root = {
  width: "100vh",
  margin: "auto",
  padding: 20
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
  <Paper style={root} square elevation={3}>
    <Typography align='center'>Add Ride</Typography> 
      <Container>
    <Grid
        container
        spacing={0}
        alignItems="center"
        justify="center"
        style={{ minHeight: "20vh"}}
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
          type="number"
          style = {boxStyle}
      />
       <TextField
          required
          label="Height Restriction Feet"
          id="height_restriction_feet"
          variant="filled"
          type="number"
          style = {boxStyle}
      />
      <TextField
          required
          label="Height Restriction Inches"
          id="height_restriction_inches"
          variant="filled"
          type="number"
          style = {boxStyle}
      />
  </Grid>
  <Grid 
    container
    spacing={0}
    alignItems="center"
    justify="center">
  <TextareaAutosize
          required
          rowsMin={4}
          label="Description"
          id="description"
          placeholder="Description"
          style = {boxStyle}
      />
  </Grid>
      <Grid 
        container
        spacing={0}
        alignItems="center"
        justify="flex-end">
      <Button
          variant="contained"
          style={btnStyle}
         >
          Cancel
        </Button>
      <Button
        variant="contained"
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
        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={btnStyle}
         >
          Submit
        </Button>
        </Grid>
  </Container>
  </Paper>

  );
};

