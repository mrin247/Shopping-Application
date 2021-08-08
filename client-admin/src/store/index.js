// ! Import libraries
import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

// ! Import Reducer module
import rootReducer from "../reducers";

// ! Create Redux store
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

// ! Export store
export default store;
