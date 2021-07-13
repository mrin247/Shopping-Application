// ! disable es-lint
/* eslint-disable default-case */
/* eslint-disable import/no-anonymous-default-export */

// ! import Action Constants
import { authConstants } from "../actions/constants";

// ! Initital state of the store
const initState = {
  token: null,
  user: {
    firstName: "",
    lastName: "",
    email: "",
    picture: "",
  },
  authenticate: false,
  authenticating: false
};

// ! Default export reducers for authentication
export default (state = initState, action) => {
  console.log(action);
  switch (action.type) {
    case authConstants.LOGIN_REQUEST:
      state = { // update state
        ...state,
       authenticating: true
      };
      break;
    case authConstants.LOGIN_SUCCESS:
      state={
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        authenticate: true,
        authenticating: false
      }
      break;
    case authConstants.LOGOUT_REQUEST:
      state={
        ...initState
      }
      break;
  }

  return state;
};
