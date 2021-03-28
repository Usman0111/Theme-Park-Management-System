import React, { useState } from "react";
import {
  Avatar,
  Checkbox,
  FormControl,
  Grid,
  Link,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Button from "@material-ui/core/Button";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import "./Login.css";
import { useHistory } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const paperStyle = {
    padding: 20,
    height: "55vh",
    width: 280,
    margin: "50px auto",
  };
  const avatarStyle = { backgroundColor: "#00FFFF" };
  const boxStyle = { margin: "5px 0", fontSize: 34 };
  const btnStyle = { fontSize: 15, margin: "10px 0" };

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  let history = useHistory();

  const login = () => {
    console.log(loginData);

    axios
      .post("http://100.26.17.215:5000/auth/login", loginData)
      .then((res) => {
        console.log(res);
        history.push("/dashbaord");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Grid>
      <Paper elevation={10} style={paperStyle}>
        <Grid align="center">
          <Avatar style={avatarStyle}>
            <LockOutlinedIcon />
          </Avatar>
          <h2>Sign in</h2>
        </Grid>
        <TextField
          label="Enter Email"
          variant="filled"
          placeholder={"Email"}
          fullWidth
          style={boxStyle}
          required
          onChange={(event) => {
            setLoginData({ ...loginData, email: event.target.value });
          }}
        />
        <TextField
          type="password"
          label="Enter Password"
          variant="filled"
          placeholder={"Password"}
          fullWidth
          required
          style={boxStyle}
          onChange={(event) => {
            setLoginData({ ...loginData, password: event.target.value });
          }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          style={btnStyle}
          onClick={login}
        >
          Sign In
        </Button>
        <Typography>Dont have an account?</Typography>
        <Link>Register Here</Link>
      </Paper>
    </Grid>
  );
};

export default Login;
