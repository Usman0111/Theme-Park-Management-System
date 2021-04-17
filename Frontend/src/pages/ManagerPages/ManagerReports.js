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
<<<<<<< HEAD

  show: { display: 'inline-block' },
  hide: { display: 'none' },
=======
>>>>>>> master
}));

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

<<<<<<< HEAD


=======
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
>>>>>>> master

export default function AdminReport() {
  const classes = useStyles();
  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);
  const [report, setReport] = useState(false);

<<<<<<< HEAD
  const [SingleRideAttr, setRideSelection] = React.useState('ride');
  const [reportType, setReportType] = React.useState('ReportType');
=======
  const [type, setType] = React.useState("Ride");
  const [reportType, setReportType] = React.useState("ReportType");
>>>>>>> master

  const [TimeType, setTimeType] = React.useState("TimeType");

<<<<<<< HEAD
  const [RideType, setRideType] = React.useState('RideType');
  const [OneAll, setOneAll] = React.useState('OneAll');

  const [CalType, setCalType] = React.useState('CalType');

  const handleCalChange = (event) => {
    setCalType(event.target.value);
  };

  const handleRideSelection = (event) => {
    setRideSelection(event.target.value);
  };

  const handleReportTypeChange = (event) => {
    setReportType(event.target.value);
=======
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
>>>>>>> master
  };

  const handleReportTimeChange = (event) => {
    setTimeType(event.target.value);
<<<<<<< HEAD

  };

  const handleRideTypeChange = (event) => {
    setRideType(event.target.value);

  };

  const handleOneAllChange = (event) => {
    setOneAll(event.target.value);

=======
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
>>>>>>> master
  };

  const handleChange = (event) => {
    setPersonName(event.target.value);
  };

  function showMonthTypeForm() {
    return (<div>

      <FormControl className={classes.formControl}>
        <TextField
          id="month_year"
          label="Month Year"
          type="date"
          dateFormat="mm/yyyy"
          className={classes.textField}

          InputLabelProps={{
            shrink: true,
          }}
        />
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel>Calculating</InputLabel>
        <Select value={CalType} defaultValue={1}
          onChange={handleCalChange}>
          <MenuItem value={1}>Sum for this Month</MenuItem>
          <MenuItem value={2}>Average for this Month</MenuItem>
          <MenuItem value={3}>Maximum for this Month</MenuItem>
          <MenuItem value={4}>Minimum for this Month</MenuItem>
        </Select>
      </FormControl>


    </div>);
  }
  function showTimeRangeFrom() {
    return (<div>
      <FormControl className={classes.formControl}>
        <TextField
          id="start_date"
          label="Start date"
          type="date"
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
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </FormControl>
    </div>);
  }
  function showRideAttacMonthly() {
    return (<div>
      <FormControl className={classes.formControl}>
        <InputLabel>Type</InputLabel>
        <Select value={RideType} defaultValue={1}
          onChange={handleRideTypeChange}>
          <MenuItem value={1}>Ride</MenuItem>
          <MenuItem value={2}>Attraction</MenuItem>
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel>One or All</InputLabel>
        <Select value={OneAll} defaultValue={1}
          onChange={handleOneAllChange}>
          <MenuItem value={1}>One</MenuItem>
          <MenuItem value={2}>All</MenuItem>
        </Select>
      </FormControl>
      {/*       <FormControl component="fieldset">
        <FormLabel component="legend">Ride or Attraction</FormLabel>
        <RadioGroup aria-label="type" name="type" value={type} onChange={handleChange}>
          <FormControlLabel value="ride" control={<Radio />} label="Ride" />
          <FormControlLabel value="attraction" control={<Radio />} label="Attraction" />
        </RadioGroup>
      </FormControl>

      <FormControl component="fieldset">
        <FormLabel component="legend">One or More</FormLabel>
        <RadioGroup aria-label="type" name="type" value={type} onChange={handleChange}>
          <FormControlLabel value="one" control={<Radio />} label="one" />
          <FormControlLabel value="more" control={<Radio />} label="more" />
        </RadioGroup>
      </FormControl>
 */}

      {(function () {
        return showMonthTypeForm();
      }
      )()}


      {(function () {
        if (OneAll == 1) {
          return (
            <FormControl className={classes.formControl}>
              <InputLabel>Select Ride or Attraction</InputLabel>
              <Select value={SingleRideAttr} defaultValue={1}
                onChange={handleRideSelection}>
                <MenuItem value={1}>Ride 1</MenuItem>
                <MenuItem value={2}>Ride 2</MenuItem>
              </Select>
            </FormControl>
          )
        }
      }
      )()}

    </div>);
  }
  function showRideAttacTimeRange() {
    return (<div>
      <FormControl className={classes.formControl}>
        <InputLabel>Type</InputLabel>
        <Select value={RideType} defaultValue={1}
          onChange={handleRideTypeChange}>
          <MenuItem value={1}>Ride</MenuItem>
          <MenuItem value={2}>Attraction</MenuItem>
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel>One or All</InputLabel>
        <Select value={OneAll} defaultValue={1}
          onChange={handleOneAllChange}>
          <MenuItem value={1}>One</MenuItem>
          <MenuItem value={2}>All</MenuItem>
        </Select>
      </FormControl>

      {(function () {
        return showTimeRangeFrom();
      }
      )()}

      {(function () {
        if (OneAll == 1) {
          return (
            <FormControl className={classes.formControl}>
              <InputLabel>Select Ride or Attraction</InputLabel>
              <Select value={SingleRideAttr} defaultValue={1}
                onChange={handleRideTypeChange}>
                <MenuItem value={1}>Ride 1</MenuItem>
                <MenuItem value={2}>Ride 2</MenuItem>
              </Select>
            </FormControl>
          )
        }
      }
      )()}
    </div>);
  }

  return (
<<<<<<< HEAD
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel>Report Type</InputLabel>
        <Select value={reportType}
          onChange={handleReportTypeChange}>
          <MenuItem value={1}>Visits</MenuItem>
          <MenuItem value={2}>Usage</MenuItem>
          <MenuItem value={3}>Breakdowns</MenuItem>
          <MenuItem value={4}>Rainouts</MenuItem>
        </Select>
      </FormControl>

      <FormControl className={classes.formControl}>
        <InputLabel>Range</InputLabel>
        <Select value={TimeType} defaultValue={1}
          onChange={handleReportTimeChange}>
          <MenuItem value={1}>Monthly</MenuItem>
          <MenuItem value={2}>Pick Date</MenuItem>
        </Select>
      </FormControl>

      {(function () {
        if (reportType == 1 && TimeType == 1) {
          return showMonthTypeForm();
        }
        else if (reportType == 1 && TimeType == 2) {
          return showTimeRangeFrom();
        }
        else if (reportType == 2 && TimeType == 1) {
          return showRideAttacMonthly();
        }
        else if (reportType == 2 && TimeType == 2) {
          return showRideAttacTimeRange();
        }
        else if (reportType == 3 && TimeType == 1) {
          return showRideAttacMonthly();
        }
        else if (reportType == 3 && TimeType == 2) {
          return showRideAttacTimeRange();
        }
        else if (reportType == 4 && TimeType == 1) {
          return showRideAttacMonthly();
        }
        else {
          return showRideAttacTimeRange();
        }
      })()}
=======
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
>>>>>>> master
    </div>

  );
}
