import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./pages/Login/Login";
import Registration from "./pages/Registration/Registration";
import Dashboard from "./pages/CustomerDashboard/CustomerDashboard";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import NotFound from "./pages/NotFound/NotFound";

const App = () => {
  return (
    <div>
      <Router>
        <Switch></Switch>
        <Route path="/" component={Login} exact />
        <Route path="/register" component={Registration} />
        <ProtectedRoute path="/dashboard" component={Dashboard} />
        <Route path="*" component={NotFound} />
      </Router>
    </div>
  );
};

export default App;
