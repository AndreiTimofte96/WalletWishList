import * as types from '../constants/actionTypes';
import axios from 'axios';
import { API_URL } from '../utils/apiUrl';

// const API_URL = 'http://192.168.100.5:2222';

export function login(email, password, props) {
  return dispatch => {
    dispatch(setLoginPending(true));

    axios.post(`${API_URL}/authenticate`, {
       mail: email,
       password
    })
      .then(response => {
        
        // console.log(response);
        if (response.data.success == true) {
          localStorage.setItem('wishList_token', response.data.token);
          dispatch(setLoginPending(false));
          dispatch(setLoginSuccess(true));
          props.history.push("/homepage");
        } else {
            dispatch(setLoginPending(false));
            dispatch(setLoginError(true, response.data.message));
        }
      }).catch( () =>{

        dispatch(setLoginPending(false));
        dispatch(setLoginError(true, "Please try again later. Service not available!"));
      });
  };
}

export const setLoginSuccess = (isLoginSuccess) => {
  return {
    type: types.LOGIN_SUCCESS,
    isLoginSuccess
  };
};

export const setLoginPending = (isLoginPending) => {
  return {
    type: types.LOGIN_PENDING,
    isLoginPending
  };
};

export const setLoginError = (isLoginError, errorMessage) => {
  return {
    type: types.LOGIN_ERROR,
    isLoginError,
    errorMessage
  };
};