import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Registration from "./pages/Registration/Registration";
import Dashboard from "./pages/Dashboard/Dashboard";
import car from "./assets/background.jpg";

const App = () => {
  return (
    <div>
      <Router>
        <Route path="/" component={Login} exact />
        <Route path="/register" component={Registration} />
        <Route path="/dashboard" component={Dashboard} />
      </Router>
    </div>
  );
};

export default App;
