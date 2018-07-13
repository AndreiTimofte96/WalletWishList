import * as types from '../constants/actionTypes';
import axios from 'axios';
import { API_URL } from '../utils/apiUrl';

// const API_URL = 'http://0.0.0.0:2222/api';
// const API_URL = 'http://192.168.100.5:2222/api';

export function getUserInfo() {

  const token = localStorage.getItem('wishList_token');
  return dispatch => {
    dispatch(setUserPending(true));

    axios.get(`${API_URL}/api/user_info?token=${token}`)
      .then(response => {
        
        
        if (response.data.success == true) {
          dispatch(setUserPending(false));
          dispatch(setUserSuccess(true, response.data.userInfo));
        } else {
            dispatch(setUserPending(false));
            dispatch(setUserError(true, response.data.message));
        }
      });
  };
}

export const setUserSuccess = (isUserSuccess, userInfo) => {
  return {
    type: types.USER_SUCCESS,
    isUserSuccess,
    userInfo
  };
};

export const setUserPending = (isUserPending) => {
  return {
    type: types.USER_PENDING,
    isUserPending
  };
};

export const setUserError = (isUserError, errorMessage) => {
  return {
    type: types.USER_ERROR,
    isUserError,
    errorMessage
  };
};