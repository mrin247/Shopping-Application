// ! Import Axios
import axios from 'axios';

// ! Import API
import { API } from '../urlConfig';

// ! Create a instance or an single occurence of axios with custom config[object] for API calls from client
const axiosInstance=axios.create({
    baseURL: API,
    // headers:{
    //     'Authorization': ''
    // }
});


// ! export axiosInstance as default
export default axiosInstance;