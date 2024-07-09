// // listenerMiddleware.js
import { createListenerMiddleware, isAnyOf } from "@reduxjs/toolkit";
import { initializeCount } from "../invoiceSlice"; // Adjust the import path as necessary
import { generatePdfAndConvert, addLine,clearLogo, removeLine } from "../action";

const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
  matcher: isAnyOf(addLine, removeLine,clearLogo),
  effect: async (action, listenerApi) => {
    await listenerApi.dispatch(generatePdfAndConvert());
  },
});

export default listenerMiddleware;
