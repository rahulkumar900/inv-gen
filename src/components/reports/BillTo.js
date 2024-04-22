import React from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

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
    fontFamily: "Helvetica-Oblique",
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

const BillTo = ({ invoice }) => (
  <View style={styles.col2}>
    <View style={styles.colA}>
      <Text style={styles.billTo}>Bill To:</Text>
      <Text>{invoice.b_company}</Text>
      <Text>{invoice.b_address}</Text>
      <Text>{invoice.b_phone}</Text>
      <Text>{invoice.b_email}</Text>
      <Text>{invoice.b_gst_pan.toUpperCase()}</Text>
    </View>
    <View style={styles.colB}>
      <Text style={styles.billTo}>Ship To:</Text>
      <Text>{invoice.s_company}</Text>
      <Text>{invoice.s_address}</Text>
      <Text>{invoice.s_phone}</Text>
      <Text>{invoice.s_email}</Text>
      <Text>{invoice.s_gst_pan.toUpperCase()}</Text>
    </View>
  </View>
);

export default BillTo;
