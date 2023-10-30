export const setUserListDetails = (data) => {
  return {
    type: "SET_USER_LIST",
    userList: data,
  };
};

export const getAUserListDetails = () => {
  return {
    type: "GET_USER_LIST",
  };
};



