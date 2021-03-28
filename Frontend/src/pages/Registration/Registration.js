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
import Paper from "@material-ui/core/Paper";
import axios from "axios";
import {useState} from "react";
import { useHistory } from "react-router-dom";



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
  const paperStyle={ padding: 20,height: '70vh',width: 900, margin: '50px auto'};
  const [v, setV] = useState('1');
  const [value, setValue] = useState('maintainer');


 

  const [customerD, setCustomerD] = useState({
    first_name:"",
    last_name:"",
    email:"",
    password:"",
    age:"",
    height_inch: "",
    height_feet:"",
    user_type:"customer"
  })

  const [employeeD, setEmployeeD] = useState({
    first_name:"",
    last_name:"",
    email:"",
    password:"",
    user_type:"attendant"
  })

  let history = useHistory();

  const customer = () => {
    const height = Number(customerD.height_feet)*12 + Number(customerD.height_inch)
    const custData = {
    first_name: customerD.first_name,
    last_name:customerD.last_name,
    email:customerD.email,
    password:customerD.password,
    age:Number(customerD.age),
    height,
    user_type:"customer"}
    console.log(custData);
    axios.post("http://100.26.17.215:5000/auth/register",custData).then((res)=>{
      history.push("/login");
    console.log(res)})
    .catch((err) => {
      console.log(err);
    });
  };

  const employee = () => {
    axios.post("http://100.26.17.215:5000/auth/register", employeeD).then((res)=>{
    history.push("/login");  
    console.log(res)})
    .catch((err) => {
      console.log(err);
    });
  };



  const labelChange = (event,value) => {
    setValue(event.target.value); 

  const [v, setV] = React.useState("1");
  const [value, setValue] = React.useState("Maintainer");

  const labelChange = (event, value) => {
    setValue(event.target.value);

  };
  const handleChange = (event, newValue) => {
    setV(newValue);
  };



  return (
    <div className="registration-page">
      <Grid>
          <Paper elevation={10} style={paperStyle}>
          <div  className="registration-title">
        Registration
      </div>
  return (
    <div className="registration">
      <div className="registration-title">Registration</div>

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
              <Grid container spacing={2}>
              <Grid item>
              <TextField
                required
                label="First Name"
                id="employee-fname"
                className={classes.textField}
                margin="normal"
                variant="filled"
                onChange ={(event) => {
                  setEmployeeD({...employeeD, first_name:event.target.value})
                }}
              />
              <TextField
                required
                label="Last Name"
                id="employee-lname"
                className={classes.textField}
                margin="normal"
                variant="filled"
                onChange ={(event) => {
                  setEmployeeD({...employeeD, last_name:event.target.value})
                }}
              />
              <FormControl onChange ={(event) => {
                  setEmployeeD({...employeeD, user_type:event.target.value})
                }}
                component="fieldset">
              <FormLabel required component="legend">
                Employee Type
              </FormLabel>
                <RadioGroup aria-label="Employee Type" name="employee" value={value} onChange={labelChange}>
                  <FormControlLabel value="maintainer" control={<Radio />} label="Maintainer" />
                  <FormControlLabel value="attendant" control={<Radio />} label="Attendant" />
                  
                </RadioGroup>
              </FormControl>

              <TextField 
                required
                id="employee-email"
                label="Email"
                fullWidth
                margin="normal"
                variant="filled"
                onChange ={(event) => {
                  setEmployeeD({...employeeD, email:event.target.value})
                }}
                />
              <TextField
                required
                id="employee-password"
                label="Password"
                fullWidth
                margin="normal"
                variant="filled"
                onChange ={(event) => {
                  setEmployeeD({...employeeD, password:event.target.value})
                }}
              />
              <TextField
                required
                id="employee-cpassword"
                label="Confirm Password"
                fullWidth
                margin="normal"
                variant="filled"
              />
              </Grid>
              </Grid>
              <br/>
              <Grid>
              <Button 
                variant="outlined" 
                type="submit"
                onClick = {employee}
                >
                Submit
              </Button>

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
                required
                label="First Name"
                id="customer-fname"
                className={classes.textField}
                margin="normal"
                variant="filled"
                onChange ={(event) => {
                  setCustomerD({...customerD, first_name:event.target.value})
                }}
              />
              <TextField
                required
                label="Last Name"
                id="customer-lname"
                className={classes.textField}
                margin="normal"
                variant="filled"
                onChange ={(event) => {
                  setCustomerD({...customerD, last_name:event.target.value})
                }}
              />
              <TextField
                required
                id="customer-age"
                label="Age"
                className={classes.textField}
                margin="normal"
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                onChange ={(event) => {
                  setCustomerD({...customerD, age:event.target.value})
                }}
                />
              <TextField 
                required
                id="customer-hfeet"
                margin="normal"
                label ="Height"
                type="number"
                className={classes.textField}
                helperText="Feet"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                
                onChange ={(event) => {
                  setCustomerD({...customerD, height_feet:event.target.value})
                }}/> 
              <TextField 
                required
                className={classes.textField}
                id="customer-hinches"
                label ="Height"
                type="number"
                helperText="Inches"
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                onChange ={(event) => {
                  setCustomerD({...customerD, height_inch:event.target.value})
                }}
                />
              <TextField 
                required
                className={classes.textField}
                id="customer-email"
                label="Email"
                variant="filled" 
                margin="normal"
                onChange ={(event) => {
                  setCustomerD({...customerD, email:event.target.value})
                }}
                />
              <div item className="password">
              
              <TextField
                required
                id="filled-full-width"
                label="Password"
                fullWidth
                margin="normal"
                variant="filled"
                onChange ={(event) => {
                  setCustomerD({...customerD, password:event.target.value})
                }}
              />
              <TextField
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
              <br/>
              <Button 
                variant="outlined" 
                type="submit"
                onClick = {customer}
                >
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
          </Paper>
        </Grid>
      
    </div>
  );
}

export default Registration;
