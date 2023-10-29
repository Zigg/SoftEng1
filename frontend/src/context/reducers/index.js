import { combineReducers } from "redux";
import userReducer from "./userReducer";
import alertReducer from "./alertReducer";
import userCountReducer from "./userCountReducer";

const rootReducer = combineReducers({ user: userReducer, alert: alertReducer , userCount: userCountReducer});

export default rootReducer;
