import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import invoiceData from "./data";
import { Invoice, Item } from "./invoiceType";

import {
  addLine,
  generatePdfAndConvert,
  removeLine,
  updateInvoiceField,
  updateItemAsync,
} from "./action";

const initialState = invoiceData;

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    initializeCount: (_, action) => action.payload,

    // addLine: (state,_) => {
    //   const items = state.items.slice();
    //   const { tableRows, initialRows } = state;

    //   items.push({
    //     sno: items.length + 1,
    //     desc: "",
    //     qty: 0,
    //     rate: 0,
    //     cgst: 0,
    //     sgst: 0,
    //     igst: 0,
    //     amount: 0,
    //   });

    //   let newTableRows;
    //   const itemLength = items.length;

    //   if (itemLength <= initialRows) {
    //     newTableRows = initialRows;
    //   } else {
    //     const threshold = initialRows + 20 * Math.ceil((itemLength - initialRows) / 20);
    //     newTableRows = itemLength > tableRows ? threshold : tableRows;
    //   }

    //   return {
    //     ...state,
    //     items,
    //     tableRows: newTableRows,
    //   };
    // },

    // removeLine: (state, action) => {
    //   const updatedItems = state.items.filter(
    //     (item) => item.sno !== action.payload
    //   );
    //   let tableRows;
    //   const itemLength = updatedItems.length;
    //   const { initialRows } = state;

    //   // Calculate the new tableRows value based on the updated item length
    //   if (itemLength <= initialRows) {
    //     tableRows = initialRows;
    //   } else {
    //     tableRows =
    //       initialRows + 20 * Math.ceil((itemLength - initialRows) / 20);
    //   }

    //   return {
    //     ...state,
    //     tableRows,
    //     items: updatedItems.map((item, index) => ({ ...item, sno: index + 1 })),
    //   };
    // },

    generatePdfStart: (state: Invoice) => {
      return {
        ...state,
        loading: true,
        error: null,
      };
    },

    generatePdfSuccess: (state, action) => {
      return {
        ...state,
        loading: false,
        base64String: action.payload,
      };
    },

    generatePdfFailure: (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateInvoiceField.fulfilled, (state: Invoice, action) => {
        const { name, value } = action.payload;
        let isIgst = state.isIgst;

        if (
          (name === "state" && state.b_state !== value) ||
          (name === "b_state" && state.state !== value)
        ) {
          isIgst = true;
        } else {
          isIgst = false;
        }

        state[name] = value;
        state.isIgst = isIgst;
      })
      .addCase(updateItemAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        updateItemAsync.fulfilled,
        (
          state,
          action: PayloadAction<{
            index: number;
            name: string;
            value: string | number;
          }>
        ) => {
          const { index, name, value } = action.payload;

          if (index < 0 || index >= state.items.length) {
            throw new Error("Invalid item index");
          }

          const selectedObj = { ...state.items[index] };
          const qty = Number(selectedObj.qty);
          const rate = Number(selectedObj.rate);
          const numericValue = Number(value) || 0;

          let amount = qty * rate; // Default calculation

          // if (name === "qty") {
          //   amount = Number(selectedObj.rate) * (Number(value) || 0);
          // } else if (name === "rate") {
          //   amount = Number(selectedObj.qty) * (Number(value) || 0);
          // } else {
          //   amount = Number(selectedObj.qty) * Number(selectedObj.rate);
          // }

          if (name === "qty") {
            amount = rate * numericValue;
          } else if (name === "rate") {
            amount = qty * numericValue;
          }

          state.items[index] = { ...selectedObj, [name]: value, amount };
          state.loading = false;
          state.error = null;

          // const changedItem: Item = {
          //   ...selectedObj,
          //   [name]: value,
          //   amount: amount,
          // };
          // state.items[index] = changedItem;
          // state.loading = false;
          // state.error = null;
        }
      )
      .addCase(updateItemAsync.rejected, (state: Invoice, action) => {
        state.loading = false;
        state.error =
          action.error && action.error.message
            ? action.error.message
            : "Failed to generate PDF";
      })
      .addCase(generatePdfAndConvert.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(generatePdfAndConvert.fulfilled, (state, action) => {
        state.loading = false;
        state.base64String = action.payload;
      })
      .addCase(generatePdfAndConvert.rejected, (state: Invoice, action) => {
        state.loading = false;
        state.error =
          action.error && action.error.message
            ? action.error.message
            : "Failed to generate PDF";
      })

      .addCase(addLine, (state, action) => {
        state.items = action.payload.items;
        state.tableRows = action.payload.tableRows;
      })
      .addCase(removeLine, (state, action) => {
        const updatedItems = state.items.filter(
          (item) => item.sno !== action.payload
        );
        const itemLength = updatedItems.length;
        const { initialRows } = state;

        let tableRows;
        if (itemLength <= initialRows) {
          tableRows = initialRows;
        } else {
          tableRows =
            initialRows + 20 * Math.ceil((itemLength - initialRows) / 20);
        }

        state.items = updatedItems.map((item, index) => ({
          ...item,
          sno: index + 1,
        }));
        state.tableRows = tableRows;
      });
  },
});

export const {
  initializeCount,
  // addLine,
  // removeLine,
  generatePdfSuccess,
  generatePdfFailure,
} = counterSlice.actions;

export default counterSlice.reducer;
