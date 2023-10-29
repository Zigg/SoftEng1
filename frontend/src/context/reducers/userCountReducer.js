const userCountReducer = (state = 0, action) => {
  switch (action.type) {
    case "SET_USER_COUNT":
      return action.count;
    case "GET_USER_COUNT":
      return state;
    default:
      return state;
  }
};

export default userCountReducer;
