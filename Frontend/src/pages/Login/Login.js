import React from "react";
import {Avatar, Checkbox, FormControl, Grid, Link, Paper, TextField, Typography} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined"
import Button from "@material-ui/core/Button";
import FormControlLabel from '@material-ui/core/FormControlLabel'
import "./Login.css";

const Login = () => {
  const paperStyle={ padding: 20,height: '55vh',width: 280, margin: '50px auto'}
  const avatarStyle={backgroundColor: '#00FFFF' };
  const boxStyle={margin: '5px 0', fontSize: 34}
  const btnStyle={fontSize: 15, margin: '10px 0'}
  return (
        <Grid>
          <Paper elevation={10} style={paperStyle}>
            <Grid align='center'>
              <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar>
              <h2>Sign in</h2>
            </Grid>
            <TextField className="username" label="Enter Username" variant="filled" placeholder={"Username"} fullWidth style={boxStyle}/>
            <TextField type='password' label="Enter Password" variant="filled" placeholder={"Password"} fullWidth style={boxStyle}/>
            <TextField label="Enter Email" variant="filled" placeholder={"Email"} fullWidth style={boxStyle}/>
            <FormControlLabel
              control={<Checkbox name="Check" color="primary"/>}
              label={"I am an Admin"}/>
            <Button type='submit' variant='contained' color='primary' fullWidth style={btnStyle}>Sign In</Button>
            <Typography>Dont have an account?</Typography>
            <Link>Register Here</Link>
          </Paper>
        </Grid>
  )
}

export default Login;