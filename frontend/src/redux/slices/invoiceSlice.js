import { createSlice } from "@reduxjs/toolkit";

export const invoiceSlice = createSlice({
  name: "invoices",
  initialState: {
    invoices: [],
  },
  reducers: {
    setInvoices: (state, action) => {
      state.invoices = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setInvoices } = invoiceSlice.actions;

export default invoiceSlice.reducer;
