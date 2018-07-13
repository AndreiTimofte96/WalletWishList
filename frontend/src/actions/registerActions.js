import * as types from '../constants/actionTypes';
import axios from 'axios';
import { API_URL } from '../utils/apiUrl';

// const API_URL = 'http://0.0.0.0:2222';
// const API_URL = 'http://192.168.100.5:2222';

export function register(mail, password, userName, props) {
  return dispatch => {
    dispatch(setRegisterPending(true));

    
    axios.post(`${API_URL}/register`, {
       mail,
       password,
       userName
    })
      .then(response => {
        
        // console.log(response);
        if (response.data.success == true) {
          dispatch(setRegisterPending(false));
          dispatch(setRegisterSuccess(true));
          props.history.push("/login");
        } else {
            dispatch(setRegisterPending(false));
            dispatch(setRegisterError(true, response.data.message));
        }
      });
  };
}

export const setRegisterSuccess = (isRegisterSuccess) => {
  return {
    type: types.REGISTER_SUCCESS,
    isRegisterSuccess
  };
};

export const setRegisterPending = (isRegisterPending) => {
  return {
    type: types.REGISTER_PENDING,
    isRegisterPending
  };
};

export const setRegisterError = (isRegisterError, errorMessage) => {
  return {
    type: types.REGISTER_ERROR,
    isRegisterError,
    errorMessage
  };
};