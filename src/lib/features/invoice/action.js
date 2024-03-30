import { Dispatch } from "redux";
import { ReactElement, JSXElementConstructor } from "react";
import { pdf } from "@react-pdf/renderer";
import {
  generatePdfStart,
  generatePdfSuccess,
  generatePdfFailure,
} from "./invoiceSlice";

// Define a generic type for the component

export const generatePdfAndConvert = (Component, props) => async (dispatch) => {
  dispatch(generatePdfStart());
  try {
    // Generate the PDF
    const pdfBlob = await pdf(<Component {...props} />).toBlob();

    // Convert the PDF Blob to base64
    const reader = new FileReader();
    reader.readAsDataURL(pdfBlob);

    reader.onloadend = () => {
      const base64String = reader.result;

      dispatch(generatePdfSuccess(base64String));
    };
  } catch (error) {
    console.error("Error generating or converting PDF:", error);
    dispatch(generatePdfFailure(error.message));
  }
};
