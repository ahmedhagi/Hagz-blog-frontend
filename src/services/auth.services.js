import axios from "axios";
import { urlProvider } from "../config/UrlProviderInstanceManager";

const API_URL =  urlProvider.getDomainUrl() + "auth/";

//Register Request
const register = (username, email, password) => {
  return axios.post(API_URL + "signup", {
    username,
    email,
    password,
  });
};

//Login Request
const login = (username, password) => {
  return axios
    .post(API_URL + "signin", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

//Logout Request
const logout = () => {
  localStorage.removeItem("user");
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  register,
  login,
  logout,
};