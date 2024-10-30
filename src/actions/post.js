import {
  FETCH_POST_SUCCESS,
  FETCH_POST_ERROR,
  FETCH_POST_REQUEST,
  CREATE_POST_REQUEST,
  CREATE_POST_SUCCESS,
  CREATE_POST_ERROR,
  DELETE_POST_REQUEST,
  DELETE_POST_SUCCESS,
  DELETE_POST_ERROR,
  SET_MESSAGE,
  CLEAR_POST,
  UPDATE_POST_REQUEST,
  UPDATE_POST_SUCCESS,
  UPDATE_POST_ERROR,
} from "./types";

import PostService from "../services/post.services";

//Clear Post
export const clearPost = () => ({
  type: CLEAR_POST,
});

//Action for fetching a post
const fetchPostRequest = () => ({ type: FETCH_POST_REQUEST });
const fetchPostSucess = (data) => ({ type: FETCH_POST_SUCCESS, payload: data });

export const fetchPost = (id) => async (dispatch) => {
  dispatch(fetchPostRequest());
  return await PostService.getPost(id).then(
    (response) => {
      dispatch(fetchPostSucess(response));

      return Promise.resolve("Success");
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: FETCH_POST_ERROR,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

//Action for creating a Post
const createPostRequest = () => ({ type: CREATE_POST_REQUEST });
const createPostSuccess = (data) => ({
  type: CREATE_POST_SUCCESS,
  payload: data,
});
const createPostFailed = () => ({ type: CREATE_POST_ERROR });

export const createPost = (title, data) => (dispatch) => {
  dispatch(createPostRequest());
  return PostService.createNewPost(title, data).then(
    (response) => {
      dispatch(createPostSuccess(response));

      return Promise.resolve("Success");
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch(createPostFailed());

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject(message);
    }
  );
};

//Action for updating a Post
const updatePostRequest = () => ({ type: UPDATE_POST_REQUEST });
const updatePostSuccess = (data) => ({
  type: UPDATE_POST_SUCCESS,
  payload: data,
});
const updatePostFailed = () => ({ type: UPDATE_POST_ERROR });

export const updatePost = (id, data) => (dispatch) => {
  dispatch(updatePostRequest());
  return PostService.updatePost(id, data).then(
    (response) => {
      dispatch(updatePostSuccess(response));

      return Promise.resolve("Success");
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch(updatePostFailed());

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject(message);
    }
  );
};

//Action for deleting a Post
const deletePostRequest = () => ({ type: DELETE_POST_REQUEST });
const deletePostSuccess = (data) => ({
  type: DELETE_POST_SUCCESS,
  payload: data,
});
const deletePostFailed = () => ({ type: DELETE_POST_ERROR });

export const deletePost = (id) => (dispatch) => {
  dispatch(deletePostRequest());
  return PostService.deletePost(id).then(
    (response) => {
      dispatch(deletePostSuccess(response));

      return Promise.resolve("Success");
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch(deletePostFailed());

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};
