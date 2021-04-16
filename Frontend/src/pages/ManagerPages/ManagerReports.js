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
  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);
  const [report, setReport] = useState(false);

  const [type, setType] = React.useState("Ride");
  const [reportType, setReportType] = React.useState("ReportType");

  const [TimeType, setTimeType] = React.useState("TimeType");

  const [isHideTimeRange, setHideTimeRange] = React.useState("HideTimeRange");
  const [isHideMonthPick, setHideMonthPick] = React.useState("HideMonthPick");

  const [isHideType, setHideType] = React.useState("HideType");

  const handleReportTypeChange = (event) => {
    setReportType(event.target.value);
    switch (event.target.value) {
      case 1:
        setHideType(classes.hide);
        break;
      case 2:
        setHideType(classes.show);
        break;
      case 3:
        setHideType(classes.show);
        break;
      case 4:
        setHideType(classes.show);
        break;
      default:
        setHideType(classes.hide);
    }
  };

  const handleReportTimeChange = (event) => {
    setTimeType(event.target.value);
    switch (event.target.value) {
      case 1:
        setHideTimeRange(classes.hide);
        setHideMonthPick(classes.show);
        break;
      case 2:
        setHideTimeRange(classes.show);
        setHideMonthPick(classes.hide);
        break;
      default:
        setHideTimeRange(classes.hide);
        setHideMonthPick(classes.show);
    }
  };

  const handleChange = (event) => {
    setPersonName(event.target.value);
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <div>
            <Button
              color="primary"
              variant="contained"
              size="medium"
              onClick={() => setReport(true)}
            >
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
              <Select value={reportType} onChange={handleReportTypeChange}>
                <MenuItem value={1}>Visits</MenuItem>
                <MenuItem value={2}>Usage</MenuItem>
                <MenuItem value={3}>Breakdowns</MenuItem>
                <MenuItem value={4}>Rainouts</MenuItem>
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
                value={TimeType}
                defaultValue={1}
                onChange={handleReportTimeChange}
              >
                <MenuItem value={1}>Daily Total</MenuItem>
                <MenuItem value={2}>Monthly Total</MenuItem>
                <MenuItem value={3}>Daily Average by Month</MenuItem>
                <MenuItem value={4}>Daily Maximum by Month</MenuItem>
                <MenuItem value={5}>Daily Minimum by Month</MenuItem>
              </Select>
            </FormControl>

            <FormControl className={classes.formControl}>
              <InputLabel>Show</InputLabel>
              <Select
                value={TimeType}
                defaultValue={1}
                onChange={handleReportTimeChange}
              >
                <MenuItem value={1}>One</MenuItem>
                <MenuItem value={2}>All</MenuItem>
              </Select>
            </FormControl>

            <FormControl className={classes.formControl}>
              <InputLabel>Type</InputLabel>
              <Select
                value={TimeType}
                defaultValue={1}
                onChange={handleReportTimeChange}
              >
                <MenuItem value={1}>Ride</MenuItem>
                <MenuItem value={2}>Attraction</MenuItem>
              </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel>Name</InputLabel>
              <Select
                value={TimeType}
                defaultValue={1}
                onChange={handleReportTimeChange}
              >
                <MenuItem value={1}>Roler Coaster</MenuItem>
                <MenuItem value={2}>Water Ride</MenuItem>
              </Select>
            </FormControl>
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
