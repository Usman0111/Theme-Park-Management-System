import React, { useState, useEffect } from "react";

const UserRouter = () => {
  const [userType, setUserType] = useState("");

  useEffect(() => {
    setType(localStorage.getItem("user_type"));
  }, []);

  const routes = () => {
    switch (userType) {
      case "customer":
        // code block
        break;
      case "manager":
        // code block
        break;
      case "attendant":
        // code block
        break;
      case "maintainer":
        // code block
        break;

      default:
      // code block
    }
  };

  return <div></div>;
};

export default UserRouter;
