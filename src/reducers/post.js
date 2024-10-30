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
  UPDATE_POST_REQUEST,
  UPDATE_POST_SUCCESS,
  UPDATE_POST_ERROR,
  CLEAR_POST,
} from "../actions/types";

//Post Reducer

//Initial State
const initialState = {
  fetchPostInProgress: false,
  fetchPostError: null,
  createPostInProgress: false,
  createPostError: false,
  addCommentInProgress: false,
  addCommentError: false,
  deletePostInProgress: false,
  deletePostError: false,
  updatePostInProgress: false,
  updatePostError: false,
  post: null,
};

export default function foo(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case CLEAR_POST:
      return { ...state, post: null };

    //Fetch Post by Id
    case FETCH_POST_REQUEST:
      return {
        ...state,
        fetchPostInProgress: true,
        fetchPostError: false,
        post: null,
      };
    case FETCH_POST_SUCCESS:
      return {
        ...state,
        fetchPostInProgress: false,
        fetchPostError: false,
        post: payload,
      };
    case FETCH_POST_ERROR:
      return { ...state, fetchPostInProgress: false, fetchPostError: payload };

    //Create a new Post
    case CREATE_POST_REQUEST:
      return {
        ...state,
        createPostInProgress: true,
        createPostError: null,
        post: null,
      };
    case CREATE_POST_SUCCESS:
      return { ...state, createPostInProgress: false, post: payload };
    case CREATE_POST_ERROR:
      return {
        ...state,
        createPostInProgress: false,
        createpostError: payload,
      };

    //Delete a Post
    case UPDATE_POST_REQUEST:
      return { ...state, updatePostInProgress: true, updateePostError: null };
    case UPDATE_POST_SUCCESS:
      return { ...state, updatePostInProgress: false, post: payload };
    case UPDATE_POST_ERROR:
      return {
        ...state,
        updatePostInProgress: false,
        updatePostError: payload,
      };

    //Delete a Post
    case DELETE_POST_REQUEST:
      return { ...state, deletePostInProgress: true, deletePostError: null };
    case DELETE_POST_SUCCESS:
      return { ...state, deletePosttInProgress: false, post: null };
    case DELETE_POST_ERROR:
      return {
        ...state,
        deletePostInProgress: false,
        deletePostError: payload,
      };

    default:
      return state;
  }
}
