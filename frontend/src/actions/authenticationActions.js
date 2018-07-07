import * as types from '../constants/actionTypes';
import axios from 'axios';

const API_URL = 'http://ec2-52-210-10-126.eu-west-1.compute.amazonaws.com:1337/api/v1/frontend';

export function login(email, password, props) {
  return dispatch => {
    dispatch(setLoginPending(true));

    // setTimeout(()=>{
    //   if (email === 'alin' && password === 'test') {
    //     dispatch(setLoginPending(false));
    //     dispatch(setLoginSuccess(true));
    //     props.history.push('/dashboard');
    //   }else {
    //     dispatch(setLoginPending(false));
    //     dispatch(setLoginError(true, "Username or Password incorrect!"));
    //   }
    // }, 1000);g
    axios.post(`${API_URL}/login`, {
        userName: email,
        userPass: password
    })
      .then(response => {

        console.log(response);
        if (response.data.success == "true") {
          localStorage.setItem('aquaai_token', response.data.token);
          dispatch(setLoginPending(false));
          dispatch(setLoginSuccess(true));
          props.history.push("/dashboard");
        } else {
            dispatch(setLoginPending(false));
            dispatch(setLoginError(true, "Username or Password incorrect!"));
        }
      })
      .catch((error) => {
        console.log(error);
        dispatch(setLoginPending(false));
        dispatch(setLoginError(true, "Username or Password incorrect!"));
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