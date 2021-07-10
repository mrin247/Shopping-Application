// ! Import Root Reducer
import { combineReducers } from "redux";
import authReducer from "./auth.reducers";

const rootreducer=combineReducers({
    auth: authReducer
});

export default rootreducer;
