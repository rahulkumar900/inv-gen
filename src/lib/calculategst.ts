// "use client";

// interface InvoiceItem {
//   amount: number;
//   igst: string | number;
//   cgst: string | number;
//   sgst: string | number;
// }

// // Function to calculate summary for CGST, SGST, and IGST
// export function calculateGst(data: InvoiceItem[]) {
//   let cgstSummary: Record<number, number> = {};
//   let sgstSummary: Record<number, number> = {};
//   let igstSummary: Record<number, number> = {};

//   let totalCgst = 0;
//   let totalSgst = 0;
//   let totalIgst = 0;

//   // Loop through each entry in data
//   data.forEach((entry) => {
//     // Extract percentage values and convert to numbers
//     const cgstPercentage = parseFloat(entry.cgst.toString());
//     const sgstPercentage = parseFloat(entry.sgst.toString());
//     const igstPercentage = parseFloat(entry.igst.toString());

//     // Calculate CGST summary
//     if (!isNaN(cgstPercentage) && cgstPercentage !== 0) {
//       const cgstAmount = (cgstPercentage / 100) * entry.amount;
//       if (!cgstSummary[cgstPercentage]) {
//         cgstSummary[cgstPercentage] = 0;
//       }
//       cgstSummary[cgstPercentage] += cgstAmount;
//       totalCgst += cgstAmount;
//     }

//     // Calculate SGST summary
//     if (!isNaN(sgstPercentage) && sgstPercentage !== 0) {
//       const sgstAmount = (sgstPercentage / 100) * entry.amount;
//       if (!sgstSummary[sgstPercentage]) {
//         sgstSummary[sgstPercentage] = 0;
//       }
//       sgstSummary[sgstPercentage] += sgstAmount;
//       totalSgst += sgstAmount;
//     }

//     // Calculate IGST summary
//     if (!isNaN(igstPercentage) && igstPercentage !== 0) {
//       const igstAmount = (igstPercentage / 100) * entry.amount;
//       if (!igstSummary[igstPercentage]) {
//         igstSummary[igstPercentage] = 0;
//       }
//       igstSummary[igstPercentage] += igstAmount;
//       totalIgst += igstAmount;
//     }
//   });

//   // Return summaries and total tax amounts
//   return {
//     cgstSummary,
//     sgstSummary,
//     igstSummary,
//     totalCgst,
//     totalSgst,
//     totalIgst,
//   };
// }

"use client";

import { Item } from "./features/invoice/invoiceType";

export interface TaxSummary {
  [key: number]: number;
}

interface TaxResult {
  taxSummary: Record<string, TaxSummary>;
  totalTax: Record<string, number>;
}

// Function to calculate summary for all taxes
export function calculateGst(items: Item[]): TaxResult {
  const taxSummary: Record<string, TaxSummary> = {
    notax: {},
    gst: {},
    vat: {},
    igst: {},
    cgstigst: {},
  };

  const totalTax: Record<string, number> = {
    notax: 0,
    gst: 0,
    vat: 0,
    igst: 0,
    cgstigst: 0,
  };

  items.forEach((entry) => {
    // Ensure that entry.taxes exists and is an object
    if (entry.taxes && typeof entry.taxes === "object") {
      // Iterate over each tax type
      Object.keys(taxSummary).forEach((taxType) => {
        const taxPercentage = entry.taxes[taxType as keyof typeof entry.taxes];
        if (taxPercentage !== undefined && taxPercentage > 0) {
          const taxAmount = (taxPercentage / 100) * entry.amount;
          if (!taxSummary[taxType][taxPercentage]) {
            taxSummary[taxType][taxPercentage] = 0;
          }
          taxSummary[taxType][taxPercentage] += taxAmount;
          totalTax[taxType] += taxAmount;
        }
      });
    }
  });

  return {
    taxSummary,
    totalTax,
  };
}
