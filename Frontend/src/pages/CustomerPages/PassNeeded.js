import React from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    marginTop: "20px",
  },
  msg: {
    marginTop: "10px",
  },
});

const PassNeeded = (props) => {
  const classes = useStyles();
  const { type } = props;

  return (
    <div className={classes.root}>
      <Button variant="contained" color="Primary" href="/dashboard">
        Go to pass page
      </Button>
      <div className={classes.msg}>
        <Typography variant="h6">
          Valid entry pass needed to view {type}
        </Typography>
      </div>
    </div>
  );
};

export default PassNeeded;
