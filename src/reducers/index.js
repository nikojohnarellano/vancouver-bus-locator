import {combineReducers} from 'redux';
import translinkReducer from './translinkReducer';
import filterReducer from './filterReducer';

export default combineReducers({ 
  translink : translinkReducer,
  filter : filterReducer
});