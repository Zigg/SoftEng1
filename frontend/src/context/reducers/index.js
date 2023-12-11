import { combineReducers } from "redux";
import userReducer from "./userReducer";
import alertReducer from "./alertReducer";
import userCountReducer from "./userCountReducer";
import userListReducer from "./userListReducer";
import userRoleReducer from "./userRoleReducer";
import cartReducer from "./cartReducer";
import productReducer from "./productReducer";

const rootReducer = combineReducers({
  user: userReducer, alert: alertReducer, userCount: userCountReducer, userList: userListReducer, roleType: userRoleReducer, cart: cartReducer, cartItem: cartReducer, product: productReducer,
});

export default rootReducer;
