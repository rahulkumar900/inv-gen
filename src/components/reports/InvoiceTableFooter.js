import React from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

const borderColor = "black";
const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    borderBottomColor: borderColor,
    borderBottomWidth: 1,
    alignItems: "center",
    height: 24,
    fontSize: 12,
    fontStyle: "bold",
  },
  description: {
    width: "85%",
    textAlign: "right",
    borderRightColor: borderColor,
    borderRightWidth: 1,
    paddingRight: 8,
  },
  total: {
    width: "15%",
    textAlign: "right",
    paddingRight: 8,
  },
});

const InvoiceTableFooter = ({ items }) => {
  const total = items
    .map((item) => item.qty * item.rate)
    .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  const withgst = total + total * 0.18;
  const gstAmount = total * 0.18;

  return (
    <View>
      <View style={styles.row}>
        <Text style={styles.description}>GST(18%)</Text>
        <Text style={styles.total}>
          {Number.parseFloat(gstAmount).toFixed(2)}
        </Text>
      </View>
      <View style={[styles.row, { borderBottom: 0 }]}>
        <Text style={styles.description}>TOTAL</Text>
        <Text style={styles.total}>
          {Number.parseFloat(withgst).toFixed(2)}
        </Text>
      </View>
    </View>
  );
};

export default InvoiceTableFooter;
