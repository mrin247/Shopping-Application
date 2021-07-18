// ! Import Constants
import axios from "../helpers/axios";
import { categoryConstants } from "./constants";

// ! This action connects category route with /category/getCategory and shows category list on the client side
export const getAllCategory = () => {
  // dispatch actions to change the store's data
  return async (dispatch) => {
    // dispatch action for requesting to show categories
    dispatch({ type: categoryConstants.GET_ALL_CATEGORIES_REQ });

    // API call of /category/getCategory
    const res = await axios.get("/category/getCategory", {});
    console.log(res);

    // If category is successfully fetched
    if (res.status === 200) {
      // Extract categoryList from response data
      const { categoryList } = res.data;
      dispatch({
        type: categoryConstants.GET_ALL_CATEGORIES_SUCCESS,
        // Pass the category list as payload to store
        payload: {
          categories: categoryList,
        },
      });
    } else {
      // If there is a error to fetching categories
      dispatch({
        type: categoryConstants.GET_ALL_CATEGORIES_FAILURE,
        payload: { error: res.data.error }, //Pass the error as payload
      });
    }
  };
};
