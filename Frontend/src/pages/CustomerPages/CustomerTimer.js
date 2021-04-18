import React from "react";
import Countdown from "react-countdown";
import { useHistory } from "react-router-dom";
import { Redirect } from "react-router-dom";
import AccessAlarmIcon from "@material-ui/icons/AccessAlarm";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";

const Completionist = () => <span>You are good to go!</span>;

const renderer = ({ hours, minutes, seconds, completed }) => {
  if (completed) {
    return <Redirect to="/dashboard" />;
  } else {
    return (
      <span>
        {hours}:{minutes}:{seconds}
      </span>
    );
  }
};

const CustomerTimer = (props) => {
  let history = useHistory();

  return (
    <div>
      <Tooltip title={"Time left for current pass"}>
        <Button variant="outlined" style={{ marginBottom: 5 }} size="large">
          <AccessAlarmIcon style={{ marginRight: 5 }} />
          <Countdown date={Date.now() + props.time} renderer={renderer} />
        </Button>
      </Tooltip>
    </div>
  );
};

export default CustomerTimer;
