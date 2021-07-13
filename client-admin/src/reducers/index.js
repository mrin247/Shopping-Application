// ! Import combie reducer function to combine all reducers under rootreducer

import { combineReducers } from "redux";

// ! Import Root Reducers
import authReducer from "./auth.reducers";
import userReducer from "./user.reducers";

// ! Combine all reducers under rootreducer
const rootreducer = combineReducers({
  auth: authReducer, // Reducer for authentication
  user: userReducer, // Reducer for user registration
});

export default rootreducer;
