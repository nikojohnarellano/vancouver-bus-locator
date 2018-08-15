import {combineReducers} from 'redux';
import translinkReducer from './translinkReducer';
import filterReducer from './filterReducer';
import errorReducer from './errorReducer';

export default combineReducers({ 
  translink : translinkReducer,
  filter : filterReducer,
  error : errorReducer
});