import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';


const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },

  show: { display: 'inline-block' },
  hide: { display: 'none' },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}




export default function AdminReport() {
  const classes = useStyles();
  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);

  const [SingleRideAttr, setRideSelection] = React.useState('ride');
  const [reportType, setReportType] = React.useState('ReportType');

  const [TimeType, setTimeType] = React.useState('TimeType');

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
  };

  const handleReportTimeChange = (event) => {
    setTimeType(event.target.value);

  };

  const handleRideTypeChange = (event) => {
    setRideType(event.target.value);

  };

  const handleOneAllChange = (event) => {
    setOneAll(event.target.value);

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
    </div>

  );
}
