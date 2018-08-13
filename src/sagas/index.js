import { all, fork } from 'redux-saga/effects';
import {watchFetchBusLocations} from './translinkSaga';

export default function* sagas() {
  return yield all([
    fork(watchFetchBusLocations)
    // other sagas
  ])
} 