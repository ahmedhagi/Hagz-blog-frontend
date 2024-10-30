import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/user/";

//Get Request for user
const getUser = (username) => {
  return axios.get(API_URL + "get/" + username);
};

//Update User info
const updateUser = (userRequest) => {
  return axios.put(API_URL + "update/", userRequest, { headers: authHeader() });
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getUser,
  updateUser,
};
