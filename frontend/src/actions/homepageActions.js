import * as types from '../constants/actionTypes';
import axios from 'axios';

const API_URL = 'http://0.0.0.0:2222/api';

export function getWishes() {

  const token = localStorage.getItem('wishList_token');
  return dispatch => {
    dispatch(setWishesPending(true));

    axios.get(`${API_URL}/wishes?token=${token}`)
      .then(response => {


        if (response.data.success == true) {

          let startedSum = 0, inProgressSum = 0;
  
          for (let index = 0; index < response.data.wishes.length; index++){
            
              if (response.data.wishes[index].status === "not_started") {
                startedSum += response.data.wishes[index].amount;
              }
              if (response.data.wishes[index].status == "in_progress") {
                inProgressSum += response.data.wishes[index].amount;            
              }
          }

          dispatch(setWishesPending(false));
          dispatch(setWishesSuccess(true, response.data.wishes, startedSum, inProgressSum));
        } else {
            dispatch(setWishesPending(false));
            dispatch(setWishesError(true, response.data.message));
        }
      });
  };
}

export function addWish(newWish) {

  const token = localStorage.getItem('wishList_token');
  return dispatch => {
    dispatch(setAddWishPending(true));

    axios.post(`${API_URL}/add_wish?token=${token}`, newWish)
      .then(response => {
        
        // console.log(response);
        if (response.data.success == true) {
          dispatch(setAddWishPending(false));
          dispatch(setAddWishSuccess(true, response.data.wishes));
        } else {
            dispatch(setAddWishPending(false));
            dispatch(setAddWishError(true, response.data.message));
        }
      });
  };
}

export function deleteWish(object) {

  const token = localStorage.getItem('wishList_token');
  return dispatch => {
    dispatch(setAddWishPending(true));

    axios.post(`${API_URL}/delete_wish?token=${token}`, object)
      .then(response => {
        
        // console.log(response);
        if (response.data.success == true) {
          dispatch(setAddWishPending(false));
          dispatch(setAddWishSuccess(true, response.data.wishes));
        } else {
            dispatch(setAddWishPending(false));
            dispatch(setAddWishError(true, response.data.message));
        }
      });
  };
}

export function changeStatus(object) {

  const token = localStorage.getItem('wishList_token');
  return dispatch => {
    dispatch(setAddWishPending(true));

    axios.post(`${API_URL}/change_status?token=${token}`, object)
      .then(response => {
        
        // console.log(response);
        if (response.data.success == true) {
          dispatch(setAddWishPending(false));
          dispatch(setAddWishSuccess(true, response.data.wishes));
        } else {
            dispatch(setAddWishPending(false));
            dispatch(setAddWishError(true, response.data.message));
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
      axios.get(`${API_URL}/wishes?token=${token}`)
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

export const setWishesSuccess = (isWishesSuccess, wishes, startedSum, inProgressSum) => {
  return {
    type: types.WISHES_SUCCESS,
    wishes,
    startedSum,
    inProgressSum,
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

export const setAddWishSuccess = (isAddWishSuccess) => {
  return {
    type: types.ADD_WISH_SUCCESS,
    isAddWishSuccess
  };
};

export const setAddWishPending = (isAddWishPending) => {
  return {
    type: types.ADD_WISH_PENDING,
    isAddWishPending
  };
};

export const setAddWishError = (isAddWishError, errorMessage) => {
  return {
    type: types.ADD_WISH_ERROR,
    isAddWishError,
    errorMessage
  };
};