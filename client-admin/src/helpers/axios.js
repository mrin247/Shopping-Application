// ! Import Axios
import axios from "axios";

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

// ! export axiosInstance as default
export default axiosInstance;
