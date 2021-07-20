// ! Import Constants
import axios from "../helpers/axios";
import { productConstants } from "./constants";

// ! This action connects "/slug" route with /product/:slug and shows product list on the client side
export const getProductsBySlug = (slug) => {
  // dispatch actions to change the store's data
  return async (dispatch) => {
    // dispatch action for requesting to show categories
    //dispatch({ type: categoryConstants.GET_ALL_CATEGORIES_REQ });

    // API call of /category/getCategory
    const res = await axios.get(`/product/${slug}`, {});
   

    // If product is successfully fetched
    if (res.status === 200) {
      dispatch({
        type: productConstants.GET_PRODUCTS_BY_SLUG_SUCCESS,
        // Pass the category list as payload to store
        payload: res.data,
      });
    } 
    //else {
    //   // If there is a error to fetching categories
    //   dispatch({
    //     type: categoryConstants.GET_ALL_CATEGORIES_FAILURE,
    //     payload: { error: res.data.error }, //Pass the error as payload
    //   });
    // }
  };
};
