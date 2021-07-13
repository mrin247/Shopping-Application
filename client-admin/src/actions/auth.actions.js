// ! Import Constants
import { authConstants } from "./constants";
import axios from "../helpers/axios";

// ! This action connects signin route with /admin/signin and
// ! Performs user login taking user as a parameter on submitting signin form
export const login = (user) => {
  // dispatch actions to change the store's data
  return async (dispatch) => {
    // dispatch action for login request
    dispatch({ type: authConstants.LOGIN_REQUEST });

    // API call of admin/signin
    const res = await axios.post("/admin/signin", {
      ...user,
    });

    // If user is successfully logedin
    if (res.status === 200) {
      const { token, user } = res.data; //extract token and user data from response
      localStorage.setItem("token", token); // Store token in localstorage
      localStorage.setItem("user", JSON.stringify(user)); // Store user(after changing to string) in localstorage

      // dispatch action for login successfull
      dispatch({
        type: authConstants.LOGIN_SUCCESS,
        payload: {
          // Pass the token and the user as payload to store
          token,
          user,
        },
      });
    } else if (res.status === 400) {
      // If there is a error to logging in
      dispatch({
        type: authConstants.LOGIN_FAILURE,
        payload: { error: res.data.error }, //Pass the error as payload
      });
    }
  };
};

// ! If user logged in , pass the token and the user as payload in login success action
// ! Else pass the error in login failure action
export const isUserLoggedIn = () => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = JSON.parse(localStorage.getItem("user"));
      dispatch({
        type: authConstants.LOGIN_SUCCESS,
        payload: {
          token,
          user,
        },
      });
    } else {
      dispatch({
        type: authConstants.LOGIN_FAILURE,
        payload: { error: "Failed to login" },
      });
    }
  };
};

// ! This action performs signout user on clicking signout button
export const signout = () => {
  return async (dispatch) => {
    // dispatch action for logout request
    dispatch({ type: authConstants.LOGOUT_REQUEST });

    // API call of admin/signout
    const res = await axios.post("/admin/signout");

    // If user is successfully signedout
    if (res.status === 200) {
      localStorage.clear(); // Clear the token and the user from localstorage
      dispatch({
        type: authConstants.LOGOUT_SUCCESS,
      });
    } else if (res.status === 400) {
      // If there is a error to signing out
      dispatch({
        type: authConstants.LOGOUT_FAILURE,
        payload: { error: res.data.error }, //Pass the error as payload
      });
    }
  };
};
