import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Registration from "./pages/Registration/Registration";
import Dashboard from "./pages/Dashboard/Dashboard";

const App = () => {
  return (
    <div className="grid-container">
      <header>
        <a href="/">Theme Park</a>
      </header>

      <div>
        <Router>
          <Route path="/" exact component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Registration} />
          <Route path="/dashboard" component={Dashboard} />
        </Router>
      </div>

      <footer>Copyright</footer>
    </div>
  );
};

export default App;
