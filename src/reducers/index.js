import { combineReducers } from "redux";
import auth from "./auth";
import message from "./message";
import post from "./post";
import comment from "./comment";

export default combineReducers({
  auth,
  message,
  post,
  comment
});