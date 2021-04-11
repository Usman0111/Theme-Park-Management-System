import React from "react";
import Countdown from "react-countdown";
import { useHistory } from "react-router-dom";

const Completionist = () => <span>You are good to go!</span>;

const renderer = ({ hours, minutes, seconds, completed }) => {
  if (completed) {
    return <Completionist />;
  } else {
    return (
      <span>
        {hours}:{minutes}:{seconds}
      </span>
    );
  }
};

const CustomerTimer = () => {
  let history = useHistory();

  return (
    <div>
      <Countdown date={Date.now() + 10000} renderer={renderer} />
    </div>
  );
};

export default CustomerTimer;
