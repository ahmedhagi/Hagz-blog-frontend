

import {
    ADD_COMMENT_REQUEST,
    ADD_COMMENT_SUCCESS,
    ADD_COMMENT_ERROR,
    UPDATE_COMMENT_ERROR,
    UPDATE_COMMENT_REQUEST,
    UPDATE_COMMENT_SUCCESS,
    DELETE_COMMENT_ERROR,
    DELETE_COMMENT_REQUEST,
    DELETE_COMMENT_SUCCESS
} from "../actions/types";

//Comment Reducer

//Initial State
const initialState = {
    addCommentInProgress : false,
    addCommentError : false,
    updateCommentInProgress : false,
    updateCommentError : false,
    deleteCommentInProgress : false,
    deleteCommentError : false,
    comment : null
}

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        //Add comment to Post
        case ADD_COMMENT_REQUEST:
            return {...state, addCommentInProgress: true, addCommentError: null, comment:null}
        case ADD_COMMENT_SUCCESS:
            return { ...state, addCommentInProgress: false, comment: payload }
        case ADD_COMMENT_ERROR:
            return { ...state, addCommentInProgress: false, addCommentError: payload }
        //Update comment
        case UPDATE_COMMENT_REQUEST:
            return {...state, updateCommentInProgress: true, updateCommentError: null, comment:null}
        case UPDATE_COMMENT_SUCCESS:
            return { ...state, updateCommentInProgress: false, comment: payload }
        case UPDATE_COMMENT_ERROR:
            return { ...state, updateCommentInProgress: false, updateCommentError: payload }
        //Delete comment from post
        case DELETE_COMMENT_REQUEST:
            return {...state, deleteCommentInProgress: true, deleteCommentError: null, comment:null}
        case DELETE_COMMENT_SUCCESS:
            return { ...state, deleteCommentInProgress: false, comment: payload }
        case DELETE_COMMENT_ERROR:
            return { ...state, deleteCommentInProgress: false, deleteCommentError: payload }

        default:
            return state;
    }
    }