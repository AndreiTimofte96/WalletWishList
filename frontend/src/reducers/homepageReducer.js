import {WISHES_SUCCESS, WISHES_ERROR, WISHES_PENDING, ADD_WISH_ERROR, ADD_WISH_PENDING, ADD_WISH_SUCCESS} from '../constants/actionTypes';

export default function homepageReducer(state = {
  isWishesError: false,
  isWishesPending: false,
  isWishesSuccess: false,
  isAddWishError: false,
  isAddWishPending: false,
  isAddWishSuccess: false,
  errorMessage: '',
  wishes: null,
  startedSum: null,
  inProgressSum: null
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
        startedSum: action.startedSum,
        inProgressSum: action.inProgressSum
      };

    case WISHES_ERROR:
      return {
        ...state,
        isWishesError: action.isWishesError,
        errorMessage: action.errorMessage
      };

      case ADD_WISH_PENDING:
      return {
        ...state,
        isAddWishPending: action.isAddWishPending
      };

    case ADD_WISH_SUCCESS:

      return {
        ...state,
        isAddWishSuccess: action.isAddWishSuccess,
      };

    case ADD_WISH_ERROR:
      return {
        ...state,
        isAddWishError: action.isAddWishError,
        errorMessage: action.errorMessage
      };

    default:
      return state;
  }
}
