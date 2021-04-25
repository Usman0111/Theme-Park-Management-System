import React from "react";
import Grid from "@material-ui/core/Grid";

import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    width: "100%",
    maxWidth: 1000,
  },
});

const NothingMessage = (props) => {
  const classes = useStyles();

  return (
    <div>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        style={{ marginTop: 100 }}
      >
        <Grid item xs={12}>
          <div>{props.icon ? props.icon : null}</div>
        </Grid>
        <Grid item xs={12}>
          <div className={classes.root}>
            <Typography variant="h4" gutterBottom>
              {props.message}
            </Typography>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default NothingMessage;
