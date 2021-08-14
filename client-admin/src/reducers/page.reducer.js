// ! disable es-lint
/* eslint-disable default-case */
/* eslint-disable import/no-anonymous-default-export */

// ! import page Constants for authentication
import { pageConstants } from "../actions/constants"

// ! Initital state of the store
const initState = {
    error: null,
    loading: false,
    page: {}
}

// ! Default export reducers for page
export default (state = initState, action) => {
    switch (action.type) {
        case pageConstants.CREATE_PAGE_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case pageConstants.CREATE_PAGE_SUCCESS:
            state = {
                ...state,
                loading: false
            }
            break;
        case pageConstants.CREATE_PAGE_FAILURE:
            state = {
                ...state,
                loading: false,
                error: action.payload.error
            }
            break;
    }

    return state;
}