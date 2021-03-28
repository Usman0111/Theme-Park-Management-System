import React from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import "./registration.css";
import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import Tab from "@material-ui/core/Tab";
import TabContext from "@material-ui/lab/TabContext";
import TabList from "@material-ui/lab/TabList";
import TabPanel from "@material-ui/lab/TabPanel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
  },
  textField: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    width: "21ch",
    fontSize: 20,
  },
}));

function Registration() {
  const classes = useStyles();

  const [v, setV] = React.useState("1");
  const [value, setValue] = React.useState("Maintainer");

  const labelChange = (event, value) => {
    setValue(event.target.value);
  };
  const handleChange = (event, newValue) => {
    setV(newValue);
  };

  return (
    <div className="registration">
      <div className="registration-title">Registration</div>
      <div className={classes.root}>
        <TabContext value={v}>
          <AppBar position="static">
            <TabList onChange={handleChange}>
              <Tab label="Employee Registration" value="1" />
              <Tab label="Customer Registration" value="2" />
            </TabList>
          </AppBar>

          <TabPanel value="2">
            <div className="registration-e">
              <Grid container spacing={2}>
                <Grid item>
                  <TextField
                    label="First Name"
                    id="filled-margin-none"
                    className={classes.textField}
                    margin="normal"
                    variant="filled"
                  />
                  <TextField
                    label="Last Name"
                    id="filled-margin-dense"
                    className={classes.textField}
                    margin="normal"
                    variant="filled"
                  />
                  <FormControl component="fieldset">
                    <FormLabel component="legend">Employee Type</FormLabel>
                    <RadioGroup
                      aria-label="Employee Type"
                      name="employee"
                      value={value}
                      onChange={labelChange}
                    >
                      <FormControlLabel
                        value="Maintainer"
                        control={<Radio />}
                        label="Maintainer"
                      />
                      <FormControlLabel
                        value="Attendant"
                        control={<Radio />}
                        label="Attendant"
                      />
                    </RadioGroup>
                  </FormControl>
                </Grid>
                <div item className="password2">
                  <Grid>
                    <TextField
                      id="filled-full-width"
                      label="Email"
                      fullWidth
                      margin="normal"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      variant="filled"
                    />
                    <TextField
                      id="filled-full-width"
                      label="Password"
                      fullWidth
                      margin="normal"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      variant="filled"
                    />
                    <TextField
                      id="filled-full-width"
                      label="Confirm Password"
                      fullWidth
                      margin="normal"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      variant="filled"
                    />
                  </Grid>
                </div>
              </Grid>
              <br />
              <Grid>
                <Button variant="outlined" type="submit">
                  Submit
                </Button>
              </Grid>
            </div>
          </TabPanel>

          <TabPanel value="1">
            <div className="registration-c">
              <Grid container spacing={2}>
                <Grid item>
                  <TextField
                    label="First Name"
                    id="filled-margin-none"
                    className={classes.textField}
                    margin="normal"
                    variant="filled"
                  />
                  <TextField
                    label="Last Name"
                    id="filled-margin-dense"
                    className={classes.textField}
                    margin="normal"
                    variant="filled"
                  />
                  <TextField
                    id="filled-margin-normal"
                    label="Age"
                    className={classes.textField}
                    margin="normal"
                    type="number"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="outlined"
                  />
                  <TextField
                    required
                    id="outlined-number"
                    margin="normal"
                    label="Height"
                    type="number"
                    className={classes.textField}
                    helperText="Feet"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="outlined"
                  />
                  <TextField
                    required
                    className={classes.textField}
                    id="outlined-number"
                    label="Height"
                    type="number"
                    helperText="Inches"
                    margin="normal"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="outlined"
                  />
                  <TextField
                    required
                    className={classes.textField}
                    id="filled-required"
                    label="Email"
                    variant="filled"
                    margin="normal"
                  />
                  <div item className="password">
                    <TextField
                      id="filled-full-width"
                      label="Password"
                      fullWidth
                      margin="normal"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      variant="filled"
                    />
                    <TextField
                      id="filled-full-width"
                      label="Confirm Password"
                      fullWidth
                      margin="normal"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      variant="filled"
                    />
                  </div>
                </Grid>
              </Grid>
              <Button variant="outlined" type="submit">
                Submit
              </Button>
            </div>
          </TabPanel>
        </TabContext>
      </div>
    </div>
  );
}

export default Registration;