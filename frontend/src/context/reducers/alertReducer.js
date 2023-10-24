// TODO: Add the reducers
const initialState = null;

const alertReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_ALERT_DANGER":
      return action.alert;

    case "SET_ALERT_SUCCESS":
      return action.alert;

    case "SET_ALERT_WARNING":
      return action.alert;

    case "SET_ALERT_INFO":
      return action.alert;

    case "SET_ALERT_CART_ADD":
      return action.alert;

    case "SET_ALERT_CART_REMOVE":
      return action.alert;

    case "SET_ALERT_NULL":
      return null;

    default:
      return state;
  }
};
export default alertReducer;
