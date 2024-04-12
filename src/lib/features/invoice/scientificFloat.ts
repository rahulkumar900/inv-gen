export default function scientificToFloat(input: string | number): string {
  const extractedDigits = String(input).replace(/\D/g, "");

  // Parse the extracted digits to a float number
  const floatValue = parseFloat(extractedDigits);

  // Check if the parsed value is a valid number
  if (isNaN(floatValue)) {
    throw new Error("Invalid input format");
  }

  // Format the float value to display two decimal places
  const formattedValue = floatValue.toFixed(2);

  return formattedValue;
}

// Test the function
console.log(scientificToFloat("2d3432e2")); // Output: "234322.00"
