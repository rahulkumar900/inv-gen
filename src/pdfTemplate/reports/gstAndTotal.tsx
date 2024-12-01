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
    textAlign: "right",
    height: 24,
    justifyContent: "center",
    lineHeight: 1,
    borderRightColor: borderColor,
    borderRightWidth: 1,
    borderLeftColor: borderColor,
    borderLeftWidth: 1,
    paddingRight: 8,
  },
  total: {
    width: "15%",
    textAlign: "right",
    height: 24,
    justifyContent: "center",
    lineHeight: 1,
    fontFamily: "Helvetica-Bold",
    paddingRight: 8,
    borderRightColor: borderColor,
    borderRightWidth: 1,
  },
});

const GstAndTotal = ({ invoice }: { invoice: Invoice }) => {
  console.log(invoice);

  const { items, round } = invoice;

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

      <View style={[styles.row, { borderBottom: 0, borderTop: 1 }]}>
        <View style={styles.description}>
          <Text>TOTAL</Text>
        </View>
        <View style={styles.total}>
          <Text>{formatCurrency(totalWithTax, round)}</Text>
        </View>
      </View>

      <InvoiceFooter total={totalWithTax} />
    </View>
  );
};

export default GstAndTotal;
