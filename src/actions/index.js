import { FETCH_BUS_LOCATIONS, SET_BUS_LOCATIONS, FETCH_ROUTE_NO, FETCH_STOP_NO, SET_ROUTE_NO, SET_STOP_NO, LOADING_BUSES, LOADING_ROUTE_NO, LOADING_STOP_NO, SET_ERROR_MESSAGE, RESET_ERROR_MESSAGE } from "./types";

export const fetchBusLocations = () => ({
  type : FETCH_BUS_LOCATIONS
});

export const fetchRouteNo = () => ({
  type : FETCH_ROUTE_NO
});

export const fetchStopNo = () => ({
  type : FETCH_STOP_NO
});

export const setBusLocations = (busLocations) => ({
  type : SET_BUS_LOCATIONS,
  payload : {
    busLocations
  }
});

export const setRouteNoList = (routeNoList) => ({
  type : SET_ROUTE_NO,
  payload : {
    routeNoList
  }
});

export const setStopNoList = (stopNoList) => ({
  type : SET_STOP_NO,
  payload : {
    stopNoList
  }
});

export const loadingBuses = () => ({
  type: LOADING_BUSES
});

export const loadingRoutes = () => ({
  type : LOADING_ROUTE_NO
})

export const loadingStops = () => ({
  type : LOADING_STOP_NO
});

export const setErrorMessage = (errorMessage) => ({
  type : SET_ERROR_MESSAGE,
  payload : {
    errorMessage
  }
});

export const resetErrorMessage = () => ({
  type : RESET_ERROR_MESSAGE
});