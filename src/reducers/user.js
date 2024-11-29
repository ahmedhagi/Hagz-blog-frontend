

import {
    FETCH_USER_REQUEST,
    FETCH_USER_SUCCESS,
    FETCH_USER_ERROR,
    UPDATE_USER_ERROR,
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    DELETE_USER_ERROR,
    DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS
} from "../actions/types";

//User Reducer

//Initial State
const initialState = {
    fetchUserInProgress : false,
    fetchUserError : false,
    updateUserInProgress : false,
    updateUserError : false,
    deleteUserInProgress : false,
    deleteUserError : false,
    user : null
}

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        //Fetch User
        case FETCH_USER_REQUEST:
            return {...state, addUserInProgress: true, addUserError: null, user:null}
        case FETCH_USER_SUCCESS:
            return { ...state, addUserInProgress: false, user: payload }
        case FETCH_USER_ERROR:
            return { ...state, addUserInProgress: false, addUserError: payload }
        //Update user
        case UPDATE_USER_REQUEST:
            return {...state, updateUserInProgress: true, updateUserError: null, user:null}
        case UPDATE_USER_SUCCESS:
            return { ...state, updateUserInProgress: false, user: payload }
        case UPDATE_USER_ERROR:
            return { ...state, updateUserInProgress: false, updateUserError: payload }
        //Delete user from post
        case DELETE_USER_REQUEST:
            return {...state, deleteUserInProgress: true, deleteUserError: null, user:null}
        case DELETE_USER_SUCCESS:
            return { ...state, deleteUserInProgress: false, user: null }
        case DELETE_USER_ERROR:
            return { ...state, deleteUserInProgress: false, deleteUserError: payload }

        default:
            return state;
    }
    }