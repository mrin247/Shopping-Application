// ! Import combie reducer function to combine all reducers under rootreducer

import { combineReducers } from "redux";

// ! Import Root Reducers
import authReducer from "./auth.reducers";
import userReducer from "./user.reducers";
import categoryReducer from "./category.reducer";
import orderReducer from "./order.reducer";
import productReducer from "./product.reducer"
import pageReducer from "./page.reducer";

// ! Combine all reducers under rootreducer
const rootreducer = combineReducers({
  auth: authReducer, // Reducer for authentication
  user: userReducer, // Reducer for user registration
  category: categoryReducer, // Reducer for category
  product: productReducer, // Reducer for product
  order: orderReducer, // Reducer for order
  page: pageReducer, // Reducer for page
});

export default rootreducer;
