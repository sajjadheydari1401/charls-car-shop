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
    buyCar: (state, action) => {
      state.cars = state.cars.filter((car) => {
        return car._id !== action.payload;
      });
    },
    clearCars: (state) => {
      state.cars = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setCars, addCar, buyCar, clearCars } = carSlice.actions;

export default carSlice.reducer;
