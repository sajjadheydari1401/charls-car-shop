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
    clearInvoices: (state) => {
      state.invoices = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setInvoices, clearInvoices } = invoiceSlice.actions;

export default invoiceSlice.reducer;
