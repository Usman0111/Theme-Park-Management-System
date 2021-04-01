import React, { useState, useContext } from "react";
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
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { DataContext } from "../../contexts/dataContext";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

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
  //for register success
  const { data, dispatch } = useContext(DataContext);

  const handleCloseReg = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    dispatch({ type: "SET_REGISTERED", payload: false });
  };

  //for error
  const [openErr, setOpenErr] = useState(false);
  const [err, setErr] = useState("");

  const handleCloseErr = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenErr(false);
  };

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  let history = useHistory();

  const login = (e) => {
    e.preventDefault();

    axios
      .post("http://100.26.17.215:5000/auth/login", loginData)
      .then((res) => {
        console.log(res);
        history.push("/dashbaord");
      })
      .catch((err) => {
        setErr(err.response.data);
        console.log(err.response.data);
        setOpenErr(true);
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
          <form onSubmit={(e) => login(e)}>
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
            >
              Sign In
            </Button>
          </form>
          <Typography>Dont have an account?</Typography>
          <Link href="/register">Register Here</Link>
        </Paper>
        <Snackbar
          open={openErr}
          autoHideDuration={4000}
          onClose={handleCloseErr}
        >
          <Alert severity="error" style={{ marginTop: "10px" }}>
            {err}
          </Alert>
        </Snackbar>
        <Snackbar
          open={data.registered}
          autoHideDuration={4000}
          onClose={handleCloseReg}
        >
          <Alert severity="success" style={{ marginTop: "10px" }}>
            Your account was successfully created!
          </Alert>
        </Snackbar>
      </Grid>
    </Paper>
  );
};

export default Login;
