import {REGISTER_SUCCESS, REGISTER_ERROR, REGISTER_PENDING} from '../constants/actionTypes';

export default function registerReducer(state = {
  isRegisterError: false,
  isRegisterPending: false,
  isRegisterSuccess: false,
  errorMessage: ''
}, action) {
  switch (action.type) {
    case REGISTER_PENDING:
      return {
        isRegisterPending: action.isRegisterPending
      };

    case REGISTER_SUCCESS:
      return {
        isRegisterSuccess: action.isRegisterSuccess
      };

    case REGISTER_ERROR:
      return {
        isRegisterError: action.isRegisterError,
        errorMessage: action.errorMessage
      };

    default:
      return state;
  }
}
