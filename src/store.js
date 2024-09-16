import { configureStore } from "@reduxjs/toolkit";
import { carData } from "MockData/carsData";

export const START_PATROL = "START_PATROL";
export const STOP_PATROL = "STOP_PATROL";
// Example of a simple reducer
const initialState = {
  carData: [],
};

const carsReducer = (state = initialState, action) => {
  console.log("action", action);
  const preList = JSON.parse(localStorage.getItem("licensePlates"));

  switch (action.type) {
    case START_PATROL:
      if (preList.includes(action.payload.LicensePlate)) {
        action.payload.AlertLevel = "High";
      } else {
        action.payload.AlertLevel = "None";
      }

      return {
        ...state,
        //carData:state.carData,
        //carData: [...state.carData, action.payload],
        carData: [action.payload, ...state.carData],
      };
    case STOP_PATROL:
      return {
        ...state,
        carData: [],
      };
    default:
      return state;
  }
};

// Configure store with a reducer
const store = configureStore({
  reducer: {
    cars: carsReducer,
  },
});

export default store;

export const startPatrol = (payload) => ({
  type: START_PATROL,
  payload,
});

export const stopPatrol = () => ({
  type: STOP_PATROL,
});
