import { FETCH_BUS_LOCATIONS, SET_BUS_LOCATIONS } from '../actions/types';
import { List, Map } from 'immutable';

const initialState = Map({ buses : List([]) });

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_BUS_LOCATIONS : {
      const { busLocations } = action.payload;
      return state.set('buses', List(busLocations));
    }
    default : {
      return state;
    }
  }
}