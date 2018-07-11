import { combineReducers } from 'redux';
import authenticationReducer from './authenticationReducer';
import homepageReducer from './homepageReducer';
import historyReducer from './historyReducer';
import userReducer from './userReducer';
import { routerReducer } from 'react-router-redux';

const rootReducer = combineReducers({
  authenticationReducer,
  homepageReducer,
  historyReducer,
  userReducer,
  routing: routerReducer
});

export default rootReducer;
