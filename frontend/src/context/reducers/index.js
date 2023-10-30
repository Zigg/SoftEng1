import { combineReducers } from "redux";
import userReducer from "./userReducer";
import alertReducer from "./alertReducer";
import userCountReducer from "./userCountReducer";
import userListReducer from "./userListReducer";

const rootReducer = combineReducers({ user: userReducer, alert: alertReducer , userCount: userCountReducer, userList: userListReducer});

export default rootReducer;
