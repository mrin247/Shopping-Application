// ! disable es-lint
/* eslint-disable default-case */
/* eslint-disable import/no-anonymous-default-export */

// ! import Action Constants for authentication
import { categoryConstants } from "../actions/constants";

// ! Initital state of the store
const initState = {
  categories: [],
  error: null,
  loading: false,
};

// ! Default export reducers for authentication
export default (state = initState, action) => {
  console.log(action);
  switch (action.type) {
    case categoryConstants.GET_ALL_CATEGORIES_REQ:
      state = {
        // update state
        ...state,
        loading: true,
      };
      break;
    case categoryConstants.GET_ALL_CATEGORIES_SUCCESS:
      state = {
        ...state,
        categories: action.payload.categories,
        loading: false,
      };
      break;
    case categoryConstants.GET_ALL_CATEGORIES_FAILURE:
      state = {
        error: action.payload.error,
      };
      break;
    case categoryConstants.ADD_NEW_CATEGORIES_REQ:
      state = {
        ...state,
        loading: true,
      };
      break;
    case categoryConstants.ADD_NEW_CATEGORIES_SUCCESS:
      state = {
        ...state,
        loading: false,
      };
      break;
    case categoryConstants.ADD_NEW_CATEGORIES_FAILURE:
      state = {
        ...initState,
      };
      break;
  }

  return state;
};
