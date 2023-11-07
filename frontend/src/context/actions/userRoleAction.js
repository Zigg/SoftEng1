export const setRoleType = (role) => {
  return {
    type: "SET_ROLE",
    role,
  };
};
export const getRole = () => {
  return {
    type: "GET_ROLE",
  };
};

export const setRoleNull = () => {
  return {
    type: "SET_ROLE_NULL",
  };
};