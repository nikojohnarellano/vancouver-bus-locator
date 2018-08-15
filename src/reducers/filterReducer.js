import { SET_FILTERS } from 'actions/types';
import { Record, List, Map } from 'immutable';
import { SET_ROUTE_NO, SET_STOP_NO, LOADING_ROUTE_NO, LOADING_STOP_NO } from '../actions/types';

const FilterRecord = new Record({ stopNo : '', routeNo : '' });

const initialState = Map({
  stopNoSelection : List([]),
  stopNoLoading : false,
  routeNoSelection : List([]),
  routeNoLoading : false,
  selectedFilters : new FilterRecord()
});

export default (state = initialState, action) => {
  switch(action.type) {
    case SET_FILTERS : {
      const { payload } = action;
      return state.set('busNo', payload.busNo).set('stopNo', payload.routeNo);
    }
    case SET_ROUTE_NO : {
      const { payload } = action;
      return state.set('routeNoSelection', List(payload.routeNoList)).set('routeNoLoading', false);
    }
    case SET_STOP_NO : {
      const { payload } = action;
      return state.set('stopNoSelection', List(payload.stopNoList)).set('stopNoLoading', false);
    }
    case LOADING_ROUTE_NO : {
      return state.set('routeNoLoading', true);
    }
    case LOADING_STOP_NO : {
      return state.set('stopNoLoading', true);
    }
    default : {
      return state;
    }
  }
}