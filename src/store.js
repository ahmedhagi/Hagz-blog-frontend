import {  configureStore, applyMiddleware } from "@reduxjs/toolkit";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

const middleware = [thunk];

const enhancer = composeWithDevTools(applyMiddleware(...middleware));

const store = configureStore(
    {reducer : rootReducer ,  enhancer});

export default store;