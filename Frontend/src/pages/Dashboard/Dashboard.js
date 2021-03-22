import React, { useState, useEffect } from "react";
import data from "./data.json";
import Attractions from "../../components/Attraction/Attraction";

const Dashboard = () => {
  const [attractions, setAttractions] = useState([]);

  useEffect(() => {
    setAttractions(data.attractions);
  }, []);

  return (
    <div className="content">
      <div className="main">
        <Attractions attractions={attractions}></Attractions>
      </div>
      <div className="sidebar">Ticket</div>
    </div>
  );
};

export default Dashboard;
