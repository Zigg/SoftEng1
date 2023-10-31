import axios from "axios";

export const baseURL =
  "http://127.0.0.1:5001/ordering-system-d1976/us-central1/app";

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


