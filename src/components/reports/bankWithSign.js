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
});
const bankWithSign = ({ invoice }) => {
  return (
    <View style={styles.col2}>
      <View style={styles.colA}>
        <Text>Bank Name: HDFC BANK</Text>
        <Text>Account Number: 578210110001042</Text>
        <Text>IFSC CODE: BKID0005782</Text>
      </View>

      <View style={styles.colB}>
        <Text style={{ fontWeight: "bold" }}>Authorized Signature</Text>
      </View>
    </View>
  );
};

export default bankWithSign;
