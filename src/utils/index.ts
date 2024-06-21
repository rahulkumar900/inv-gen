function splitFirstLine(text: string) {
  // Split the text into lines
  const lines = text.split("\n");

  // Take the first line
  const firstLine = lines[0];

  // Join the remaining lines back together
  const restOfText = lines.slice(1).join("\n");

  return { firstLine, restOfText };
}

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
