import React from "react";
import { View, Text, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  col2: {
    padding: 4,
    border: 1,
  },

  colA: {
    width: "50%",
  },
  colB: {
    width: "50%",
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "flex-end",
    paddingRight: 8,
  },
  billTo: {
    fontFamily: "Helvetica-Oblique",
  },
  col2: {
    flexDirection: "row",
    padding: 4,
    border: 1,
    borderTop: "none",
    borderColor: "black",
  },
  bold: {
    fontFamily: "Helvetica-Bold",
  },
});
const bankWithSign = ({ invoice }) => {
  return (
    <View style={styles.col2}>
      <View style={styles.colA}>
        <Text style={[styles.bold]}>Bank Name: {invoice.bankname}</Text>
        <Text style={[styles.bold]}>
          Account Number: {invoice.accountnumber}
        </Text>
        <Text style={[styles.bold]}>IFSC CODE: {invoice.ifsc}</Text>
      </View>

      <View style={styles.colB}>
        <Text>For {invoice.company}</Text>
        <Text>Authorized Signature</Text>
      </View>
    </View>
  );
};

export default bankWithSign;
