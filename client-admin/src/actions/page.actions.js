import axios from "../helpers/axios";
import { pageConstants } from "./constants";

// ! This action connects page/create route to create page
export const createPage = (form) => {
    return async dispatch => {
        // Dispatch Request
        dispatch({ type: pageConstants.CREATE_PAGE_REQUEST });
        try{
            const res = await axios.post('/page/create', form); // API Call
            if(res.status === 201){
                // Dispatch Success
                dispatch({
                    type: pageConstants.CREATE_PAGE_SUCCESS,
                    payload: { page: res.data.page }
                });
            }else{
                // Dispatch Failure
                dispatch({
                    type: pageConstants.CREATE_PAGE_FAILURE,
                    payload: { error: res.data.error }
                });
            }
        }catch(error){
            console.log(error)
        }
    }
}