import React, { useContext } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
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
import Paper from "@material-ui/core/Paper";
import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import bg from "../../assets/background.jpg";
import { CssBaseline } from "@material-ui/core";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { DataContext } from "../../contexts/dataContext";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
  },
  textField: {
    marginRight: theme.spacing(2),
    width: "21ch",
    fontSize: 20,
  },
}));

function Registration() {
  const classes = useStyles();
  const paperStyle = {
    padding: 20,
    width: 900,
  };
  const root = {
    height: "100vh",
    backgroundImage: `url(${bg})`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  };

  const title = {
    fontSize: "35px",
    justifyContent: "center",
    textAlign: "center",
    marginBottom: "10px",
  };
  const [v, setV] = useState("1");
  const [value, setValue] = useState("maintainer");

  //for error
  const [open, setOpen] = useState(false);
  const [err, setErr] = useState("");

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const [customerD, setCustomerD] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    age: "",
    height_inch: "",
    height_feet: "",
    user_type: "customer",
  });

  const [employeeD, setEmployeeD] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    user_type: "attendant",
  });

  let history = useHistory();
  const { dispatch } = useContext(DataContext);

  const customer = (e) => {
    e.preventDefault();
    const height =
      Number(customerD.height_feet) * 12 + Number(customerD.height_inch);
    const custData = {
      first_name: customerD.first_name,
      last_name: customerD.last_name,
      email: customerD.email,
      password: customerD.password,
      age: Number(customerD.age),
      height,
      user_type: "customer",
    };
    console.log(custData);
    axios
      .post("http://100.26.17.215:5000/auth/register", custData)
      .then((res) => {
        history.push("/");
        console.log(res);
        dispatch({ type: "SET_REGISTERED", payload: true });
      })
      .catch((err) => {
        setErr(err.response.data);
        console.log(err.response.data);
        setOpen(true);
      });
  };

  const employee = (e) => {
    e.preventDefault();
    console.log(e);
    axios
      .post("http://100.26.17.215:5000/auth/register", employeeD)
      .then((res) => {
        history.push("/");
        console.log(res);
        dispatch({ type: "SET_REGISTERED", payload: true });
      })
      .catch((err) => {
        console.log(err);
        setErr(err.response.data);
        console.log(err.response.data);
        setOpen(true);
      });
  };

  const labelChange = (event, value) => {
    setValue(event.target.value);
  };
  const handleChange = (event, newValue) => {
    setV(newValue);
  };

  return (
    <Paper style={root} square>
      <CssBaseline />
      <div className="registration-page">
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justify="center"
          style={{ minHeight: "100vh" }}
        >
          <Paper elevation={10} style={paperStyle}>
            <div style={title}>Registration</div>
            <div className={classes.root}>
              <TabContext value={v}>
                <AppBar position="static">
                  <TabList onChange={handleChange}>
                    <Tab label="Customer Registration" value="1" />
                    <Tab label="Employee Registration" value="2" />
                  </TabList>
                </AppBar>

                <TabPanel value="2">
                  <div className="registration-e">
                    <form onSubmit={(e) => employee(e)}>
                      <Grid container spacing={2}>
                        <Grid item>
                          <TextField
                            required
                            label="First Name"
                            id="employee-fname"
                            className={classes.textField}
                            margin="normal"
                            variant="filled"
                            onChange={(event) => {
                              setEmployeeD({
                                ...employeeD,
                                first_name: event.target.value,
                              });
                            }}
                          />
                          <TextField
                            required
                            label="Last Name"
                            id="employee-lname"
                            className={classes.textField}
                            margin="normal"
                            variant="filled"
                            onChange={(event) => {
                              setEmployeeD({
                                ...employeeD,
                                last_name: event.target.value,
                              });
                            }}
                          />
                          <FormControl
                            onChange={(event) => {
                              setEmployeeD({
                                ...employeeD,
                                user_type: event.target.value,
                              });
                            }}
                            component="fieldset"
                          >
                            <FormLabel required component="legend">
                              Employee Type
                            </FormLabel>
                            <RadioGroup
                              aria-label="Employee Type"
                              name="employee"
                              value={value}
                              onChange={labelChange}
                            >
                              <FormControlLabel
                                value="maintainer"
                                control={<Radio />}
                                label="Maintainer"
                              />
                              <FormControlLabel
                                value="attendant"
                                control={<Radio />}
                                label="Attendant"
                              />
                            </RadioGroup>
                          </FormControl>

                          <TextField
                            required
                            id="employee-email"
                            label="Email"
                            fullWidth
                            margin="normal"
                            variant="filled"
                            type="email"
                            onChange={(event) => {
                              setEmployeeD({
                                ...employeeD,
                                email: event.target.value,
                              });
                            }}
                          />
                          <TextField
                            required
                            id="employee-password"
                            label="Password"
                            fullWidth
                            margin="normal"
                            variant="filled"
                            type="password"
                            onChange={(event) => {
                              setEmployeeD({
                                ...employeeD,
                                password: event.target.value,
                              });
                            }}
                          />
                          <TextField
                            required
                            id="employee-cpassword"
                            label="Confirm Password"
                            fullWidth
                            margin="normal"
                            variant="filled"
                            type="password"
                          />
                        </Grid>
                        <br />
                        <Grid>
                          <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                          >
                            Submit
                          </Button>
                        </Grid>
                      </Grid>
                    </form>
                  </div>
                </TabPanel>

                <TabPanel value="1">
                  <div className="registration-c">
                    <form onSubmit={(e) => customer(e)}>
                      <Grid container spacing={2}>
                        <Grid item>
                          <TextField
                            required
                            label="First Name"
                            id="customer-fname"
                            className={classes.textField}
                            margin="normal"
                            variant="filled"
                            onChange={(event) => {
                              setCustomerD({
                                ...customerD,
                                first_name: event.target.value,
                              });
                            }}
                          />
                          <TextField
                            required
                            label="Last Name"
                            id="customer-lname"
                            className={classes.textField}
                            margin="normal"
                            variant="filled"
                            onChange={(event) => {
                              setCustomerD({
                                ...customerD,
                                last_name: event.target.value,
                              });
                            }}
                          />
                          <TextField
                            required
                            variant="filled"
                            id="customer-age"
                            label="Age"
                            className={classes.textField}
                            margin="normal"
                            type="number"
                            InputLabelProps={{
                              shrink: true,
                            }}
                            onChange={(event) => {
                              setCustomerD({
                                ...customerD,
                                age: event.target.value,
                              });
                            }}
                          />
                          <TextField
                            required
                            id="customer-hfeet"
                            margin="normal"
                            label="Height"
                            type="number"
                            className={classes.textField}
                            helperText="Feet"
                            InputLabelProps={{
                              shrink: true,
                            }}
                            variant="filled"
                            onChange={(event) => {
                              setCustomerD({
                                ...customerD,
                                height_feet: event.target.value,
                              });
                            }}
                          />
                          <TextField
                            required
                            className={classes.textField}
                            id="customer-hinches"
                            label="Height"
                            type="number"
                            helperText="Inches"
                            margin="normal"
                            variant="filled"
                            InputLabelProps={{
                              shrink: true,
                            }}
                            onChange={(event) => {
                              setCustomerD({
                                ...customerD,
                                height_inch: event.target.value,
                              });
                            }}
                          />
                          <TextField
                            required
                            className={classes.textField}
                            id="customer-email"
                            label="Email"
                            variant="filled"
                            margin="normal"
                            type="email"
                            onChange={(event) => {
                              setCustomerD({
                                ...customerD,
                                email: event.target.value,
                              });
                            }}
                          />
                          <div item className="password">
                            <TextField
                              required
                              type="password"
                              id="filled-full-width"
                              label="Password"
                              fullWidth
                              margin="normal"
                              variant="filled"
                              onChange={(event) => {
                                setCustomerD({
                                  ...customerD,
                                  password: event.target.value,
                                });
                              }}
                            />
                            <TextField
                              type="password"
                              required
                              id="filled-full-width"
                              label="Confirm Password"
                              fullWidth
                              margin="normal"
                              variant="filled"
                            />
                          </div>
                        </Grid>
                      </Grid>
                      <br />
                      <Button variant="contained" type="submit" color="primary">
                        Submit
                      </Button>
                    </form>
                  </div>
                </TabPanel>
              </TabContext>
            </div>
          </Paper>
          <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
            <Alert severity="error" style={{ marginTop: "10px" }}>
              {err}
            </Alert>
          </Snackbar>
        </Grid>
      </div>
    </Paper>
  );
}

export default Registration;
