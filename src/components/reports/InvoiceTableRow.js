import React, { Fragment } from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";
import { formatCurrency } from "@/utils";

const borderColor = "black";
const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    borderBottomColor: borderColor,
    borderBottomWidth: 1,
    alignItems: "center",
    height: 24,
    fontStyle: "bold",
  },
  slno: {
    width: "10%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRightColor: borderColor,
    borderRightWidth: 1,
    borderLeftColor: borderColor,
    borderLeftWidth: 1,
  },
  description: {
    width: "50%",
    height: "100%",
    textAlign: "left",
    justifyContent: "center",
    borderRightColor: borderColor,
    borderRightWidth: 1,
    paddingLeft: 8,
  },
  qty: {
    width: "10%",
    height: "100%",
    borderRightColor: borderColor,
    justifyContent: "center",
    borderRightWidth: 1,
    textAlign: "right",
    paddingRight: 8,
  },
  rate: {
    width: "15%",
    justifyContent: "center",
    height: "100%",
    borderRightColor: borderColor,
    borderRightWidth: 1,
    textAlign: "right",
    paddingRight: 8,
  },
  amount: {
    width: "15%",
    height: "100%",
    textAlign: "right",
    justifyContent: "center",
    paddingRight: 8,
    borderRightColor: borderColor,
    borderRightWidth: 1,
  },
});

const InvoiceTableRow = ({ items }) => {
  const rows = items.map((item, i) => (
    <View
      break={(i + 1) % 18 == 0}
      style={styles.row}
      key={item.sno.toString()}
    >
      <View style={styles.slno}>
        <Text>{i + 1}</Text>
      </View>
      <View style={styles.description}>
        <Text>{item.desc}</Text>
      </View>
      <View style={styles.qty}>
        <Text>{item.qty}</Text>
      </View>
      <View style={styles.rate}>
        <Text>{item.rate}</Text>
      </View>
      <View style={styles.amount}>
        <Text>{formatCurrency((item.qty * item.rate).toFixed(2))}</Text>
      </View>
    </View>
  ));
  return <Fragment>{rows}</Fragment>;
};

export default InvoiceTableRow;
