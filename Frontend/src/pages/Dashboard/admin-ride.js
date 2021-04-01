import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';


const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
}));

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export default function CustomerDashboardRide() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <Typography variant="h2" color="inherit" noWrap>
            Theme Park Dashboard: Rides
          </Typography>
        </Toolbar>
        <Toolbar>
          <Button style={{fontSize: '20px'}}>
              Entry Pass
          </Button>
          <Button style={{fontSize: '20px'}}>
              Rides
          </Button>
          <Button style={{fontSize: '20px'}}>
              Attractions
          </Button>
        </Toolbar>
      </AppBar>
      <main>
        <Container className={classes.cardGrid} maxWidth="md">
          <Grid container spacing={4}>
            {cards.map((card) => (
              <Grid item key={card} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image="https://media.beam.usnews.com/de/2248f0a712a4c92fa641b0dd037bb7/media:01216eb80ba74e33b55f2ebe4d36faceTheme_Parks-Slow_Reopening_73567.jpg"
                    title="Image title"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h4" component="h2">
                      Ride name
                    </Typography>
                    <Typography>
                      Ride description
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" color="primary" style={{fontSize: '20px'}}>
                      Modify
                    </Button>
                    <Button size="small" color="primary" style={{fontSize: '20px'}}>
                      File Maintenance Report
                    </Button>  
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
    </React.Fragment>
  );
}
