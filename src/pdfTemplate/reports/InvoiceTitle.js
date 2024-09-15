import React from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    textAlign: "center",
    justifyContent: "center",
    // marginTop: 24,
  },
  reportTitle: {
    color: "black",
    letterSpacing: 4,
    fontSize: 18,
    textAlign: "center",
    fontWeight: "extrabold",
    fontFamily: "Helvetica-Bold",
    textTransform: "uppercase",
  },
});

const InvoiceTitle = ({ title }) => (
  <View style={styles.titleContainer}>
    <Text style={styles.reportTitle}>{title}</Text>
  </View>
);

export default InvoiceTitle;
