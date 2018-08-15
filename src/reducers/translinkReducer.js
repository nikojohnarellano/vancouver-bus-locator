import { FETCH_BUS_LOCATIONS, SET_BUS_LOCATIONS, LOADING_BUSES } from '../actions/types';
import { List, Map } from 'immutable';

const initialState = Map({ buses : List([]), busesLoading : true });

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_BUS_LOCATIONS : {
      const { busLocations } = action.payload;
      return state.set('buses', List(busLocations)).set('busesLoading', false);
    }
    case LOADING_BUSES : {
      return state.set('busesLoading', true);
    }
    default : {
      return state;
    }
  }
}