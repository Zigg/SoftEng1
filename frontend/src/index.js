import React from "react";
import "./index.css";
import ReactDOM from "react-dom/client";
// Apparently app doesnt work and has to be App
import App from "./App";
import rootReducer from "./context/reducers";
// createStore is deprecated?
// TODO: Might just use zustand instead idk yet
import { createStore } from "redux";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
// Added the redux dev tool extension support
const rootStore = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
root.render(
  <React.StrictMode>
    <Router>
    <Provider store={rootStore}>
    <App />
    </Provider>
    </Router>
  </React.StrictMode>
);
