import * as types from '../constants/actionTypes';
import axios from 'axios';

const API_URL = 'http://0.0.0.0:2222';

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
          localStorage.setItem('wallet_token', response.data.token);
          dispatch(setLoginPending(false));
          dispatch(setLoginSuccess(true));
          props.history.push("/homepage");
        } else {
            dispatch(setLoginPending(false));
            dispatch(setLoginError(true, response.data.message));
        }
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