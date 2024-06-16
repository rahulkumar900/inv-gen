import React from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";
import { splitFirstLine } from "@/utils";

const styles = StyleSheet.create({
  colA: {
    width: "50%",
    borderRight: 1,
    borderColor: "black",
    padding: 6,
  },
  colB: {
    width: "50%",
    padding: 6,
  },
  billTo: {
    // marginTop: 20,
    paddingBottom: 3,
  },
  col2: {
    // marginTop: 20,
    // marginBottom: 20,
    flexDirection: "row",
    // gap: 24,
    border: 1,
    borderTop: "none",
    borderColor: "black",
  },
});

const BillTo = ({ invoice }) => {
  const { firstLine, restOfText } = splitFirstLine(invoice.b_address);
  const { firstLine: s_company, restOfText: s_address } = splitFirstLine(
    invoice.s_address
  );

  return (
    <View style={styles.col2}>
      <View style={styles.colA}>
        <Text style={styles.billTo}>Bill To:</Text>
        <Text style={{ fontFamily: "Helvetica-Bold" }}>{firstLine}</Text>
        <Text>{restOfText}</Text>
      </View>
      <View style={styles.colB}>
        <Text style={styles.billTo}>Ship To:</Text>
        <Text style={{ fontFamily: "Helvetica-Bold" }}>{s_company}</Text>
        <Text>{s_address}</Text>
      </View>
    </View>
  );
};

export default BillTo;
