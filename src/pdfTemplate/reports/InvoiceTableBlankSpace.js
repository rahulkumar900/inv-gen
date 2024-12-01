import React, { Fragment } from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

const borderColor = "black";
const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    // borderBottomColor: borderColor,
    // borderBottomWidth: 1,
    alignItems: "center",
    height: 24,
    // fontStyle: "bold",
    // color: "white",
  },
  slno: {
    width: "10%",
    height: "100%",
    borderRightColor: borderColor,
    borderRightWidth: 1,
    borderLeftColor: borderColor,
    borderLeftWidth: 1,
  },
  description: {
    width: "50%",
    height: "100%",
    borderRightColor: borderColor,
    borderRightWidth: 1,
  },
  qty: {
    width: "10%",
    height: "100%",
    borderRightColor: borderColor,
    borderRightWidth: 1,
  },
  rate: {
    width: "15%",
    height: "100%",
    borderRightColor: borderColor,
    borderRightWidth: 1,
  },
  amount: {
    width: "15%",
    height: "100%",
    borderRightColor: borderColor,
    borderRightWidth: 1,
  },
});

const InvoiceTableBlankSpace = ({ rowsCount, itemsLength }) => {
  const blankRows = Array(rowsCount).fill(0);
  const rows = blankRows.map((x, i) => (
    <View
      style={styles.row}
      key={`BR${i}`}
      break={(i + Number(itemsLength)) % 18 == 0}
    >
      <Text style={styles.slno}></Text>
      <Text style={styles.description}></Text>
      <Text style={styles.qty}></Text>
      <Text style={styles.rate}></Text>
      <Text style={styles.amount}></Text>
    </View>
  ));
  return <Fragment>{rows}</Fragment>;
};

export default InvoiceTableBlankSpace;
