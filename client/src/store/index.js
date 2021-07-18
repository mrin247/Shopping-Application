// ! Import libraries
import { applyMiddleware, createStore } from "redux";
import thunk from 'redux-thunk';

// ! Import Reducer module
import rootReducer from '../reducers';

// ! Create Redux store
const store = createStore(rootReducer,applyMiddleware(thunk));

// ! Export store
export default store;
