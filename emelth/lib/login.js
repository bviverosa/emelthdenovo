import axios from "axios";

export const send = (username, password) => {
  return axios.post("/api/userLogin", {
    username,
    password
  });
};
