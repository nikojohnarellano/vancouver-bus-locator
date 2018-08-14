import { call, fork, takeEvery, put, take, select } from 'redux-saga/effects';
import { FETCH_BUS_LOCATIONS, SET_BUS_LOCATIONS } from '../actions/types';
import {setBusLocations} from '../actions';
import request from 'superagent';
import { apikey } from '../config';

export const getFilter = state => state.filter.toJS();

function* fetchBusLocations() {
  const queryParams = { apikey }
  const req = request.get(' https://cors-anywhere.herokuapp.com/http://api.translink.ca/rttiapi/v1/buses').set('Accept', 'application/json');

  const filter = yield select(getFilter);

  if (filter.routeNo) {
    queryParams.routeNo = filter.routeNo;
  }

  if (filter.stopNo) {
    queryParams.stopNo = filter.stopNo;
  }
  
  let busLocationsResponse = yield req.query(queryParams);
  let busLocations = JSON.parse(busLocationsResponse.text);
  yield put(setBusLocations(busLocations));
}

export function* watchFetchBusLocations() {
  yield takeEvery(FETCH_BUS_LOCATIONS, fetchBusLocations);
}