import React from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";
import { splitFirstLine } from "@/utils";


const styles = StyleSheet.create({
  headerContainer: {
    // marginTop: 36,
  },
  billTo: {
    // marginTop: 20,
    paddingBottom: 3,
    fontFamily: "Helvetica-Oblique",
  },
});

const BillFrom = ({ invoice }) => {
  const { firstLine, restOfText } = splitFirstLine(invoice.address);
  console.log(firstLine, restOfText);
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.billTo}>Bill From:</Text>
      <Text
        style={{fontFamily: "Helvetica-Bold"}}
      >
        {firstLine}
      </Text>
      <Text>{restOfText}</Text>
      <Text>{invoice.gst_pan.toUpperCase()}</Text>
    </View>
  );
};

export default BillFrom;
