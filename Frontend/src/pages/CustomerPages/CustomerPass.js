import React  from "react";
import Button from "@material-ui/core/Button";
import axios from "axios";
import { useState } from "react";
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Box from '@material-ui/core/Box';
import { useHistory } from "react-router-dom";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
  card: {
    display: 'flex',
    maxWidth: 560,
    backgroundColor: '#1c2e4a',
  },
  pos: {
    marginBottom: 12,
  },
  id:{
    fontSize: 11,
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 200,
  },
}));


function CustomerPass(props){
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [err, setErr] = useState("");

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  let history = useHistory();

  var i = 0;
  var info = []
  var entryPassId = []
  var timePurchased = []
  var datePurchased = []
  var ticketStatus = []
  var arr =[]

 
  const [tickets, setTickets] = useState([])
  

  const buy_ticket= (e) => {
    e.preventDefault();
    console.log(e);
    axios
    .post("http://100.26.17.215:5000/customer/purchase-pass", {user_id: localStorage.getItem("user_id")})
    .then((res) => {
      alert("You have successfully purchased a ticket! To view current and previous tickets please click on 'View All Tickets'")
      console.log(res);
    })
    .catch((err)=> {
      setErr(err.res.data);
      console.log(err.res.data);
      setOpen(true);
    })
  };

 
  
  
  const view_ticket = (e) => {
    e.preventDefault();
    console.log(e);
    axios
    .post("http://100.26.17.215:5000/customer/get-all-pass", {user_id: localStorage.getItem("user_id")})
    .then((res) => {
      console.log(res.data)
      setTickets(res.data)
      /*
      while(i < res.data.length){
        setEntryPassId(res.data[i].entrypass_id);
        setTimePurchased(res.data[i].time_purchased.substring(14, 23));
        setDatePurchased(res.data[i].time_purchased.substring(0, 10))
        if(res.data[i].expired === false){
          setStatus("Valid")
        }
        else{
          setStatus("Expired")
        } 
         
        i++
      }*/
      
      /*
      while(i < res.data.length){
        info[i] = res.data[i]
        entryPassId[i] = res.data[i].entrypass_id
        timePurchased[i] = res.data[i].time_purchased.substring(14, 23)
        datePurchased[i] = res.data[i].time_purchased.substring(0, 10)
        if(res.data[i].expired === false){
          ticketStatus[i] = ("Valid")
        }
        else{
          ticketStatus[i] = ("Expired")
        } 
        
        i++
      }*/
      //return info;
    })   
    .catch((err)=> {
      setErr(err.res.data);
      console.log(err.res.data);
      setOpen(true);
    })
  }; 
//info = view_ticket;
  
    
  return (

  <div>
    <form onSubmit={(e) => buy_ticket(e)}>
      <div>
        <Button
        variant="contained"
        color="primary"
        type="submit">
          Purchase Ticket
        </Button>
      </div>
    </form>
    <br>
    </br>
    <form onSubmit={(e) => view_ticket(e)}>
      <div>
        <Button
        variant="contained"
        color="primary"
        type="submit">
          View All Tickets
        </Button>
      </div>
      </form>
    <br>
    </br>
    <div>
      {tickets.map(ticket => 
        <div>
          {ticket.time_purchased}
        </div>
      )}
    </div>
    
    <div  onSubmit={(e) => view_ticket(e)} >
    <Card className={classes.card}>
        <CardContent className={classes.content}>
          <Box color="#FFFFFF">
          <Typography variant="h5" component="h2" align="center">
            Day Entry Pass
          </Typography>
          <Typography className={classes.pos}>
            Date Purchased: {}
          </Typography>
          <Typography className={classes.pos}>
            Time Purchased: {}
          </Typography>
          <Typography className={classes.pos} >
            Status: {}
          </Typography>
          <Typography className={classes.id}>
            Ticket ID: {}
          </Typography>
          </Box> 
         </CardContent>
         <CardMedia
           className={classes.cover}
           image="https://media.beam.usnews.com/de/2248f0a712a4c92fa641b0dd037bb7/media:01216eb80ba74e33b55f2ebe4d36faceTheme_Parks-Slow_Reopening_73567.jpg"
         />
         </Card>
    </div>
    <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
      <Alert severity="error" style={{ marginTop: "10px" }}>
        {err}
      </Alert>
    </Snackbar>
  </div>
  
  );
};

export default CustomerPass;
