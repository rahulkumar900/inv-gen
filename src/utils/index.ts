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

export const { debounced: debouncedHandleItemsChange, cancel: cancelDebounce } =
  debounce(
    async (
      index: number,
      name: string,
      value: string,
      dispatch: AppDispatch
    ) => {
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
export const formatCurrency = (
  value: string | number,
  round: boolean = false
): string => {
  if (value === null || value === undefined) return "";

  // Remove commas if the value is a string, then parse it to a number
  const number =
    typeof value === "string" ? parseFloat(value.replace(/,/g, "")) : value;

  if (isNaN(number)) return "";

  // Conditionally round the number
  const roundedValue = round ? Math.round(number) : number;

  // Format the number as currency, adjusting decimal places based on `round`
  const formatted = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(roundedValue);

  // Remove the currency symbol (first character) and return the result
  return formatted.replace(/^\$/, "");
};

export { splitFirstLine };
