import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./features/invoice/invoiceSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import listenerMiddleware from "./features/invoice/middleware/pdfmiddleware";



const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, counterReducer);



export const makeStore = () => {
  return configureStore({
    reducer: { counter: persistedReducer },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          // Ignore these action types
          ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
          // Optionally, ignore paths in the state
          ignoredPaths: ["register", "rehydrate"],
        },
      }).prepend(listenerMiddleware.middleware),
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
