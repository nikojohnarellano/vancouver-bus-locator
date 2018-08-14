import { SET_FILTERS } from 'actions/types';
import { Record } from 'immutable';

const FilterRecord = new Record({ stopNo : '', routeNo : '' });

export default (state = new FilterRecord(), action) => {
  switch(action.type) {
    case SET_FILTERS : {
      const { payload } = action;
      return state.set('busNo', payload.busNo).set('stopNo', payload.routeNo);
    }
    default : {
      return state;
    }
  }
}