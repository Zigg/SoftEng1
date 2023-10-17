import axios from "axios";

export const baseURL =
  "http://127.0.0.1:5001/ordering-system-d1976/us-central1/app";

  // No longer needed just keeping for now
  // export const validateUserJWTToken = async (token) => {
  //   try {
  //     const res = await axios.get(`${baseURL}/api/users/jwtVerfication`, {
  //       headers: { Authorization: "Bearer " + token },
  //     });
  //     return res.data.data;
  //   } catch (err) {
  //     return null;
  //   }
  // };

