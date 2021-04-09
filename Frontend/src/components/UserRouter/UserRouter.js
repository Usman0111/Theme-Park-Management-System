import React, { useState, useEffect } from "react";
import CustomerDashboard from "../../pages/CustomerPages/CustomerDashboard";
import ManagerDashboard from "../../pages/ManagerPages/ManagerDashboard";
import MaintainerDashboard from "../../pages/MaintainerPages/MaintainerDashboard";

const UserRouter = () => {
  const [userType, setUserType] = useState("");

  useEffect(() => {
    setUserType(localStorage.getItem("user_type"));
  }, []);

  const routes = () => {
    switch (userType) {
      case "customer":
        return <CustomerDashboard />;
      case "manager":
        return <ManagerDashboard />;
      case "attendant":
        return <div>Nothing Here</div>;
      case "maintainer":
        return <MaintainerDashboard />;
      default:
        return <div>Nothing Here</div>;
    }
  };

  return <div>{routes()}</div>;
};

export default UserRouter;
