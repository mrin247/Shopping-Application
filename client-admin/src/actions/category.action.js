// ! Import Constants
import axios from "../helpers/axios";
import { categoryConstants } from "./constants";

// ! This action connects category route with /category/getCategory and shows category list on the client side
const getAllCategory = () => {
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

// ! This action connects addcategory with /category/create and adds category through the client side
export const addCategory = (form) => {
  return async (dispatch) => {
    // dispatch action for requesting to add categories
    dispatch({ type: categoryConstants.ADD_NEW_CATEGORIES_REQ });
    // API call of /category/create
    const res = await axios.post("/category/create", form);
    // If category is successfully added
    if (res.status === 201) {
      dispatch({
        type: categoryConstants.ADD_NEW_CATEGORIES_SUCCESS,
        payload: { category: res.data.category }, // Pass the added category as payload to store
      });
    } else {
      // If there is a error to adding category
      dispatch({
        type: categoryConstants.ADD_NEW_CATEGORIES_FAILURE,
        payload: res.data.error, //Pass the error as payload
      });
    }
  };
};

// ! This action connects updateCategory with /category/create and updates category through the client side
export const updateCategories = (form) => {
  return async (dispatch) => {
    // dispatch action for requesting to add categories
    dispatch({ type: categoryConstants.UPDATE_CATEGORIES_REQ });
    // API call of /category/create
    const res = await axios.post("/category/update", form);
    // If category is successfully added
    if (res.status === 201) {
      dispatch({
        type: categoryConstants.UPDATE_CATEGORIES_SUCCESS,
      });
      dispatch(getAllCategory());
    } else {
      // If there is a error to updating category
      dispatch({
        type: categoryConstants.UPDATE_CATEGORIES_FAILURE,
        payload: res.data.error, //Pass the error as payload
      });
    }
  };
};

// ! This action connects updateCategory with /category/delete and delete category through the client side
export const deleteCategories = (ids) => {
  return async (dispatch) => {
    // dispatch action for requesting to add categories
    //dispatch({ type: categoryConstants.ADD_NEW_CATEGORIES_REQ });
    // API call of /category/create
    const res = await axios.post("/category/delete", {
     payload: {ids}
    });
    // If category is successfully added
    if (res.status === 201) {
      console.log(res);
      return true;
      
      // dispatch({
      //   type: categoryConstants.ADD_NEW_CATEGORIES_SUCCESS,
      //   payload: { category: res.data.category }, // Pass the added category as payload to store
      // });
    } else {
      console.log(res);
      return false;
      // // If there is a error to adding category
      // dispatch({
      //   type: categoryConstants.ADD_NEW_CATEGORIES_FAILURE,
      //   payload: res.data.error, //Pass the error as payload
      // });
    }
  };
};

export{getAllCategory}