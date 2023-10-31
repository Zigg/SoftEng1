export const setUserCount = (count) => {
  return {
    type: "SET_USER_COUNT",
    count,
  };
};
export const getUserCount = () => {
  return {
    type: "GET_USER_COUNT",
  };
};