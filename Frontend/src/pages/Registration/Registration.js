import React from 'react';
import Grid from "@material-ui/core/Grid";
import { makeStyles} from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import "./registration.css";
import Button from "@material-ui/core/Button";


const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
      padding: '0 30px',
    },
  },
}));

function Registration() {
  const classes = useStyles();
  return (
    <div className="registration_pg">
      <div className="registration_pg-header1">
      </div>

    <div className="registration_pg-main">
    <br/>
      <div className="registration_pg-title">
        Registration
      </div>
      <br/>
      <Grid container direction={"column"} spacing={5}>
      <Grid item>
      <TextField 
        required
        id="Normal"
        label="First Name"
        variant="filled"
        />
      </Grid>

      <Grid item>
        <TextField 
        required

        id="filled-required"
        label="Last Name"
        variant="filled" />
      </Grid>

      <Grid item>
      <TextField 
        required
        id="outlined-number"
        label ="Height"
        type="number"
        helperText="Feet"
        InputLabelProps={{
          shrink: true,
        }}
        variant="outlined"
        style={{ margin: 10 }}/>
      <br/>
      <TextField 
        required
        id="outlined-number"
        label =""
        type="number"
        helperText="Inches"
        variant="outlined"/>
      </Grid>

      <Grid item>    
      <TextField 
        required
        id="outlined-number"
        label="Age"
        type="number"
        InputLabelProps={{
          shrink: true,
        }}
        variant="outlined"
        style={{ margin: 10 }}/>
      </Grid>

      <Grid item>
      <TextField 
        required
        id="filled-required"
        label="Email"
        variant="filled" 
        />
      </Grid>
      
      <Grid item>
      <TextField 
        required
        id="filled-required"
        label="Password"
        variant="filled"/>
      </Grid>
      </Grid>
      <br/>
      <Button 
      variant="outlined" >
      
        Submit
      </Button>
    
    </div>

    </div>
  );
}

export default Registration;

