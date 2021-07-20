// ! disable es-lint
/* eslint-disable eqeqeq */
/* eslint-disable default-case */
/* eslint-disable import/no-anonymous-default-export */

// ! import Action Constants for authentication
import { productConstants } from "../actions/constants";

// ! Initital state of the store
const initState = {
  products: [],
  productsByPrice: {
    under5k: [],
    under10k: [],
    under15k: [],
    under20k: [],
    under25k: [],
    under30k: [],
  },
};

// ! Default export reducers for product
export default (state = initState, action) => {
  switch (action.type) {
    case productConstants.GET_PRODUCTS_BY_SLUG_SUCCESS:
      state = {
        ...state,
        products: action.payload.products,
        productsByPrice: { ...action.payload.productsByPrice },
      };
      break;
  }
  return state;
};
