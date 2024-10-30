import {
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_ERROR,
  SET_MESSAGE,
  UPDATE_COMMENT_REQUEST,
  UPDATE_COMMENT_SUCCESS,
  UPDATE_COMMENT_ERROR,
  DELETE_COMMENT_ERROR,
  DELETE_COMMENT_REQUEST,
  DELETE_COMMENT_SUCCESS,
} from "./types";

import CommentService from "../services/comment.services";

//Action for add a comment to a post
const addCommentRequest = () => ({ type: ADD_COMMENT_REQUEST });
const addCommentSuccess = (data) => ({
  type: ADD_COMMENT_SUCCESS,
  payload: data,
});
const addCommentFailed = () => ({ type: ADD_COMMENT_ERROR });

export const addNewComment = (id, content) => (dispatch) => {
  dispatch(addCommentRequest());
  return CommentService.createNewComment(id, content).then(
    (response) => {
      dispatch(addCommentSuccess(response));

      return Promise.resolve("Success");
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch(addCommentFailed());

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

//Update Comment Action
const updateCommentRequest = () => ({ type: UPDATE_COMMENT_REQUEST });
const updateCommentSuccess = (data) => ({
  type: UPDATE_COMMENT_SUCCESS,
  payload: data,
});
const updateCommentFailed = () => ({ type: UPDATE_COMMENT_ERROR });

export const updateComment = (id, content) => (dispatch) => {
  dispatch(updateCommentRequest());
  return CommentService.updateComment(id, content).then(
    (response) => {
      dispatch(updateCommentSuccess(response));

      return Promise.resolve("Success");
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch(updateCommentFailed());

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

//Delete Comment Action
const deleteCommentRequest = () => ({ type: DELETE_COMMENT_REQUEST });
const deleteCommentSuccess = (data) => ({
  type: DELETE_COMMENT_SUCCESS,
  payload: data,
});
const deleteCommentFailed = () => ({ type: DELETE_COMMENT_ERROR });

export const deleteComment = (id) => (dispatch) => {
  dispatch(deleteCommentRequest());
  return CommentService.deleteComment(id).then(
    (response) => {
      dispatch(deleteCommentSuccess(response));

      return Promise.resolve("Success");
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch(deleteCommentFailed());

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};
