import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import DataContextProvider from "./contexts/dataContext";
import axios from "axios";

axios.defaults.baseURL = "https://35.217.91.119:8000/api";

ReactDOM.render(
  <React.StrictMode>
    <DataContextProvider>
      <App />
    </DataContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
