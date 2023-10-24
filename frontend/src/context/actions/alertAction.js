// TODO: Add actions
export const alertDanger = (message) => {
  return {
    type: "SET_ALERT_DANGER",
    alert: {
      type: "danger",
      message: message,
    },
  };
};

export const alertSuccess = (message) => {
  return {
    type: "SET_ALERT_SUCCESS",
    alert: {
      type: "success",
      message: message,
    },
  };
};

export const alertWarning = (message) => {
  return {
    type: "SET_ALERT_WARNING",
    alert: {
      type: "warning",
      message: message,
    },
  };
};

export const alertInfo = (message) => {
  return {
    type: "SET_ALERT_INFO",
    alert: {
      type: "info",
      message: message,
    },
  };
};

export const alertCartAdd = (message) => {
  return {
    type: "SET_ALERT_CART_ADD",
    alert: {
      type: "cart-add",
      message: message,
    },
  };
};

export const alertCartRemove = (message) => {
  return {
    type: "SET_ALERT_CART_REMOVE",
    alert: {
      type: "cart-remove",
      message: message,
    },
  };
};

export const alertNull = (message) => {
  return {
    type: "SET_ALERT_NULL",
    alert: null,
  };
};
