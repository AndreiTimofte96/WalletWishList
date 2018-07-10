import { combineReducers } from 'redux';
import authenticationReducer from './authenticationReducer';
import homepageReducer from './homepageReducer';
import historyReducer from './historyReducer';
import { routerReducer } from 'react-router-redux';

const rootReducer = combineReducers({
  authenticationReducer,
  homepageReducer,
  historyReducer,
  routing: routerReducer
});

export default rootReducer;
