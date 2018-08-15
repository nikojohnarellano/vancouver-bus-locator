import { call, fork, takeEvery, put, take, select } from 'redux-saga/effects';
import { FETCH_BUS_LOCATIONS, SET_BUS_LOCATIONS, FETCH_STOP_NO, FETCH_ROUTE_NO } from '../actions/types';
import {setBusLocations, loadingRoutes, loadingStops, setErrorMessage, loadingBuses} from '../actions';
import request from 'superagent';
import { apikey } from '../config';

export const getSelectedFilter = state => state.filter.get('selectedFilters').toJS();

function* fetchBusLocations() {
  const queryParams = { apikey }
  const req = request.get(' https://cors-anywhere.herokuapp.com/http://api.translink.ca/rttiapi/v1/buses').set('Accept', 'application/json');

  const filter = yield select(getSelectedFilter);

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

export function* fetchRouteNo() {
  yield put(loadingRoutes());
  const req = request.get('https://cors-anywhere.herokuapp.com/http://api.translink.ca/rttiapi/v1/routes')
                .set('Accept', 'application/json')
                .query({ apikey });

  try {
    let response = yield req;

    // Process response
    // Aparently there are some issues on Translink API Routes
  } catch(e) {
    console.log(e);
    yield put(setErrorMessage('An error has occurred while fetching routes.'))
  }
}

export function* fetchStopNo() {
  yield put(loadingStops());

  const req = request.get('https://cors-anywhere.herokuapp.com/http://api.translink.ca/rttiapi/v1/stops')
                .set('Accept', 'application/json')
                .query({ apikey });

  try {
    let response = yield req;

    // Process response
    // Apparently there are some issues on Translink API Stops, so didn't bother continuing this
  } catch(e) {
    console.log(e)
    yield put(setErrorMessage('An error has occurred while fetching stops.'))
  }
  
}

export function* watchFetchBusLocations() {
  yield takeEvery(FETCH_BUS_LOCATIONS, fetchBusLocations);
}

export function* watchFetchStopNo() {
  yield takeEvery(FETCH_STOP_NO, fetchStopNo);
}

export function* watchFetchRouteNo() {
  yield takeEvery(FETCH_ROUTE_NO, fetchRouteNo);
}