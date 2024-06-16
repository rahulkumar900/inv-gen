// // listenerMiddleware.js
import { createListenerMiddleware, isAnyOf } from "@reduxjs/toolkit";
import { initializeCount } from "../invoiceSlice"; // Adjust the import path as necessary
import { generatePdfAndConvert, addLine, removeLine } from "../action";

const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
  matcher: isAnyOf(addLine, removeLine),
  effect: async (action, listenerApi) => {
    await listenerApi.dispatch(generatePdfAndConvert());
  },
});

export default listenerMiddleware;
