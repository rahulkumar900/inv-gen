// // // listenerMiddleware.js
// import { createListenerMiddleware, isAnyOf } from "@reduxjs/toolkit";
// import { initializeCount, resetAllTaxes, toggleRound } from "../invoiceSlice"; // Adjust the import path as necessary
// import {
//   generatePdfAndConvert,
//   addLine,
//   clearLogo,
//   removeLine,
// } from "../action";

// const listenerMiddleware = createListenerMiddleware();

// listenerMiddleware.startListening({
//   matcher: isAnyOf(addLine, removeLine, clearLogo, resetAllTaxes, toggleRound),
//   effect: async (action, listenerApi) => {
//     await listenerApi.dispatch(generatePdfAndConvert());
//   },
// });

// export default listenerMiddleware;
