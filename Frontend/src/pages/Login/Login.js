import React, { useState } from "react";
import {
  Avatar,
  Grid,
  Link,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { CssBaseline } from "@material-ui/core";
import bg from "../../assets/background.jpg";

const Login = () => {
  const paperStyle = {
    padding: 20,
    width: 280,
  };
  const avatarStyle = { backgroundColor: "#3f50b5" };
  const boxStyle = { margin: "5px 0", fontSize: 34 };
  const btnStyle = { fontSize: 15, margin: "10px 0" };
  const root = {
    height: "100vh",
    backgroundImage: `url(${bg})`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  };

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
    <Paper style={root} square>
      <CssBaseline />
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: "100vh" }}
      >
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
    </Paper>
  );
};

export default Login;
