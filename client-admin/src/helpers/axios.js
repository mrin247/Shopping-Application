// ! Import Axios
import axios from "axios";
import { authConstants } from "../actions/constants";

import store from "../store";

// ! Import API
import { API } from "../urlConfig";

// ! Get authorization token
const token = window.localStorage.getItem("token");

// ! Create a instance or an single occurence of axios with custom config[object] for API calls from client
const axiosInstance = axios.create({
  baseURL: API,
  headers: {
    'Authorization': token ? `Bearer ${token}` : "",
  },
});

// ! intercept requests or responses before they are handled by actions and check is the token is valid or not
axiosInstance.interceptors.request.use((req)=>{
  const {auth}= store.getState();
  if(auth.token){
    req.headers.Authorization= `Bearer ${auth.token}`
  }
  return req;

})

axiosInstance.interceptors.response.use((res)=>{
  return res;
},(err)=>{
  console.log(err.response);
  const {status}= err.response;
  if(status===500){
    localStorage.clear();
    store.dispatch({type: authConstants.LOGOUT_SUCCESS});
  }
  return Promise.reject(err);
})
// ! export axiosInstance as default
export default axiosInstance;
