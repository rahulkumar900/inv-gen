interface InvoiceItem {
    Amount: number;
    igst: string;
    cgst: string | number;
    sgst: string | number;
}

// Input data (large dataset)
const data: InvoiceItem[] = [
    { Amount: 1234, igst: '18%', cgst: 0, sgst: 0 },
    { Amount: 1234, igst: '0%', cgst: '9%', sgst: '9%' },
    { Amount: 1234, igst: '0%', cgst: '5%', sgst: '5%' },
    // Add more data here...
];

// Function to calculate summary for CGST, SGST, and IGST
function calculateSummary(data: InvoiceItem[]) {
    let cgstSummary: Record<number, number> = {};
    let sgstSummary: Record<number, number> = {};
    let igstSummary: Record<number, number> = {};

    // Loop through each entry in data
    data.forEach(entry => {
        // Extract percentage values and convert to numbers
        const cgstPercentage = parseFloat(entry.cgst.toString());
        const sgstPercentage = parseFloat(entry.sgst.toString());
        const igstPercentage = parseFloat(entry.igst);

        // Calculate CGST summary
        if (!isNaN(cgstPercentage)) {
            if (!cgstSummary[cgstPercentage]) {
                cgstSummary[cgstPercentage] = 0;
            }
            cgstSummary[cgstPercentage] += cgstPercentage / 100 * entry.Amount;
        }

        // Calculate SGST summary
        if (!isNaN(sgstPercentage)) {
            if (!sgstSummary[sgstPercentage]) {
                sgstSummary[sgstPercentage] = 0;
            }
            sgstSummary[sgstPercentage] += sgstPercentage / 100 * entry.Amount;
        }

        // Calculate IGST summary
        if (!isNaN(parseFloat(igstPercentage))) {
            if (!igstSummary[igstPercentage]) {
                igstSummary[igstPercentage] = 0;
            }
            igstSummary[igstPercentage] += igstPercentage / 100 * entry.Amount;
        }
    });

    // Return summaries
    return { cgstSummary, sgstSummary, igstSummary };
}

// Calculate summaries
const { cgstSummary, sgstSummary, igstSummary } = calculateSummary(data);
console.log("CGST Summary:", cgstSummary);
console.log("SGST Summary:", sgstSummary);
console.log("IGST Summary:", igstSummary);
