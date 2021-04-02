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

export default function ManagerAttractions() {
  const classes = useStyles();

  return (
    <Container className={classes.cardGrid}>
      <CssBaseline />
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
                <Button variant="contained">Edit</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
