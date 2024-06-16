import React from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  fixedBottom: {
    position: "absolute",
    fontSize: 12,
    bottom: 0,
    left: 0,
    right: 0,
    display: "flex",
    flexDirection: "row",
    width: "100%",
    paddingHorizontal: 30,
     
    
  },
});

const InvoiceThankYouMsg = ({ pageNumber, totalPages }) => (
  <View style={styles.fixedBottom}>
    <View style={{ flexGrow: 1 }}>
      
      <Text style={{ textAlign: "center",width:"100%" }}>Thank You For Your Business</Text>
    </View>
    <Text>
      Page {pageNumber} of {totalPages}
    </Text>
  </View>
);

export default InvoiceThankYouMsg;
