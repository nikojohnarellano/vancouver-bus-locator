import {combineReducers} from 'redux';
import translinkReducer from './translinkReducer';

export default combineReducers({ 
  translink : translinkReducer
});