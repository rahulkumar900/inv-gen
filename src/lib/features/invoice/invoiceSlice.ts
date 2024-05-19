import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import invoice from "./data";
import { Invoice, Item } from "./invoiceType";
import scientificToFloat from "./scientificFloat";

const initialState: Invoice = invoice;

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    initializeCount: (_, action: PayloadAction<Invoice>) => action.payload,
    updateInvoiceField: (
      state,
      action: PayloadAction<{ name: string; value: any }>
    ) => {
      const { name, value } = action.payload;
      let isIgst: boolean = state.isIgst;
      if (
        (name === "state" && state.b_state !== value) ||
        (name === "b_state" && state.state !== value)
      ) {
        isIgst = true;
      } else {
        isIgst = false;
      }
      return {
        ...state,
        isIgst,
        [name]: value,
      };
    },
    addLine: (state) => {
      let length = state.items.length;
      if (length > 10) {
        state.tableRows += 10;
      }
      length++;
      state.items.push({
        sno: length,
        desc: "",
        qty: 0,
        rate: 0,
        cgst: 0,
        sgst: 0,
        igst: 0,
        amount: 0,
      });
    },

    removeLine: (state, action) => {
      const updatedItems = state.items.filter(
        (item) => item.sno !== action.payload
      );
      return {
        ...state,
        items: updatedItems.map((item, index) => ({ ...item, sno: index + 1 })),
      };
    },
    updateItem: (
      state,
      action: PayloadAction<{
        index: number;
        changedItem: {
          [x: string]: string | number | null;
          amount: number;
          sno: number;
          desc: string;
          qty: number;
          rate: number;
        };
      }>
    ) => {
      const { index, changedItem } = action.payload;

      state.items[index] = changedItem;
    },

    generatePdfStart: (state) => {
      return {
        ...state,
        loading: true,
        error: null,
      };
    },
    generatePdfSuccess: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        loading: false,
        base64String: action.payload,
      };
    },
    generatePdfFailure: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  initializeCount,
  addLine,
  removeLine,
  updateItem,
  updateInvoiceField,
  generatePdfStart,
  generatePdfSuccess,
  generatePdfFailure,
} = counterSlice.actions;

export default counterSlice.reducer;
