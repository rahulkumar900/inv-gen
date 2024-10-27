import React from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";
import { GstComponent } from "./gst";
import { useAppSelector } from "@/lib/hooks";
import { calculateGst } from "@/lib/calculategst";
import InvoiceFooter from "./invoiceFooter";
import { formatCurrency } from "@/utils";
import TaxType from "@/components/radiogroup";
import { Invoice, Item } from "@/lib/features/invoice/invoiceType";
import { TaxOption } from "@/components/selectTax";

const borderColor = "black";
const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    borderBottomColor: borderColor,
    borderBottomWidth: 1,
    alignItems: "center",
    display: "flex",

    height: 24,
    fontSize: 12,
  },
  description: {
    width: "85%",
    height: "100%",
    textAlign: "right",
    borderRightColor: borderColor,
    borderRightWidth: 1,
    borderLeftColor: borderColor,
    borderLeftWidth: 1,
    paddingRight: 8,
  },
  total: {
    width: "15%",
    height: "100%",
    textAlign: "right",
    fontFamily: "Helvetica-Bold",
    paddingRight: 8,
    borderRightColor: borderColor,
    borderRightWidth: 1,
  },
});

const GstAndTotal = ({ invoice }: { invoice: Invoice }) => {
  console.log(invoice);

  const { items } = invoice;

  // Calculate GST and total tax
  const { taxSummary, totalTax } = calculateGst(items);

  // Sum up the total amount from the items array
  const totalAmount = items
    .map((item) => item.amount)
    .reduce((accumulator, currentValue) => accumulator + currentValue, 0);

  // Assuming taxType is defined elsewhere, or can be extracted from invoice
  const taxType = invoice.taxType; // Assuming this is TaxOption
  const totalWithTax = totalAmount + (totalTax[taxType] || 0);
  
  const summary = taxSummary[taxType];

  console.log(summary);

  // Render the component
  return (
    <View>
      <GstComponent summary={summary} name={taxType} />

      <View style={[styles.row, { borderBottom: 0 }]}>
        <Text style={styles.description}>TOTAL</Text>
        <Text style={styles.total}>{totalWithTax}</Text>
      </View>

      <InvoiceFooter total={totalWithTax} />
    </View>
  );
};

export default GstAndTotal;
