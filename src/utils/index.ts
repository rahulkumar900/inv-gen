import {
  generatePdfAndConvert,
  updateItemAsync,
} from "@/lib/features/invoice/action";
import { AppDispatch } from "@/lib/store";

function splitFirstLine(text: string) {
  // Split the text into lines
  const lines = text.split("\n");

  // Take the first line
  const firstLine = lines[0];

  // Join the remaining lines back together
  const restOfText = lines.slice(1).join("\n");

  return { firstLine, restOfText };
}

// debounce function
// export const debounce = <T extends any[]>(
//   func: (...args: T) => void,
//   delay: number
// ): ((...args: T) => void) => {
//   let timeoutId: NodeJS.Timeout;

//   return (...args: T) => {
//     clearTimeout(timeoutId);
//     timeoutId = setTimeout(() => {
//       func(...args);
//     }, delay);
//   };
// };
export const debounce = <T extends any[]>(
  func: (...args: T) => void,
  delay: number
): { debounced: (...args: T) => void; cancel: () => void } => {
  let timeoutId: NodeJS.Timeout;

  const debounced = (...args: T) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };

  const cancel = () => {
    clearTimeout(timeoutId);
  };

  return { debounced, cancel };
};

// export const debouncedHandleItemsChange = debounce(
//   async (index: number, name: string, value: string, dispatch: AppDispatch) => {
//     try {
//       await dispatch(updateItemAsync({ index, name, value }));
//       await dispatch(generatePdfAndConvert());
//     } catch (error) {
//       console.error("Error in debouncedHandleItemsChange:", error);
//     }
//   },
//   300 // Adjust debounce delay as needed
// );


export const { debounced: debouncedHandleItemsChange, cancel: cancelDebounce } = debounce(
  async (index: number, name: string, value: string, dispatch: AppDispatch) => {
    try {
      await dispatch(updateItemAsync({ index, name, value }));
      await dispatch(generatePdfAndConvert());
    } catch (error) {
      console.error("Error in debouncedHandleItemsChange:", error);
    }
  },
  300 // Adjust debounce delay as needed
);


// utils/formatCurrency.js
export const formatCurrency = (value: string | number) => {
  if (value === null || value === undefined) return "";

  // Ensure the value is a string
  const valueStr = value.toString().replace(/,/g, "");
  const number = parseFloat(valueStr);
  if (isNaN(number)) return "";

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
    .format(number)
    .slice(1); // Remove the currency symbol
};

export { splitFirstLine };
