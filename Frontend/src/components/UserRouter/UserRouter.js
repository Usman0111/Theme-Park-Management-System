import React, { useState, useEffect } from "react";
import CustomerDashboard from "../../pages/CustomerPages/CustomerDashboard";
import ManagerDashboard from "../../pages/ManagerPages/ManagerDashboard";

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
        return <div>Nothing Here</div>;
      default:
        return <div>Nothing Here</div>;
    }
  };

  return <div>{routes()}</div>;
};

export default UserRouter;
