import React from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";
import { GstComponent } from "./gst";
import { useAppSelector } from "@/lib/hooks";
import { calculateGst } from "@/lib/calculategst";
import InvoiceFooter from "./invoiceFooter";
import { formatCurrency } from "@/utils";
const borderColor = "black";
const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    borderBottomColor: borderColor,
    borderBottomWidth: 1,
    alignItems: "center",
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

const gstAndTotal = ({ invoice }) => {
  const { taxType, items } = invoice;

  const { taxSummary, totalTax } = calculateGst(items);

  const TotalAmount = items
    .map((item) => item.amount)
    .reduce((accumulator, currentValue) => accumulator + currentValue, 0);

  const totalWithTax = formatCurrency(TotalAmount + totalTax[taxType]);
  const summary = taxSummary[taxType];

  console.log(summary);

  return (
    <View>
      {/* {invoice.isIgst ? (
        <GstComponent name="igst" summary={igstSummary} />
      ) : (
        <>
          <GstComponent name="cgst" summary={cgstSummary} />
          <GstComponent name="sgst" summary={sgstSummary} />
        </>
      )} */}

      <View style={[styles.row, { borderBottom: 0 }]}>
        <Text style={styles.description}>TOTAL</Text>
        <Text style={styles.total}>
          {formatCurrency(totalWithTax ? totalWithTax.toFixed(2) : 0.0)}
        </Text>
      </View>
      <InvoiceFooter total={totalWithTax.toFixed(2)} />
    </View>
  );
};

export default gstAndTotal;
