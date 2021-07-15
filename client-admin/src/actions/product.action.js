// ! Import Constants
import axios from "../helpers/axios";
import { categoryConstants } from "./constants";

// // ! This action connects category route with /category/getCategory and shows category list on the client side
// export const getAllCategory = () => {
//   // dispatch actions to change the store's data
//   return async (dispatch) => {
//     // dispatch action for requesting to show categories
//     dispatch({ type: categoryConstants.GET_ALL_CATEGORIES_REQ });

//     // API call of /category/getCategory
//     const res = await axios.get("/category/getCategory", {});
//     console.log(res);

//     // If category is successfully fetched
//     if (res.status === 200) {
//       // Extract categoryList from response data
//       const { categoryList } = res.data;
//       dispatch({
//         type: categoryConstants.GET_ALL_CATEGORIES_SUCCESS,
//         // Pass the category list as payload to store
//         payload: {
//           categories: categoryList,
//         },
//       });
//     } else {
//       // If there is a error to fetching categories
//       dispatch({
//         type: categoryConstants.GET_ALL_CATEGORIES_FAILURE,
//         payload: { error: res.data.error }, //Pass the error as payload
//       });
//     }
//   };
// };

export const addProduct = (form) => {
  return async (dispatch) => {
    // dispatch action for requesting to add categories
   // dispatch({ type: categoryConstants.ADD_NEW_CATEGORIES_REQ });
    // API call of /product/create
    const res = await axios.post("/product/create", form);
    // If category is successfully added
    console.log(res);
    // if (res.status === 201) {
    //   dispatch({
    //     type: categoryConstants.ADD_NEW_CATEGORIES_SUCCESS,
    //     payload: { category: res.data.category }, // Pass the added category as payload to store
    //   });
    // } else {
    //   // If there is a error to adding category
    //   dispatch({
    //     type: categoryConstants.ADD_NEW_CATEGORIES_FAILURE,
    //     payload: res.data.error, //Pass the error as payload
    //   });
    // }
  };
};
