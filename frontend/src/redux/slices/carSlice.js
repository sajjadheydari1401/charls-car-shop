import { createSlice } from "@reduxjs/toolkit";

export const carSlice = createSlice({
  name: "cars",
  initialState: {
    cars: [],
  },
  reducers: {
    setCars: (state, action) => {
      state.cars = action.payload;
    },
    addCar: (state, action) => {
      state.cars = [...state.cars, action.payload];
    },
  },
});

// Action creators are generated for each case reducer function
export const { setCars, addCar } = carSlice.actions;

export default carSlice.reducer;
