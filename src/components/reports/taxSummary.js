import React from "react";
import { View, StyleSheet } from "@react-pdf/renderer";

const tableRowsCount = 20;

const styles = StyleSheet.create({
  tableContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 24,
    borderWidth: 1,
    borderColor: "#bff0fd",
  },
});

const InvoiceItemsTable = ({ invoice }) => (
  <View style={styles.tableContainer}>
    <view style={styles.fourCol}>
      <View>HSN/SAC</View>
      <View>Taxable Value</View>
      <View style={styles.twoCol}>
        <View></View>
        <View></View>
      </View>
      <View></View>
    </view>
  </View>
);

export default InvoiceItemsTable;
