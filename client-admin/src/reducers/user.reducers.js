// ! disable es-lint
/* eslint-disable default-case */
/* eslint-disable import/no-anonymous-default-export */

// ! import Action Constants for reducers
import { userConstants } from "../actions/constants";

// ! Initital state of the store
const initState = {
    error: null,
    message: '',
    loading: false
  };
  
  // ! Default export reducers for authentication
  export default (state = initState, action) => {
    console.log(action);
    switch (action.type) {
      case userConstants.USER_REGISTRATION_REQ:
        state = { // update state
          ...state,
         loading: true
        };
        break;
      case userConstants.USER_REGISTRATION_SUCCESS:
        state={
          ...state,
          message: action.payload.message,
          loading: false
        }
        break;
      case userConstants.USER_REGISTRATION_FAILURE:
        state={
          ...state,
          error: action.payload.error,
          loading: false
        }
        break;
    }
  
    return state;
  };
  
