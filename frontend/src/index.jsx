import React from "react";
import './index.css'
import ReactDOM from "react-dom/client";
import App from "./App";
// TODO: configureStore might use different functions but I will see if I can change the store to use configureStore
import { createStore } from "redux";
import rootReducer from "./context/reducers";

import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
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
