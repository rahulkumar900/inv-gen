"use client";

interface InvoiceItem {
  amount: number;
  igst: string | number;
  cgst: string | number;
  sgst: string | number;
}

// Function to calculate summary for CGST, SGST, and IGST
export function calculateGst(data: InvoiceItem[]) {
  let cgstSummary: Record<number, number> = {};
  let sgstSummary: Record<number, number> = {};
  let igstSummary: Record<number, number> = {};

  let totalCgst = 0;
  let totalSgst = 0;
  let totalIgst = 0;

  // Loop through each entry in data
  data.forEach((entry) => {
    // Extract percentage values and convert to numbers
    const cgstPercentage = parseFloat(entry.cgst.toString());
    const sgstPercentage = parseFloat(entry.sgst.toString());
    const igstPercentage = parseFloat(entry.igst.toString());

    // Calculate CGST summary
    if (!isNaN(cgstPercentage) && cgstPercentage !== 0) {
      const cgstAmount = (cgstPercentage / 100) * entry.amount;
      if (!cgstSummary[cgstPercentage]) {
        cgstSummary[cgstPercentage] = 0;
      }
      cgstSummary[cgstPercentage] += cgstAmount;
      totalCgst += cgstAmount;
    }

    // Calculate SGST summary
    if (!isNaN(sgstPercentage) && sgstPercentage !== 0) {
      const sgstAmount = (sgstPercentage / 100) * entry.amount;
      if (!sgstSummary[sgstPercentage]) {
        sgstSummary[sgstPercentage] = 0;
      }
      sgstSummary[sgstPercentage] += sgstAmount;
      totalSgst += sgstAmount;
    }

    // Calculate IGST summary
    if (!isNaN(igstPercentage) && igstPercentage !== 0) {
      const igstAmount = (igstPercentage / 100) * entry.amount;
      if (!igstSummary[igstPercentage]) {
        igstSummary[igstPercentage] = 0;
      }
      igstSummary[igstPercentage] += igstAmount;
      totalIgst += igstAmount;
    }
  });

  // Return summaries and total tax amounts
  return {
    cgstSummary,
    sgstSummary,
    igstSummary,
    totalCgst,
    totalSgst,
    totalIgst,
  };
}

// Sample usage with input data
// const data: InvoiceItem[] = [
//   { amount: 1234, igst: "18%", cgst: "0", sgst: "0" },
//   { amount: 1234, igst: "0%", cgst: "9%", sgst: "9%" },
//   { amount: 1234, igst: "0%", cgst: "5%", sgst: "5%" },
//   // Add more data here...
// ];

// Calculate summaries
// const { cgstSummary, sgstSummary, igstSummary, totalCgst, totalSgst, totalIgst } = calculateGst(data);
// console.log("CGST Summary:", cgstSummary);
// console.log("SGST Summary:", sgstSummary);
// console.log("IGST Summary:", igstSummary);
// console.log("Total CGST:", totalCgst);
// console.log("Total SGST:", totalSgst);
// console.log("Total IGST:", totalIgst);
