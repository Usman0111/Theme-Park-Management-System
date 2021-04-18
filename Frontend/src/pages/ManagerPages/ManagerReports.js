import React, { useEffect, useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { Button, Switch } from "@material-ui/core";
import ManagerChart from "./ManagerChart";
import axios from "axios";
import ManagerTable from "./ManagerTable";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import ReactExport from "react-export-excel";
import LinearProgress from "@material-ui/core/LinearProgress";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

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

export default function AdminReport() {
  const classes = useStyles();
  //menu
  const [reportType, setReportType] = useState("visits");
  const [start_date, setStartDate] = useState("2020-04-12");
  const [end_date, setEndDate] = useState("2021-04-17");
  const [calculate, setCalculate] = useState("daily total");
  const [show, setShow] = useState("all"); // one or all
  const [type, setType] = useState("ride"); //ride or attraction query
  const [rides, setRides] = useState([]);
  const [attractions, setAttractions] = useState([]);
  const [ride_id, setRide_id] = useState(1);
  const [attraction_id, setAttraction_id] = useState(1);
  const [ridePairs, setRidePairs] = useState();
  const [attractionPairs, setAttractionPairs] = useState();

  //checkbox
  const [checked, setChecked] = useState(false);

  const handleChangeCheck = (event) => {
    setChecked(event.target.checked);
  };

  //snackbar
  const [open, setOpen] = useState(false);
  const [snackMsg, setSnackMsg] = useState("");

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  //report
  const [report, setReport] = useState();
  const [params, setParams] = useState();
  const [loading, setLoading] = useState(false);
  const [excelData, setExcelData] = useState();

  const generateReport = () => {
    if (start_date > end_date) {
      setSnackMsg("End date can not come before start date");
      setOpen(true);
      return;
    }
    setLoading(true);

    let query = {};

    if (reportType === "visits") {
      query = { start_date, end_date, calculate };
    } else if (reportType === "breakdowns") {
      if (show === "all") {
        query = { start_date, end_date, calculate, show };
      } else {
        query = { start_date, end_date, calculate, show, ride_id };
      }
    } else {
      if (show === "all") {
        query = { start_date, end_date, calculate, show, type };
      } else {
        query =
          type === "ride"
            ? { start_date, end_date, calculate, show, type, ride_id }
            : { start_date, end_date, calculate, show, type, attraction_id };
      }
    }

    axios
      .post(`manager/${reportType}`, query)
      .then((res) => {
        setReport(res.data);
        setParams({ reportType: reportType, ...query });
        setLoading(false);
      })
      .catch((err) => {
        setSnackMsg(
          "Error occured while generating the report for this criteria"
        );
        setOpen(true);
        console.log(err);
      });
  };

  useEffect(() => {
    axios
      .get("ride/all")
      .then((res) => {
        const pairs = res.data.reduce((acc, ride) => {
          acc[ride.ride_id] = ride.name;
          return acc;
        }, {});
        setRidePairs(pairs);
        setRides(res.data);
      })
      .catch((err) => console.log(err));
    axios
      .get("attraction/all")
      .then((res) => {
        const pairs = res.data.reduce((acc, attraction) => {
          acc[attraction.attraction_id] = attraction.name;
          return acc;
        }, {});
        setAttractionPairs(pairs);
        setAttractions(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        <div>
          <Button
            color="primary"
            variant="contained"
            size="medium"
            onClick={() => generateReport()}
          >
            Generate Report
          </Button>
          {report ? (
            <>
              {/* <ExcelFile
                element={
                  <Button
                    color="primary"
                    variant="contained"
                    style={{ marginLeft: 20 }}
                    size="medium"
                  >
                    Download Excel
                  </Button>
                }
              >
                <ExcelSheet data={excelData.rows} name="Employees">
                <ExcelColumn label="Name" value="name" />

              <ExcelColumn label="Wallet Money" value="calories" />
              <ExcelColumn label="Gender" value="fat" />
              <ExcelColumn label="Marital Status" value="carbs" />
              <ExcelColumn label="Marital Status" value="carbs" />
            </ExcelSheet>
              </ExcelFile> */}
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checked}
                    onChange={handleChangeCheck}
                    color="primary"
                    style={{ marginLeft: 20 }}
                  />
                }
                label="Show Graph"
              />
            </>
          ) : null}
        </div>

        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <FormControl className={classes.formControl}>
              <InputLabel>Report Type</InputLabel>
              <Select
                value={reportType}
                onChange={(event) => {
                  if (event.target.value === "breakdowns") {
                    setType("ride");
                    setReportType(event.target.value);
                  } else {
                    setReportType(event.target.value);
                  }
                }}
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
                value={start_date}
                onChange={(event) => setStartDate(event.target.value)}
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
                value={end_date}
                onChange={(event) => setEndDate(event.target.value)}
              />
            </FormControl>

            <FormControl className={classes.formControl}>
              <InputLabel>Calculate</InputLabel>
              <Select
                value={calculate}
                defaultValue={1}
                onChange={(event) => setCalculate(event.target.value)}
              >
                <MenuItem value={"daily total"}>Daily Total</MenuItem>
                <MenuItem value={"monthly total"}>Monthly Total</MenuItem>
                <MenuItem value={"daily average by month"}>
                  Daily Average by Month
                </MenuItem>
                <MenuItem value={"daily max by month"}>
                  Daily Maximum by Month
                </MenuItem>
                <MenuItem value={"daily min by month"}>
                  Daily Minimum by Month
                </MenuItem>
              </Select>
            </FormControl>
            {reportType !== "visits" ? (
              <>
                <FormControl className={classes.formControl}>
                  <InputLabel>Show</InputLabel>
                  <Select
                    value={show}
                    onChange={(event) => setShow(event.target.value)}
                  >
                    {" "}
                    <MenuItem value={"all"}>All</MenuItem>
                    <MenuItem value={"one"}>One</MenuItem>
                  </Select>
                </FormControl>

                <FormControl className={classes.formControl}>
                  <InputLabel>Type</InputLabel>
                  <Select
                    value={type}
                    onChange={(event) => setType(event.target.value)}
                  >
                    <MenuItem value={"ride"}>Ride</MenuItem>
                    {reportType !== "breakdowns" ? (
                      <MenuItem value={"attraction"}>Attraction</MenuItem>
                    ) : null}
                  </Select>
                </FormControl>
                {show === "one" ? (
                  <FormControl className={classes.formControl}>
                    <InputLabel>Name</InputLabel>
                    {type === "ride" ? (
                      <Select
                        value={ride_id}
                        onChange={(event) => setRide_id(event.target.value)}
                      >
                        {rides.map((ride) => (
                          <MenuItem value={ride.ride_id} key={ride.ride_id}>
                            {ride.name}
                          </MenuItem>
                        ))}
                      </Select>
                    ) : (
                      <Select
                        value={attraction_id}
                        onChange={(event) =>
                          setAttraction_id(event.target.value)
                        }
                      >
                        {attractions.map((attraction) => (
                          <MenuItem
                            value={attraction.attraction_id}
                            key={attraction.attraction_id}
                          >
                            {attraction.name}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  </FormControl>
                ) : null}
              </>
            ) : null}
          </Paper>
        </Grid>
        {loading ? (
          <Grid item xs={12}>
            <LinearProgress />
          </Grid>
        ) : null}

        {report && !loading ? (
          <>
            <Grid item xs={checked ? 7 : 12}>
              <ManagerTable
                report={report}
                params={params}
                ridePairs={ridePairs}
                attractionPairs={attractionPairs}
              />
            </Grid>
            {checked ? (
              <Grid item xs={5}>
                <Paper className={classes.paper}>
                  <ManagerChart report={report} params={params} />
                </Paper>
              </Grid>
            ) : null}
          </>
        ) : null}
      </Grid>
      <Snackbar open={open} autoHideDuration={2500} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          {snackMsg}
        </Alert>
      </Snackbar>
    </div>
  );
}
