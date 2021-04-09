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

export default function CustomerAttractions() {
  const classes = useStyles();
  const [attractions, setAttractions] = useState([]);

  useEffect(() => {
    axios
      .get("attraction/all")
      .then((res) => {
        setAttractions(res.data);
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

  const visit = (attraction_id) => {
    const data = {
      attraction_id,
      customer_id: Number(localStorage.getItem("user_id")),
    };
    console.log(attraction_id);
    axios
      .post("attraction/visit", data)
      .then((res) => {
        handleClick();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  console.log(attractions);

  return (
    <Container className={classes.cardGrid}>
      <CssBaseline />
      <Grid container spacing={4}>
        {attractions.map((attraction) => (
          <Grid item key={attraction.attraction_id} md={3}>
            <Card className={classes.card}>
              <CardMedia
                className={classes.cardMedia}
                image={attraction.picture}
                title="Image title"
              />
              <CardContent className={classes.cardContent}>
                <Typography variant="h5">{attraction.name}</Typography>
              </CardContent>
              <CardActions className={classes.buttons}>
                <Button
                  color="primary"
                  variant="contained"
                  onClick={() => visit(attraction.attraction_id)}
                >
                  Visit!
                </Button>
                <Tooltip
                  title={
                    <React.Fragment>
                      <Typography color="inherit" variant="subtitle1">
                        Description
                      </Typography>
                      <div className={classes.paragraph}>
                        {attraction.description}
                      </div>
                      <Typography color="inherit" variant="subtitle1">
                        Age Restriciton
                      </Typography>
                      <div className={classes.paragraph}>
                        {attraction.age_restriction
                          ? attraction.age_restriction
                          : "None"}
                      </div>
                      {/* <Typography color="inherit" variant="subtitle1">
                        Height Resctriction
                      </Typography>
                      <div className={classes.paragraph}>
                        {attraction.height_restriction
                          ? attraction.height_restriction
                          : "None"}
                      </div> */}
                    </React.Fragment>
                  }
                >
                  <Button variant="contained">Info</Button>
                </Tooltip>
              </CardActions>
            </Card>
          </Grid>
        ))}
        <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success">
            Whaaa! having fun at the attraction
          </Alert>
        </Snackbar>
      </Grid>
    </Container>
  );
}
