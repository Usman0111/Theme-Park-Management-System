import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import { Typography, GridList } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 600,
  },
  media: {
    height: 400,
  },
}));


export default function AttendantReport() {
  const classes = useStyles();

  const [reportOpen, setReportOpen] = React.useState(false);
  const [rainoutPopupOpen, setRainoutPopupOpen] = React.useState(false);
  const [rainoutTrue, setRainoutEnabled] = React.useState(false);
  const [rainoutFalse, setRainoutDisabled] = React.useState(true);


  const handleFileReportOpen = () => {
    setReportOpen(true);
  };

  const handleFileReportClose = () => {
    setReportOpen(false);
  };

  const handleFileReportSubmit = () => {
    setReportOpen(false);
  };

  const handleFileReportCancel = () => {
    setReportOpen(false);
  };

  const handleRainoutOpen = () => {
    setRainoutPopupOpen(true);
  };

  const handleRainoutClose = () => {
    setRainoutPopupOpen(false);
  };

  const handleRainoutEnable = () => {
    setRainoutEnabled(true);
    setRainoutDisabled(false);
  };

  const handleRainoutDisable = () => {
    setRainoutEnabled(false);
    setRainoutDisabled(true);
  };

  const [assignmentData, setAssignmentData] = useState({
    attendant_id: "",
  });

  useEffect(() => {
    axios
      .post("attendant/get-assignment", {
        attendant_id: localStorage.getItem("attendant_id"),
      })
      .then((res) => {
        console.log(res.data);
        setAssignmentData(res.data.assignmentData);
      })
      .catch((err) => console.log(err));
  }, []);

  const attendantCall = (attendant) => {
    const data = {
      attendant_id: attendant.attendant_id,
    };
    axios
      .post("attendant/get-assignment", data)
      
      .catch((err) => {
        console.log(err);
      });
  };

  const getAssignment = (e) => {
    e.preventDefault();
  
    axios
      .post("/attendant/get-assignment", assignmentData)
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("attendant_id", res.data.attendant_id);
      })
      .catch((err) => {
        setErr(err.response.data);
        console.log(err.response.data);
        setOpenErr(true);
      });
  };

  const maintenanceRequest = (maintenance) => {
    axios
      .put("attendant/request-maintenance", data)
      .then((res) => {
        handleFileReportSubmit();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const rainoutDeclared = (rainoutDeclaration) => {
    axios
      .put("attendant/declare-rainout", data)
      .then((res) => {
        handleRainoutEnable();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const rainoutEnd = (rainoutDeclarationEnd) => {
    axios
      .put("attendant/end-rainout", data)
      .then((res) => {
        handleRainoutDisable();
      })
      .catch((err) => {
        console.log(err);
      });
  };




  return (
    <Container>
      <Card>
        <Typography variant="h4" noWrap>
          {attendant.name}
        </Typography>

        <Card className={classes.root}>
          <CardMedia 
            className={classes.media}
            image={attendant.picture}
            title={attendant.name}
          />
        </Card>
        



        <Button color="primary" variant="contained" onClick={handleFileReportOpen}>
            File Report
        </Button>
        <Dialog open={reportOpen} onClose={handleFileReportClose}>
          <DialogTitle id="form-dialog-title">
            Maintenance Report Form
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please leave a short description of the problem
            </DialogContentText>
            <TextField key={attendant.breakdown_description} autoFocus margin="dense" id="name" label="Description" type="description" fullWidth multiline="true" rows="5" />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleFileReportCancel} color="primary">
              Cancel
            </Button>
            <Button onClick={() => maintenanceRequest(attendant.breakdown_description)} color="primary">
              Submit
            </Button>
          </DialogActions>
        </Dialog>




        <Button color="primary" variant="contained" onClick={handleRainoutOpen}>
            Rainout
        </Button>
        <Dialog open={rainoutPopupOpen} onClose={handleRainoutClose}>
          <DialogTitle id="form-dialog-title">
            Rainout Declaration
          </DialogTitle>
          <DialogContent>
            <Button color="primary" variant="contained" disabled={rainoutTrue} onClick={rainoutDeclared}>
              Declare Rainout
            </Button>
            <Button color="primary" variant="contained" disabled={rainoutFalse} onClick={rainoutEnd}>
              End Rainout
            </Button>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleRainoutClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>


        <Button color="primary" variant="contained" onClick={handleFileReportOpen}>
            Information
        </Button>
        <Dialog open={reportOpen} onClose={handleFileReportClose}>
          <DialogTitle id="form-dialog-title">
            Ride Information
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Ride Name: {attendant.name}
            </DialogContentText>
            <DialogContentText>
              Ride Description: {attendant.description}
            </DialogContentText>
            <DialogContentText>
              Ride Location: {attendant.location}
            </DialogContentText>
            <DialogContentText>
              Ride Broken: {attendant.broken}
            </DialogContentText>
            <DialogContentText>
              Ride Rainout: {attendant.rainedout}
            </DialogContentText>
            <DialogContentText>
              Age Restriction: {attendant.age_restriction}
            </DialogContentText>
            <DialogContentText>
              Height Restriction: {attendant.height_restriction}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleFileReportCancel} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>

      </Card>
    </Container>
  );
}