import { combineReducers } from 'redux';
import authenticationReducer from './authenticationReducer';
import homepageReducer from './homepageReducer';
import { routerReducer } from 'react-router-redux';

const rootReducer = combineReducers({
  authenticationReducer,
  homepageReducer,
  routing: routerReducer
});

export default rootReducer;
