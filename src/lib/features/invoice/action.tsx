import { pdf } from "@react-pdf/renderer";
import { createAsyncThunk, createAction } from "@reduxjs/toolkit";
import { RootState } from "@/lib/store";
import PdfComponent from "@/pdfComponent/pdfComponent";

/**==============================================
 **              convertBlobToBase64
 *?  Converts a Blob object to a base64-encoded string
 *@param blob Blob
 *@return Promise<string>
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
 *?  Generates a PDF and converts it to a base64-encoded string
 *@return Promise<string>
 *=============================================**/
export const generatePdfAndConvert = createAsyncThunk<
  string, // Return type (base64 string)
  void, // No arguments
  { state: RootState }
>("counter/generatePdfAndConvert", async (_, { getState }) => {
  const { counter } = getState() as RootState; // Destructure counter from state
  try {
    const pdfBlob = await pdf(<PdfComponent {...counter} />).toBlob();
    return await convertBlobToBase64(pdfBlob); // Convert and return base64
  } catch (error) {
    console.error("Error generating PDF:", error);
    throw error;
  }
});

/**==============================================
 **             updateInvoiceField
 *?  Updates a specific invoice field
 *@param name string
 *@param value string
 *@return { name: string, value: string }
 *=============================================**/
interface UpdateInvoiceFieldPayload {
  name: string;
  value: string;
}

interface UpdateInvoiceFieldResponse {
  name: string;
  value: string;
}

export const updateInvoiceField = createAsyncThunk<
  UpdateInvoiceFieldResponse,
  UpdateInvoiceFieldPayload,
  { state: RootState; rejectValue: string }
>(
  "counter/updateInvoiceField",
  async ({ name, value }, { rejectWithValue }) => {
    try {
      return { name, value }; // Directly return updated field
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

/**==============================================
 **             updateItemAsync
 *?  Updates a specific field of an item in a list
 *@param index number
 *@param name string
 *@param value string
 *@return { index: number, name: string, value: string }
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
  { state: RootState; rejectValue: string }
>("counter/updateItem", async ({ index, name, value }, { rejectWithValue }) => {
  try {
    return { index, name, value }; // Directly return updated item
  } catch (error) {
    return rejectWithValue((error as Error).message || "Update item failed");
  }
});

/**==============================================
 **             toggleTemplateAsync
 *?  Toggles the template value
 *@param template string
 *@return { template: string }
 *=============================================**/
interface UpdateTemplatePayload {
  template: string;
}

interface UpdateTemplateFieldResponse {
  template: string;
}

export const toggleTemplateAsync = createAsyncThunk<
  UpdateTemplatePayload,
  UpdateTemplateFieldResponse,
  { state: RootState; rejectValue: string }
>("counter/toggleTemplateAsync", async ({ template }, { rejectWithValue }) => {
  try {
    return { template }; // Directly return updated template
  } catch (error) {
    return rejectWithValue(
      (error as Error).message || "Template toggle failed"
    );
  }
});

/**==============================================
 **             Action Creators
 *=============================================**/

// Action to add a new line
export const addLine = createAction("counter/addLine", (payload) => ({
  payload,
}));

// Action to remove a line
export const removeLine = createAction("items/removeLine", (sno) => ({
  payload: sno,
}));

// Action to clear the logo
export const clearLogo = createAction("counter/clearLogo");
