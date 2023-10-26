const userReducer = (state = null, action) => {
  switch (action.type) {
    case "GET_USER":
      return state;
    case "SET_USER":
      return action.user;
    case "SET_USER_NULL":
      return action.user;
    case "SET_USERNAME":
      return {
        ...state,
        providerData: state.providerData.map((provider, index) => {
          if (index !== 0) {
            return provider;
          }
          return { ...provider, displayName: action.username };
        }),
      };
    default:
      return state;
  }
};

export default userReducer;
