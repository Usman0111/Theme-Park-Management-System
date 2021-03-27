import React from "react";
import {Avatar, CardMedia, Checkbox, FormControl, Grid, Link, Paper, TextField, Typography} from "@material-ui/core";
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';

const headerStyle={fontSize: 25, margin: '5px 0', color: 'white', fontWeight: 'bold'}
const paperStyle={padding: 10, margin: '10px auto',backgroundColor: '#000D'}
const menuStyle={padding: 5,backgroundColor: '#FFFD',width: '20vh',height: '72vh', margin: '0 5px', borderRadius: '5px'}
const optionStyle={fontSize: 20, fontFamily: "sans-serif", fontWeight: 'bold', backgroundColor:'#EEEF',borderColor:'#FFFF', margin: '3px'}
const mainPageHeaderFontStyle={fontSize: 20, color: '555F', fontWeight: 'bold'}
const mainPageStyle={height:'73vh',backgroundColor: '#FFFE', fontWeight: 'bold'}
const mainPageTextStyle={fontSize: 15, margin: '0 10px', fontWeight: 'bold'}
//const { classes } = this.props;
const Home = () => {
  return(

      <Grid>
        <Paper elevation={10} style={paperStyle} align='Center'>
          <Typography style={headerStyle}>Welcome To The Greatest Theme Park On Earth!</Typography>
        </Paper>

          <Grid container spacing={24}>
              <MenuList style={menuStyle}>
                  <MenuItem style={optionStyle}>Login</MenuItem>
                  <MenuItem style={optionStyle}>Register</MenuItem>
                  <MenuItem style={optionStyle}>About</MenuItem>
                  <MenuItem style={optionStyle}>Contact Us</MenuItem>
                  <MenuItem style={optionStyle}>Support</MenuItem>
              </MenuList>
              <Grid item xs={10}>
                  <Paper style={mainPageStyle}>
                      <Typography style={mainPageHeaderFontStyle} align='Center'>Come Join Us</Typography>
                      <Typography style={mainPageTextStyle}>We have the best rides in town</Typography>
                      <Typography style={mainPageTextStyle}>Come experience the country's largest, most thrilling theme park filled with dozens of exicting rides, shows and attraction. Now open!</Typography>
                      <Typography style={mainPageTextStyle}>-Give me suggestions or images to put down here I cant think of more-</Typography>


                  </Paper>

              </Grid>


        </Grid>
      </Grid>

  )
};

export default Home;
