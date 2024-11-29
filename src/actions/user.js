import {
    FETCH_USER_REQUEST,
    FETCH_USER_SUCCESS,
    FETCH_USER_ERROR,
    SET_MESSAGE,
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_ERROR,
    DELETE_USER_ERROR,
    DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS,
  } from "./types";

  import UserService from "../services/user.services";


//Gets User info
const fetchUserRequest = () => ({ type: FETCH_USER_REQUEST });
const fetchUserSuccess = (data) => ({
  type: FETCH_USER_SUCCESS,
  payload: data,
});
const fetchUserFailed = () => ({ type: FETCH_USER_ERROR });

export const fetchUser = (username) => (dispatch) => {
  dispatch(fetchUserRequest());
  return UserService.getUser(username).then(
    (response) => {
      dispatch(fetchUserSuccess(response.data));

      return Promise.resolve("Success");
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch(fetchUserFailed());

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

//Update User info Action
const updateUserRequest = () => ({ type: UPDATE_USER_REQUEST });
const updateUserSuccess = (data) => ({
  type: UPDATE_USER_SUCCESS,
  payload: data,
});
const updateUserFailed = () => ({ type: UPDATE_USER_ERROR });

export const updateUser = (userRequest) => (dispatch) => {
  dispatch(updateUserRequest());
  return UserService.updateUser(userRequest).then(
    (response) => {
      dispatch(updateUserSuccess(response.data));

      return Promise.resolve("Success");
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch(updateUserFailed());

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

//Delete User from redux state
const deleteUserRequest = () => ({ type: DELETE_USER_REQUEST });
const deleteUserSuccess = (data) => ({type: DELETE_USER_SUCCESS,});
const deleteUserFailed = () => ({ type: DELETE_USER_ERROR });

export const deleteUser = (id) => (dispatch) => {
  return  dispatch(deleteUserRequest()).then(
    (response) => {
      dispatch(deleteUserSuccess(response));

      return Promise.resolve("Success");
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch(deleteUserFailed());

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};