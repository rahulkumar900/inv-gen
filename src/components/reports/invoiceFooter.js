import React from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

const borderColor = "#90e5fc";
const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    borderBottomColor: "#bff0fd",
    // borderBottomWidth: 1,
    alignItems: "center",
    height: 24,
    fontSize: 12,
    fontStyle: "bold",
  },
  description: {
    width: "85%",
    textAlign: "left",
    borderRightColor: borderColor,
    // borderRightWidth: 1,
    paddingRight: 8,
  },
  total: {
    width: "15%",
    textAlign: "right",
    paddingRight: 8,
  },
  words: {
    width: "100%",
    textAlign: "left",
    height: 24,
  },
  wordsContainer: {
    width: "100%",
    borderTopWidth: 0,
    borderWidth: 1,
    borderColor: "#bff0fd",
  },
  bold: {
    fontWeight: "bold",
    fontSize: 12,
  },
});

const InvoiceFooter = ({ items }) => {
  return (
    <View style={styles.wordsContainer}>
      <View style={styles.row}>
        <Text style={styles.description}>Amount Chargable (in words)</Text>
        <Text style={styles.total}>E. & O.E</Text>
      </View>
      <View style={styles.words}>
        <Text style={styles.bold}>
          INR Twenty three Lakh Sixty Seven Thousand Thirty Only
        </Text>
      </View>
    </View>
  );
};

export default InvoiceFooter;