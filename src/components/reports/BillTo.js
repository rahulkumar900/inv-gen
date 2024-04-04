import React from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  headerContainer: {},
  billTo: {
    // marginTop: 20,
    paddingBottom: 3,
    fontFamily: "Helvetica-Oblique",
  },
  col2: {
    marginTop: 20,
    marginBottom: 20,
    flexDirection: "row",
    gap: 24,
  },
});

const BillTo = ({ invoice }) => (
  <View style={styles.col2}>
    <View style={styles.headerContainer}>
      <Text style={styles.billTo}>Bill To:</Text>
      <Text>{invoice.company}</Text>
      <Text>{invoice.address}</Text>
      <Text>{invoice.phone}</Text>
      <Text>{invoice.email}</Text>
    </View>
    <View style={styles.headerContainer}>
      <Text style={styles.billTo}>Ship To:</Text>
      <Text>{invoice.company}</Text>
      <Text>{invoice.address}</Text>
      <Text>{invoice.phone}</Text>
      <Text>{invoice.email}</Text>
    </View>
  </View>
);

export default BillTo;
