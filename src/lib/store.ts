import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./features/invoice/invoiceSlice";

import listenerMiddleware from "./features/invoice/middleware/pdfmiddleware";

export const makeStore = () => {
  return configureStore({
    reducer: { counter: counterReducer },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().prepend(listenerMiddleware.middleware),
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
