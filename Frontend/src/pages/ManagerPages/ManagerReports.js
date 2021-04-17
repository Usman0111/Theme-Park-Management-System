import React, { useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { Button } from "@material-ui/core";
import ManagerChart from "./ManagerChart";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 150,
    maxWidth: 150,
    textAlign: "left",
  },
}));

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Gingerbread", 356, 16.0, 49, 3.9),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

export default function AdminReport() {
  const classes = useStyles();
  //menu
  const [reportType, setReportType] = useState("");
  const [Calculate, setCalculate] = useState("");
  const [show, setShow] = useState(""); // one or all
  const [type, setType] = useState(""); //ride or attraction query
  const [rides, setRides] = useState([]);
  const [attractions, setAttractions] = useState([]);

  //report

  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <div>
            <Button color="primary" variant="contained" size="medium">
              Generate Report
            </Button>
            {/* <Button
              color="primary"
              variant="contained"
              style={{ marginLeft: "10px" }}
              size="medium"
            >
              Download Excel
            </Button> */}
          </div>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <FormControl className={classes.formControl}>
              <InputLabel>Report Type</InputLabel>
              <Select
                value={reportType}
                onChange={(event) => setReportType(event.target.value)}
              >
                <MenuItem value={"visits"}>Visits</MenuItem>
                <MenuItem value={"usage"}>Usage</MenuItem>
                <MenuItem value={"breakdowns"}>Breakdowns</MenuItem>
                <MenuItem value={"rainouts"}>Rainouts</MenuItem>
              </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
              <TextField
                id="start_date"
                label="Start date"
                type="date"
                defaultValue="2017-05-24"
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </FormControl>
            <FormControl className={classes.formControl}>
              <TextField
                id="end_date"
                label="End date"
                type="date"
                defaultValue="2017-05-24"
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </FormControl>

            <FormControl className={classes.formControl}>
              <InputLabel>Calculate</InputLabel>
              <Select
                value={Calculate}
                defaultValue={1}
                onChange={(event) => setCalculate(event.target.value)}
              >
                <MenuItem value={"daily total"}>Daily Total</MenuItem>
                <MenuItem value={"monthly total"}>Monthly Total</MenuItem>
                <MenuItem value={"daily average by month"}>
                  Daily Average by Month
                </MenuItem>
                <MenuItem value={"daily maximum by month"}>
                  Daily Maximum by Month
                </MenuItem>
                <MenuItem value={"daily minimum by month"}>
                  Daily Minimum by Month
                </MenuItem>
              </Select>
            </FormControl>

            <FormControl className={classes.formControl}>
              <InputLabel>Show</InputLabel>
              <Select
                value={show}
                onChange={(event) => setShow(event.target.value)}
              >
                <MenuItem value={"one"}>One</MenuItem>
                <MenuItem value={"all"}>All</MenuItem>
              </Select>
            </FormControl>

            <FormControl className={classes.formControl}>
              <InputLabel>Type</InputLabel>
              <Select
                value={type}
                onChange={(event) => setType(event.target.value)}
              >
                <MenuItem value={"ride"}>Ride</MenuItem>
                <MenuItem value={"attraction"}>Attraction</MenuItem>
              </Select>
            </FormControl>
            {/* <FormControl className={classes.formControl}>
              <InputLabel>Name</InputLabel>
              <Select
                value={TimeType}
                defaultValue={1}
                onChange={handleReportTimeChange}
              >
                <MenuItem value={1}>Roler Coaster</MenuItem>
                <MenuItem value={2}>Water Ride</MenuItem>
              </Select>
            </FormControl> */}
          </Paper>
        </Grid>

        <Grid item xs={5}>
          <TableContainer component={Paper}>
            <Table
              className={classes.table}
              aria-label="simple table"
              size="small"
            >
              <TableHead>
                <TableRow>
                  <TableCell>Dessert (100g serving)</TableCell>
                  <TableCell align="right">Calories</TableCell>
                  <TableCell align="right">Fat&nbsp;(g)</TableCell>
                  <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                  <TableCell align="right">Protein&nbsp;(g)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.name}>
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="right">{row.calories}</TableCell>
                    <TableCell align="right">{row.fat}</TableCell>
                    <TableCell align="right">{row.carbs}</TableCell>
                    <TableCell align="right">{row.protein}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item xs={7}>
          <Paper className={classes.paper}>
            <ManagerChart />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
