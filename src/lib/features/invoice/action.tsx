import { pdf } from "@react-pdf/renderer";
import InvoiceComponent from "@/components/reports/Invoice";
import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import { RootState } from "@/lib/store";


// export const convertBlobToBase64 = (blob) => {
//   return new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.readAsDataURL(blob);
//     reader.onloadend = () => {
//       if (typeof reader.result === "string") {
//         resolve(reader.result);
//       } else {
//         reject(new Error("Failed to convert Blob to base64 string"));
//       }
//     };
//     reader.onerror = (error) => {
//       reject(error);
//     };
//   });
// };

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**==============================================
 **              convertBlobTpBase64
 *?  What does it do?
 *@param blob type  Blob
 *@return type Promise<string>
 *=============================================**/

export const convertBlobToBase64 = (blob: Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = () => {
      if (typeof reader.result === "string") {
        resolve(reader.result as string);
      } else {
        reject(new Error("Failed to convert Blob to base64 string"));
      }
    };
    reader.onerror = (error) => {
      reject(error);
    };
  });
};

/**==============================================
 **             generatePdfAndConvert
 *?  What does it do?
 *@param name type
 *@param name type
 *@return type string
 *=============================================**/

// Async thunk to generate and convert PDF to base64
export const generatePdfAndConvert = createAsyncThunk(
  "counter/generatePdfAndConvert",
  async (_, { getState }) => {
    const currentState = (getState() as RootState).counter;
    try {
      const pdfBlob = await pdf(
        <InvoiceComponent {...currentState} />
      ).toBlob();
      const base64String = await convertBlobToBase64(pdfBlob);
      return base64String;
    } catch (error) {
      console.error("Error generating PDF:", error);
      throw error;
    }
  }
);

/**------------------------------------------------------------------------
 **                           Add New Line
 *?  What does it do?
 *@param name type
 *@param name type
 *@return type
 *------------------------------------------------------------------------**/

import { createAction } from "@reduxjs/toolkit";

export const addLine = createAction("counter/addLine", (payload) => {
  return {
    payload,
  };
});

/**------------------------------------------------------------------------
 **                           Remove Line
 *?  What does it do?
 *@param name type
 *@param name type
 *@return type
 *------------------------------------------------------------------------**/
export const removeLine = createAction("items/removeLine", (sno) => ({
  payload: sno,
}));

/**==============================================
 **              updateInvoiceField
 *?  What does it do?
 *@param name string
 *@param value string
 *@return {Name,value} : {string,string}
 *=============================================**/

interface UpdateInvoiceFieldPayload {
  name: string;
  value: string;
}

// Define the return type for updateInvoiceField
interface UpdateInvoiceFieldResponse {
  name: string;
  value: string;
}

// Async thunk to update invoice field
export const updateInvoiceField = createAsyncThunk<
  UpdateInvoiceFieldResponse, // Return type of the payload creator
  UpdateInvoiceFieldPayload, // First argument to the payload creator
  {
    state: RootState; // ThunkAPI fields type
    rejectValue: string; // Type of the rejected value
  }
>(
  "counter/updateInvoiceField",
  async (
    { name, value }: { name: string; value: string },
    { getState, rejectWithValue }
  ) => {
    try {
      await delay(100); // Simulate a delay
      return { name, value };
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

/**==============================================
 **              FUNCTION NAME
 *?  What does it do?
 *@param name type
 *@param name type
 *@return type
 *=============================================**/

interface UpdateItemPayload {
  index: number;
  name: string;
  value: string;
}

export const updateItemAsync = createAsyncThunk(
  "counter/updateItem",
  async ({ index, name, value }: UpdateItemPayload, { rejectWithValue }) => {
    try {
      await delay(100);
      return { index, name, value };
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to update item");
    }
  }
);
