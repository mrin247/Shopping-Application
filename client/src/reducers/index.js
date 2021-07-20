// ! Import combie reducer function to combine all reducers under rootreducer

import { combineReducers } from "redux";

// ! Import Root Reducers

import categoryReducer from "./category.reducer";
import productReducer from "./product.reducer";

// ! Combine all reducers under rootreducer
const rootreducer = combineReducers({
  category: categoryReducer, // Reducer for category
  product: productReducer // Reducer for product
});

export default rootreducer;
