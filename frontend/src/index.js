import React from "react";
import "./index.css";
import ReactDOM from "react-dom/client";
// Apparently app doesnt work and has to be App
import App from "./App";

import { BrowserRouter as Router } from "react-router-dom";
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);
