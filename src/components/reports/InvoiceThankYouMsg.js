import React from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  titleContainer: {
    position: "absolute",
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
  },
});

const InvoiceThankYouMsg = () => (
  <Text style={styles.titleContainer}>Thank You For Your Business</Text>
);

export default InvoiceThankYouMsg;
