import * as types from '../constants/actionTypes';
import axios from 'axios';

const API_URL = 'http://0.0.0.0:2222/api';

export function getFinishedWishes() {

  const token = localStorage.getItem('wallet_token');
  return dispatch => {
    dispatch(setWishesPending(true));

    axios.get(`${API_URL}/finished_wishes?token=${token}`)
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

