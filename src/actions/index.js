import { FETCH_BUS_LOCATIONS, SET_BUS_LOCATIONS } from "./types";

export const fetchBusLocations = () => ({
  type : FETCH_BUS_LOCATIONS
})

export const setBusLocations = (busLocations) => ({
  type : SET_BUS_LOCATIONS,
  payload : {
    busLocations
  }
})