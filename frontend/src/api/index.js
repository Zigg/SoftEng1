import axios from "axios";

export const baseURL =
  import.meta.env.VITE_BASE_URL;

export const getUserCount = async () => {
  try {
    const res = await axios.get(`${baseURL}/api/users/count`);
    return res.data.count;
  } catch (err) {
    return null;
  }
};

export const getUserList = async () => {
  try {
    const res = await axios.get(`${baseURL}/api/users/list`);
    return res.data.data;
  } catch (err) {
    return null;
  }
};


