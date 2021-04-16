import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import axios from "axios";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import BrokenImageIcon from "@material-ui/icons/BrokenImage";
import OpacityIcon from "@material-ui/icons/Opacity";
import { useRouteMatch, Link } from "react-router-dom";
import RestoreFromTrashIcon from "@material-ui/icons/RestoreFromTrash";
import DeleteIcon from "@material-ui/icons/Delete";

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
  paragraph: {
    fontSize: 12,
  },
}));

export default function ManagerRides() {
  const classes = useStyles();
  const [rides, setRides] = useState([]);
  let { url, path } = useRouteMatch();

  useEffect(() => {
    axios
      .get("ride/all")
      .then((res) => {
        setRides(res.data);
        // console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const assign = () => {};

  const reassign = () => {};

  console.log(rides);

  return (
    <Container className={classes.cardGrid}>
      <CssBaseline />
      <Grid container spacing={4}>
        {rides.map((ride) => (
          <Grid item key={ride.ride_id} md={3}>
            <Card className={classes.card}>
              <CardMedia
                className={classes.cardMedia}
                image={ride.picture}
                title="Image title"
              />
              <CardContent className={classes.cardContent}>
                <Typography variant="h5">
                  {ride.name}
                  {ride.broken ? (
                    <Tooltip title="broken">
                      <BrokenImageIcon color="disabled" />
                    </Tooltip>
                  ) : null}
                  {ride.rainedout ? (
                    <Tooltip title="rained out">
                      <OpacityIcon color="disabled" />
                    </Tooltip>
                  ) : null}
                </Typography>
              </CardContent>
              <CardActions className={classes.buttons}>
                {ride.attendant_id ? (
                  <Button
                    color="primary"
                    variant="contained"
                    onClick={() => assign(ride.ride_id)}
                  >
                    Reassign
                  </Button>
                ) : (
                  <Button
                    color="primary"
                    variant="contained"
                    onClick={() => reassign(ride.ride_id)}
                  >
                    assign
                  </Button>
                )}
                <Link
                  to={`${url}/info-ride/${ride.ride_id}`}
                  style={{ textDecoration: "none" }}
                >
                  <Button variant="contained" style={{ paddingLeft: 13 }}>
                    Info
                  </Button>
                </Link>

                <Button variant="contained">archive</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
        <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success">
            Wheee! enjoying the fun ride
          </Alert>
        </Snackbar>
      </Grid>
    </Container>
  );
}
