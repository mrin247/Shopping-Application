// ! disable es-lint
/* eslint-disable eqeqeq */
/* eslint-disable default-case */
/* eslint-disable import/no-anonymous-default-export */

// ! import Action Constants for authentication
import { categoryConstants } from "../actions/constants";

// ! Initital state of the store
const initState = {
  categories: [],
  error: null,
  loading: false,
};

// ! Function to build new nested categories
const buildNewCategories = (parentId, categories, category) => {
  let myCategories = [];

  if (parentId == undefined) {
    return [
      ...categories,
      {
        _id: category._id,
        name: category.name,
        slug: category.slug,
        children: [],
      },
    ];
  }
  for (let cat of categories) {
    if (cat._id === parentId) {
      // Create new category object
      const newCategory = {
        _id: category._id,
        name: category.name,
        slug: category.slug,
        parentId: category.parentId,
        children: category.children,
      };
      myCategories.push({
        ...cat,
        children:
          cat.children
            ? buildNewCategories(
                parentId,
                [...cat.children, newCategory],
                category
              )
            : [],
      });
    } else {
      myCategories.push({
        ...cat,
        children: cat.children
          ? buildNewCategories(parentId, cat.children, category)
          : [],
      });
    }
  }

  return myCategories;
};

// ! Default export reducers for category
export default (state = initState, action) => {
  console.log(action);
  switch (action.type) {
    case categoryConstants.GET_ALL_CATEGORIES_REQ:
      state = {
        // update state
        ...state,
        loading: true,
      };
      break;
    case categoryConstants.GET_ALL_CATEGORIES_SUCCESS:
      state = {
        ...state,
        categories: action.payload.categories,
        loading: false,
      };
      break;
    case categoryConstants.GET_ALL_CATEGORIES_FAILURE:
      state = {
        error: action.payload.error,
      };
      break;
    case categoryConstants.ADD_NEW_CATEGORIES_REQ:
      state = {
        ...state,
        loading: true,
      };
      break;
    case categoryConstants.ADD_NEW_CATEGORIES_SUCCESS:
      const category = action.payload.category;
      const updatedCategories = buildNewCategories(
        category.parentId,
        state.categories,
        category
      );
      state = {
        ...state,
        categories: updatedCategories,
        loading: false,
      };
      break;
    case categoryConstants.ADD_NEW_CATEGORIES_FAILURE:
      state = {
        ...initState,
      };
      break;
  }

  return state;
};
