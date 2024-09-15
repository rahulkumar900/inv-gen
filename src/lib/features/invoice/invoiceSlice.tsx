import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import invoiceData from "./data";
import { Invoice, Item } from "./invoiceType";

import {
  addLine,
  clearLogo,
  generatePdfAndConvert,
  removeLine,
  toggleTemplateAsync,
  updateInvoiceField,
  updateItemAsync,
} from "./action";

const initialState = invoiceData;

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    initializeCount: (_, action) => action.payload,

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

    resetAllTaxs: (state) => {
      state.items.forEach((item) => {
        Object.keys(item).forEach((key) => {
          item.taxes[key] = 0;
        });
      });
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

          const selectedObj: Item = { ...state.items[index] };

          const qty = Number(selectedObj.qty);
          const rate = Number(selectedObj.rate);

          const numericValue = Number(value) || 0;

          if (selectedObj.taxes && name in selectedObj.taxes) {
            // Update the specific tax
            selectedObj.taxes = {
              ...selectedObj.taxes,
              [name]: numericValue,
            };
          } else {
            selectedObj[name as keyof Item] = numericValue;
          }

          let amount = qty * rate; // Default calculation

          if (name === "qty") {
            amount = rate * numericValue;
          } else if (name === "rate") {
            amount = qty * numericValue;
          }

          state.items[index] = { ...selectedObj, [name]: value, amount };

          state.loading = false;
          state.error = null;
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
      })
      .addCase(toggleTemplateAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(toggleTemplateAsync.fulfilled, (state: Invoice, action) => {
        state.template = action.payload.template;
      })
      .addCase(toggleTemplateAsync.rejected, (state: Invoice, action) => {
        state.loading = false;
        state.error =
          action.error && action.error.message
            ? action.error.message
            : "Failed to generate PDF";
      })
      .addCase(clearLogo, (state) => {
        state.logo = "";
      });
  },
});

export const { initializeCount,resetAllTaxs, generatePdfSuccess, generatePdfFailure } =
  counterSlice.actions;

export default counterSlice.reducer;
