import React, { useState, useEffect } from "react";
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
import axios from "axios";
import Snackbar from "@material-ui/core/Snackbar";
import { Dialog } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import { green, grey } from "@material-ui/core/colors";
import NothingMessage from "../../components/NothingMessage/NothingMessage";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

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
    paddingTop: "56.25%",
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

const getInfo = (breakdown) => {
  const indexT = breakdown.breakdown_date.indexOf("T");
  console.log(breakdown);

  return {
    r_id: breakdown.ride_id,
    bd_id: breakdown.breakdown_id,
    date: breakdown.breakdown_date.slice(0, indexT),
    name: breakdown.name,
    descript: breakdown.breakdown_description,
    location: breakdown.location,
    picture: breakdown.picture,
    attendant_name: breakdown.first_name + " " + breakdown.last_name,
  };
};

const ManagerBreakdowns = () => {
  const classes = useStyles();
  const [loaded, setLoaded] = useState(false);
  const [openModal, setOpenModal] = React.useState(false);
  const [openSnackbar, setOpenSnackBar] = React.useState(false);
  const [requests, setRequest] = useState([]);
  const [inspectIssue, setInspectIssue] = useState({});
  const [fixMsg, setFixMsg] = useState("");
  const [fixType, setFixType] = useState("");
  const [openModalAssign, setOpenModalAssign] = React.useState(false);
  const [maintainers, setMaintainers] = useState([]);
  const [maintainer, setMaintainer] = useState({});
  const [breakdown, setBreakdown] = useState({});

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackBar(false);
  };
  const handleCloseModal = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenModal(false);
  };
  const handleClickOpenModal = (request) => {
    setInspectIssue({
      ride_id: request.r_id,
      ride_name: request.name,
      breakdown_description: request.descript,
      breakdown_date: request.date,
      attendant_name: request.attendant_name,
    });
    setOpenModal(true);
  };

  const handleCloseModalAssign = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenModalAssign(false);
  };
  const handleClickOpenModalAssign = (request) => {
    setOpenModalAssign(true);
  };

  const handleChange = (event) => {
    console.log(event.target.value);

    setMaintainer(event.target.value);
  };
  useEffect(() => {
    axios
      .get("manager/all-maintainence-requests")
      .then((res) => {
        const req = res.data.map((breakdown) => getInfo(breakdown));
        setRequest(req);
        setLoaded(true);
      })
      .catch((err) => {
        console.log(err.res);
      });

    axios
      .get("manager/all-maintainers")
      .then((res) => {
        setMaintainers(res.data);
      })
      .catch((err) => {
        console.log(err.res);
      });
  }, []);

  const assignFix = () => {
    if (maintainer.account_id === undefined) {
      setFixType("error");
      setFixMsg("Please pick an attendant!");
      setOpenSnackBar(true);
      console.log("pick a maintainer");
    }

    const data = {
      maintainer_id: maintainer.account_id,
      breakdown_id: breakdown.bd_id,
    };

    console.log(data);
    axios
      .put("maintainer/resolve-request", data)
      .then((res) => {
        setRequest(
          requests.filter((request) => request.r_id !== inspectIssue.ride_id)
        );
        setFixMsg(`${inspectIssue.ride_name} was fixed!`);
        setOpenSnackBar(true);
        handleCloseModal();
        console.log(res.data.broken);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <Container>
        <CssBaseline />
        {loaded ? (
          <Grid container spacing={4}>
            {requests.length !== 0 ? (
              <>
                {requests.map((request) => (
                  <Grid item key={request.bd_id} md={3}>
                    <Card className={classes.card}>
                      <CardMedia
                        className={classes.cardMedia}
                        image={request.picture}
                        title="Image title"
                      />
                      <CardContent classsName={classes.cardContent}>
                        <Typography>Ride Name: {request.name}</Typography>
                      </CardContent>
                      <CardActions className={classes.buttons}>
                        <Button
                          onClick={() => {
                            setBreakdown(request);
                            handleClickOpenModalAssign();
                          }}
                          variant="contained"
                          color="primary"
                        >
                          Assign Maintainer
                        </Button>
                        <Button
                          onClick={() => handleClickOpenModal(request)}
                          variant="contained"
                          color="disabled"
                        >
                          Info
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </>
            ) : (
              <>
                <h1>
                  No Rides are currently broken <CheckCircleOutlineIcon />
                </h1>
              </>
            )}

            <Dialog open={openModal} onClose={handleCloseModal}>
              <DialogTitle>{"Breakdown Information"}</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  <strong>Breakdown Description: </strong>
                  {inspectIssue.breakdown_description}
                </DialogContentText>
                <DialogContentText>
                  <strong>Reported by Attendant: </strong>

                  {inspectIssue.attendant_name}
                </DialogContentText>
                <DialogContentText>
                  <strong>Date of Breakdown: </strong>

                  {inspectIssue.breakdown_date}
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button
                  variant="contained"
                  onClick={handleCloseModal}
                  style={{ backgroundColor: grey[400] }}
                >
                  Cancel
                </Button>
              </DialogActions>
            </Dialog>
            <Dialog
              open={openModalAssign}
              onClose={handleCloseModalAssign}
              aria-labelledby="form-dialog-title"
            >
              <DialogContent>
                <FormControl className={classes.formControl} fullWidth>
                  <InputLabel>Maintainer</InputLabel>
                  <Select
                    value={maintainer.account_id ? maintainer : ""}
                    onChange={handleChange}
                  >
                    {maintainer.account_id ? (
                      <MenuItem value={maintainer}>
                        {maintainer.first_name + " " + maintainer.last_name}
                      </MenuItem>
                    ) : null}
                    {maintainers.map((maintainer) => (
                      <MenuItem value={maintainer} key={maintainer.account_id}>
                        {/* {console.log(maintainer.account_id)} */}
                        {maintainer.first_name + " " + maintainer.last_name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => assignFix()} color="primary">
                  Confirm
                </Button>
                <Button onClick={handleCloseModalAssign} color="primary">
                  Cancel
                </Button>
              </DialogActions>
            </Dialog>
            <Snackbar
              open={openSnackbar}
              autoHideDuration={2000}
              onClose={handleCloseSnackbar}
            >
              <Alert onClose={handleCloseSnackbar} severity={fixType}>
                {fixMsg}
              </Alert>
            </Snackbar>
          </Grid>
        ) : null}
      </Container>
    </div>
  );
};

export default ManagerBreakdowns;
