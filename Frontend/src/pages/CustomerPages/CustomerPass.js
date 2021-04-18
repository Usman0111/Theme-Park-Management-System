import React, { useEffect } from "react";
import Button from "@material-ui/core/Button";
import axios from "axios";
import { useState } from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Box from "@material-ui/core/Box";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import Grid from "@material-ui/core/Grid";
import grey from "@material-ui/core/colors/grey";

const useStyles = makeStyles((theme) => ({
  card: {
    display: "flex",
    maxWidth: 560,
    backgroundColor: "#1c2e4a",
  },
  pos: {
    marginBottom: 12,
  },
  id: {
    fontSize: 11,
  },
  content: {
    flex: "1 0 auto",
  },
  cover: {
    width: 200,
  },
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const createPass = (pass) => {
  const indexT = pass.time_purchased.indexOf("T");
  const indexDot = pass.time_purchased.indexOf(".");
  const indexZ = pass.time_purchased.indexOf("Z");
  return {
    date: pass.time_purchased.slice(0, indexT),
    time: pass.time_purchased.slice(indexT + 1, indexDot),
    ticketId:
      String(pass.customer_id) +
      String(pass.entrypass_id) +
      String(pass.time_purchased.slice(indexDot + 1, indexZ)),
    expired: pass.expired,
  };
};

function CustomerPass(props) {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [err, setErr] = useState("");

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const [tickets, setTickets] = useState([]);

  const buy_ticket = (e) => {
    e.preventDefault();
    axios
      .post("http://100.26.17.215:5000/customer/purchase-pass", {
        user_id: localStorage.getItem("user_id"),
      })
      .then((res) => {
        if (res.data === "you already have a valid pass") {
          setErr(res.data);
          setOpen(true);
        } else {
          const newpass = createPass(res.data);
          const fixpass = { ...newpass, expired: false };
          setTickets([...tickets, fixpass]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    axios
      .post("http://100.26.17.215:5000/customer/get-all-pass", {
        user_id: localStorage.getItem("user_id"),
      })
      .then((res) => {
        const passes = res.data.map((pass) => createPass(pass));
        setTickets(passes);
      })
      .catch((err) => {
        console.log(err.res);
      });
  }, []);

  return (
    <div>
      <form onSubmit={(e) => buy_ticket(e)}>
        <div>
          <Button variant="contained" color="primary" type="submit">
            Purchase Entry Pass
          </Button>
        </div>
      </form>
      <br></br>

      <Grid container spacing={3}>
        {tickets.map((ticket) => (
          <Grid item xs={6}>
            <Card className={classes.card}>
              <CardContent className={classes.content}>
                <Box color="#FFFFFF">
                  <Typography variant="h5" component="h2" align="center">
                    Day Entry Pass
                  </Typography>
                  <Typography className={classes.pos}>
                    <span style={{ color: grey[400] }}>Date Purchased:</span>{" "}
                    {ticket.date}
                  </Typography>
                  <Typography className={classes.pos}>
                    <span style={{ color: grey[400] }}>Time Purchased:</span>{" "}
                    {ticket.time}
                  </Typography>
                  <Typography className={classes.pos}>
                    <span style={{ color: grey[400] }}>Status:</span>{" "}
                    {ticket.expired ? (
                      <span style={{ color: "red" }}>expired</span>
                    ) : (
                      <span style={{ color: "green" }}>valid</span>
                    )}
                  </Typography>
                  <Typography className={classes.id}>
                    <span style={{ color: grey[400] }}>Pass ID:</span>{" "}
                    {ticket.ticketId}
                  </Typography>
                </Box>
              </CardContent>
              <CardMedia
                className={classes.cover}
                image="https://media.beam.usnews.com/de/2248f0a712a4c92fa641b0dd037bb7/media:01216eb80ba74e33b55f2ebe4d36faceTheme_Parks-Slow_Reopening_73567.jpg"
              />
            </Card>
          </Grid>
        ))}
      </Grid>

      <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          {err}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default CustomerPass;
