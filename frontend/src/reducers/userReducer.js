import {USER_SUCCESS, USER_ERROR, USER_PENDING} from '../constants/actionTypes';

export default function loginReducer(state = {
  isUserError: false,
  isUserPending: false,
  isUserSuccess: false,
  userInfo: null,
  errorMessage: ''
}, action) {
  switch (action.type) {
    case USER_PENDING:
      return {
        isUserPending: action.isUserPending
      };

    case USER_SUCCESS:
      return {
        isUserSuccess: action.isUserSuccess,
        userInfo: action.userInfo
      };

    case USER_ERROR:
      return {
        isUserError: action.isUserError,
        errorMessage: action.errorMessage
      };

    default:
      return state;
  }
}
