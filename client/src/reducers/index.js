// ! Import combie reducer function to combine all reducers under rootreducer

import { combineReducers } from "redux";

// ! Import Root Reducers

import categoryReducer from "./category.reducer";

// ! Combine all reducers under rootreducer
const rootreducer = combineReducers({
  category: categoryReducer, // Reducer for category
});

export default rootreducer;
