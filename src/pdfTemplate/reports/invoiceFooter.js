import React from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";
import { ToWords } from "to-words";

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
    minHeight: 24,
    fontFamily: "Helvetica-Bold",
    flexGrow: 1,
  },
  wordsContainer: {
    width: "100%",
    padding: 4,
    borderTopWidth: 0,

    borderWidth: 1,
    // borderColor: "#bff0fd",
  },
  bold: {
    fontWeight: "bold",
    fontSize: 12,
    flexGrow: 1,
  },
});

const InvoiceFooter = ({ total }) => {
  const toWords = new ToWords();

  let words = total && toWords.convert(total, { currency: true });
  // console.log(words);
  return (
    <View style={styles.wordsContainer}>
      <View style={styles.row}>
        <Text style={styles.description}>Amount Chargable (in words)</Text>
        <Text style={styles.total}>E. & O.E</Text>
      </View>
      <View style={styles.words}>
        <Text style={styles.bold}>{words}</Text>
      </View>
    </View>
  );
};

export default InvoiceFooter;
