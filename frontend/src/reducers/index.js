import { combineReducers } from 'redux';
import authenticationReducer from './authenticationReducer';
import { routerReducer } from 'react-router-redux';

const rootReducer = combineReducers({
  authenticationReducer,
  routing: routerReducer
});

export default rootReducer;
