import { all, fork } from 'redux-saga/effects';
import {watchFetchBusLocations, watchFetchRouteNo, watchFetchStopNo} from './translinkSaga';

export default function* sagas() {
  return yield all([
    fork(watchFetchBusLocations),
    fork(watchFetchRouteNo),
    fork(watchFetchStopNo)
    // other sagas
  ])
} 