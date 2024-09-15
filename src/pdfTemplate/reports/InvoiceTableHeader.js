import React from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

const borderColor = "black";
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderBottomColor: borderColor,
    // backgroundColor: borderColor,
    borderBottomWidth: 1,
    alignItems: "center",
    height: 24,
    textAlign: "center",
    fontStyle: "bold",
    flexGrow: 1,
    margin: 0,
  },
  slno: {
    width: "10%",
    alignItems: "center",
    justifyContent: "center",

    alignItem: "center",
    height: 24,
    borderRightColor: borderColor,
    borderRightWidth: 1,
    borderLeftColor: borderColor,
    borderLeftWidth: 1,
   
  },
  description: {
    width: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    // flexShrink: 0,
    height: "100%",
    borderRightColor: borderColor,
    borderRightWidth: 1,
  },
  qty: {
    width: "10%",
    alignItems: "center",
    justifyContent: "center",
    alignItem: "center",
    height: "100%",
    borderRightColor: borderColor,
    borderRightWidth: 1,
  },
  rate: {
    width: "15%",
    alignItems: "center",
    justifyContent: "center",
    alignItem: "center",
    height: "100%",
    borderRightColor: borderColor,
    borderRightWidth: 1,
  },
  amount: {
    width: "15%",
    alignItems: "center",
    justifyContent: "center",
    alignItem: "center",
    height: "100%",
    borderRightColor: borderColor,
    borderRightWidth: 1,
  },
});

const InvoiceTableHeader = () => (
  <View style={styles.container} fixed>
    <View style={styles.slno}>
      <Text style={{ lineHeight: 1 }}>Sl. No.</Text>
    </View>

    <View style={styles.description}>
      <Text>Item Description</Text>
    </View>
    <View style={styles.qty}>
      <Text>Qty.</Text>
    </View>
    <View style={styles.rate}>
      <Text>Rate</Text>
    </View>
    <View style={styles.amount}>
      <Text>Amount</Text>
    </View>
  </View>
);

export default InvoiceTableHeader;
