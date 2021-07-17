// ! disable es-lint
/* eslint-disable eqeqeq */
/* eslint-disable default-case */
/* eslint-disable import/no-anonymous-default-export */

// ! import Action Constants for authentication
import { productConstants } from "../actions/constants";

// ! Initital state of the store
const initState = {
    products:[]
};


// ! Default export reducers for authentication
export default (state = initState, action) => {
  console.log(action);
  switch (action.type) {
    // case productConstants.GET_ALL_CATEGORIES_REQ:
    //   state = {
    //     // update state
    //     ...state,
    //     loading: true,
    //   };
    //   break;
    case productConstants.GET_ALL_PRODUCTS_SUCCESS:
      state = {
        ...state,
        products: action.payload.products,
      };
      break;
    // case productConstants.GET_ALL_CATEGORIES_FAILURE:
    //   state = {
    //     error: action.payload.error,
    //   };
    //   break;
    // case productConstants.ADD_NEW_CATEGORIES_REQ:
    //   state = {
    //     ...state,
    //     loading: true,
    //   };
    //   break;
    // case productConstants.ADD_NEW_CATEGORIES_SUCCESS:
    //   const category = action.payload.category;
    //   const updatedCategories = buildNewCategories(
    //     category.parentId,
    //     state.categories,
    //     category
    //   );
    //   state = {
    //     ...state,
    //     categories: updatedCategories,
    //     loading: false,
    //   };
    //   break;
    // case productConstants.ADD_NEW_CATEGORIES_FAILURE:
    //   state = {
    //     ...initState,
    //   };
    //   break;
  }

  return state;
};
