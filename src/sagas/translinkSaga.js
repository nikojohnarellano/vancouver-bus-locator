import { call, fork, takeEvery, put, take } from 'redux-saga/effects';
import { FETCH_BUS_LOCATIONS, SET_BUS_LOCATIONS } from '../actions/types';
import {setBusLocations} from '../actions';
import request from 'superagent';
import { apikey } from '../config';

function* fetchBusLocations() {
  const req = request.get(' https://cors-anywhere.herokuapp.com/http://api.translink.ca/rttiapi/v1/buses')
         .query({ apikey })
         .set('Accept', 'application/json');

  
  
  let busLocationsResponse = yield req;
  let busLocations = JSON.parse(busLocationsResponse.text);
  yield put(setBusLocations(busLocations));
}

export function* watchFetchBusLocations() {
  yield takeEvery(FETCH_BUS_LOCATIONS, fetchBusLocations);
}