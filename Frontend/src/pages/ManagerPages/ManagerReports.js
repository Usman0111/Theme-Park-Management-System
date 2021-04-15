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

  show: { display: 'block' },
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

const reports = [
  'Park visits',
  'Usage',
];

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

  const [type, setType] = React.useState('Ride');
  const [reportType, setReportType] = React.useState('ReportType');

  const [showHide, setShow] = React.useState('show');

  const [isHideType, setHideType] = React.useState('HideType');

  const handleReportTypeChange = (event) => {
    setReportType(event.target.value);
    console.log(event.target.value);
    setShow(event.target.value);
    switch (event.target.value) {

      case 1:
        setShow(classes.hide);
        setHideType(classes.show);
        break;
      case 2:
        setShow(classes.show);
        setHideType(classes.hide);
        break;
      case 2:
        setShow(classes.hide);
        setHideType(classes.show);
        break;
      case 2:
        setShow(classes.show);
        setHideType(classes.hide);
        break;
      default:
        setShow(classes.show);
        setHideType(classes.hide);
    }

  };

  const handleChange = (event) => {
    setPersonName(event.target.value);
  };

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Report Type</InputLabel>
        <Select value={reportType}
          onChange={handleReportTypeChange}>
          <MenuItem value={1}>Visits</MenuItem>
          <MenuItem value={2}>Usage</MenuItem>
          <MenuItem value={3}>Breakdowns</MenuItem>
          <MenuItem value={4}>Rainouts</MenuItem>
        </Select>
      </FormControl>
      <div className={showHide}>
        <FormControl className={classes.formControl}>
          <TextField
            id="date"
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
            id="date"
            label="End date"
            type="date"
            defaultValue="2017-05-24"
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </FormControl>
        </div>
        <div className={isHideType}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Type</FormLabel>
            <RadioGroup aria-label="type" name="type" value={type} onChange={handleChange}>
              <FormControlLabel value="ride" control={<Radio />} label="Ride" />
              <FormControlLabel value="attraction" control={<Radio />} label="Attraction" />
            </RadioGroup>
          </FormControl>
        </div>
    </div>
  );
}
