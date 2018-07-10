import { WISHES_SUCCESS, WISHES_ERROR, WISHES_PENDING } from '../constants/actionTypes';

export default function historyReducer(state = {
  isWishesError: false,
  isWishesPending: false,
  isWishesSuccess: false,
  errorMessage: '',
  wishes: null,
  totalSum: null
}, action) {
  switch (action.type) {
    case WISHES_PENDING:
      return {
        ...state,
        isWishesPending: action.isWishesPending
      };

    case WISHES_SUCCESS:

      return {
        ...state,
        isWishesSuccess: action.isWishesSuccess,
        wishes: action.wishes,
        totalSum: action.totalSum,

      };

    case WISHES_ERROR:
      return {
        ...state,
        isWishesError: action.isWishesError,
        errorMessage: action.errorMessage
      };

    default:
      return state;
  }
}
