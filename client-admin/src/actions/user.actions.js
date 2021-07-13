// ! Import Constants
import { userConstants } from "./constants";
import axios from "../helpers/axios";



// ! Signup action
export const signup = (user) => {
    // dispatch actions to change the store's data
    return async (dispatch) => {
      // dispatch action for signup request
      dispatch({ type: userConstants.USER_REGISTRATION_REQ});
  
      // API call of admin/signup
      const res = await axios.post("/admin/signup", {
        ...user,
      });
  
      // If user is successfully created
      if (res.status === 201) {
        const {message}=res.data;
        // dispatch action for signup successfull
        dispatch({
          type: userConstants.USER_REGISTRATION_SUCCESS,
          payload: {
            // Pass the message as payload to store
            message
          },
        });
      } else if (res.status === 400) {
        // If there is a error to signup
        dispatch({
          type: userConstants.USER_REGISTRATION_FAILURE,
          payload: { error: res.data.error }, //Pass the error as payload
        });
      }
    };
  };