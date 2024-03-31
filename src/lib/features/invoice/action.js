import { pdf } from "@react-pdf/renderer";
import {
  generatePdfStart,
  generatePdfSuccess,
  generatePdfFailure,
} from "./invoiceSlice";

const convertBlobToBase64 = (blob) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = () => {
      resolve(reader.result);
    };
    reader.onerror = (error) => {
      reject(error);
    };
  });
};

// Define a generic type for the component

export const generatePdfAndConvert = (Component, props) => (dispatch) => {
  dispatch(generatePdfStart());

  pdf(<Component {...props} />)
    .toBlob()
    .then((pdfBlob) => {
      // Delay execution by 5 seconds

      convertBlobToBase64(pdfBlob)
        .then((base64String) => {
          dispatch(generatePdfSuccess(base64String));
        })
        .catch((error) => {
          console.error("Error converting PDF to base64:", error);
          dispatch(generatePdfFailure(error.message));
        });
    })
    .catch((error) => {
      console.error("Error generating PDF:", error);
      dispatch(generatePdfFailure(error.message));
    });
};
