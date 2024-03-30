import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import invoice from "./data";
import { Invoice } from "./invoiceType";
// export interface CounterState {
//   value: number;
// }

const initialState: Invoice = invoice;

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    initializeCount: (state, action: PayloadAction<Invoice>) => {
      state = action.payload;
    },
    updateInvoiceField: (
      state,
      action: PayloadAction<{ name: string; value: any }>
    ) => {
      const { name, value } = action.payload;
      state[name] = value;
    },
    generatePdfStart(state) {
      state.loading = true;
      state.error = null;
    },
    generatePdfSuccess(state, action) {
      state.loading = false;
      state.base64String = action.payload;
    },
    generatePdfFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  initializeCount,
  updateInvoiceField,
  generatePdfStart,
  generatePdfSuccess,
  generatePdfFailure,
} = counterSlice.actions;

export default counterSlice.reducer;
