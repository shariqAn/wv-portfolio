import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";
const history = createBrowserHistory();

ReactDOM.render(
  <Router basename={process.env.PUBLIC_URL} history={history}>
    <App />
  </Router>,
  document.getElementById("root")
);
