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
    updateInvoiceField: (state, action) => {
      const { name, value } = action.payload;
      state[name] = value;
    },
    // increment: (state) => {
    //   // Redux Toolkit allows us to write "mutating" logic in reducers. It
    //   // doesn't actually mutate the state because it uses the Immer library,
    //   // which detects changes to a "draft state" and produces a brand new
    //   // immutable state based off those changes
    //   state.value += 1;
    // },
    // decrement: (state) => {
    //   state.value -= 1;
    // },
    // incrementByAmount: (state, action: PayloadAction<number>) => {
    //   state.value += action.payload;
    // },
  },
});

// Action creators are generated for each case reducer function
export const { initializeCount, updateInvoiceField } = counterSlice.actions;

export default counterSlice.reducer;
