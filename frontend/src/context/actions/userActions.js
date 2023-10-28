export const setUserDetails = (user) => {
  return {
    type: "SET_USER",
    user: user,
  };
};

export const getUserDetails = () => {
  return {
    type: "GET_USER",
  };
};

export const setUserName = (username) => {
  return {
    type: "SET_USERNAME",
    username: username,
  };
};

export const setUserNull = () => {
  return {
    type: "SET_USER_NULL",
    user: null,
  };
};
