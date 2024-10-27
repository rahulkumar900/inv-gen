import { pdf } from "@react-pdf/renderer";
// import InvoiceComponent from "@/components/reports/Invoice";
import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import { RootState } from "@/lib/store";
import { createAction } from "@reduxjs/toolkit";
import PdfComponent from "@/pdfComponent/pdfComponent";



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

// Action to reset base64String


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
      console.log(PdfComponent);
      
      const pdfBlob = await pdf(
        // <InvoiceComponent {...currentState} />
        <PdfComponent {...currentState} />
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

//


export const clearLogo = createAction("counter/removeLine");




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
interface UpdateItemFieldResponse {
  index: number;
  name: string;
  value: string;
}
export const updateItemAsync = createAsyncThunk<
  UpdateItemPayload,
  UpdateItemFieldResponse,
  {
    state: RootState; // ThunkAPI fields type
    rejectValue: string; // Type of the rejected value
  }
>(
  "counter/updateItem",
  async (
    { index, name, value }: UpdateItemPayload,
    { getState, rejectWithValue }
  ) => {
    try {
      await delay(100);
      return { index, name, value };
    } catch (error: any) {
      return rejectWithValue((error as Error).message || "Update item failed");
    }
  }
);

interface UpdateTemplatePayload {
  template: string;
}
interface UpdateTemplateFieldResponse {
  template: string;
}

export const toggleTemplateAsync = createAsyncThunk<
  UpdateTemplatePayload,
  UpdateTemplateFieldResponse,
  {
    state: RootState; // ThunkAPI fields type
    rejectValue: string; // Type of the rejected value
  }
>(
  "counter/toggleTemplateAsync",
  async ({ template }, { getState, rejectWithValue }) => {
    try {
      await delay(100);
      return { template };
    } catch (error: any) {
      return rejectWithValue((error as Error).message || "Update item failed");
    }
  }
);
