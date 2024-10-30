import { SET_MESSAGE, CLEAR_MESSAGE } from "./types";
//Sets Message State Action
export const setMessage = (message) => ({
  type: SET_MESSAGE,
  payload: message,
});
//Clear Message State Action
export const clearMessage = () => ({
  type: CLEAR_MESSAGE,
});
