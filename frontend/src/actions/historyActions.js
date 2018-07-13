import * as types from '../constants/actionTypes';
import axios from 'axios';
import { API_URL } from '../utils/apiUrl';

// const API_URL = 'http://0.0.0.0:2222/api';
// const API_URL = 'http://192.168.100.5:2222/api';

export function getFinishedWishes() {

  const token = localStorage.getItem('wishList_token');
  return dispatch => {
    dispatch(setWishesPending(true));

    axios.get(`${API_URL}/api/finished_wishes?token=${token}`)
      .then(response => {

        if (response.data.success == true) {
          let totalSum = 0;
  
          for (let index = 0; index < response.data.wishes.length; index++){
            
              if (response.data.wishes[index].status === "finished") {
                totalSum += response.data.wishes[index].amount;
              }
          
          }

          dispatch(setWishesPending(false));
          dispatch(setWishesSuccess(true, response.data.wishes, totalSum));
        } else {
            dispatch(setWishesPending(false));
            dispatch(setWishesError(true, response.data.message));
        }
      });
  };
}

export function checkAuth(token, props) {

	return dispatch => {

    if (token === null){
      dispatch(userNotAuthenticated(false));
			props.history.push("/login");
    }
    else{
      axios.get(`${API_URL}/api/wishes?token=${token}`)
      .then(response => {

        if (response.data.success == true) {
            dispatch(userAuthenticated(true));
        } else {
            dispatch(userNotAuthenticated(false));
            localStorage.removeItem('wishList_token');
            props.history.push("/login");  
        }
      })
      .catch((error) => {
        if (error.response.status === 401) {
          localStorage.removeItem('wishList_token');
          props.history.push('/login');
        }
      });
    }
	};
}

export const userAuthenticated = (userIsAuthenticated) => {
	return {
		type: types.USER_AUTHENTICATED,
		userIsAuthenticated
	};
};

export const userNotAuthenticated = (userNotAuthenticated) => {
	return {
		type: types.USER_NOT_AUTHENTICATED,
		userNotAuthenticated
	};
};



export const setWishesSuccess = (isWishesSuccess, wishes, totalSum) => {
  return {
    type: types.WISHES_SUCCESS,
    wishes,
    totalSum,
    isWishesSuccess
  };
};

export const setWishesPending = (isWishesPending) => {
  return {
    type: types.WISHES_PENDING,
    isWishesPending
  };
};

export const setWishesError = (isWishesError, errorMessage) => {
  return {
    type: types.WISHES_ERROR,
    isWishesError,
    errorMessage
  };
};

