
const userRoleReducer = (state = null, action) => {
  switch (action.type) {
    case "GET_ROLE":
      return state;
    case "SET_ROLE":
      return action.role

    default:
      return state;
  }
};

export default userRoleReducer;
