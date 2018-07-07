import {LOGIN_SUCCESS, LOGIN_ERROR, LOGIN_PENDING} from '../constants/actionTypes';

export default function loginReducer(state = {
  isLoginError: false,
  isLoginPending: false,
  isLoginSuccess: false,
  errorMessage: ''
}, action) {
  switch (action.type) {
    case LOGIN_PENDING:
      return {
        isLoginPending: action.isLoginPending
      };

    case LOGIN_SUCCESS:
      return {
        isLoginSuccess: action.isLoginSuccess
      };

    case LOGIN_ERROR:
      return {
        isLoginError: action.isLoginError,
        errorMessage: action.errorMessage
      };

    default:
      return state;
  }
}
