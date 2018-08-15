import { Record } from 'immutable';
import { SET_ERROR_MESSAGE, RESET_ERROR_MESSAGE } from 'actions/types';

const ErrorState = Record({ error : '' });

export default (state = new ErrorState(), action) => {
  switch(action.type) {
    case SET_ERROR_MESSAGE : {
      const { payload } = action;
      return state.set('error', payload.errorMessage);
    }
    case RESET_ERROR_MESSAGE : {
      return state.set('error', '');
    }
    default : {
      return state;
    }
  }
}