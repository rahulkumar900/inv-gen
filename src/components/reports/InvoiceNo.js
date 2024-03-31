import React, { Fragment } from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";
import BillFrom from "./BillFrom";
const styles = StyleSheet.create({
  invoiceNoContainer: {
    flexDirection: "row",
    marginTop: 36,
    justifyContent: "flex-end",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // border: "1px solid gray",
  },
  col: {
    flexDirection: "column",
    // border: "1px solid gray",
    width: "40%",
  },
  invoiceDateContainer: {
    flexDirection: "row",
    alignItems: "center",
    //  gap: 10,
    justifyContent: "space-between",
  },
  textC: {
    width: "50%",
  },
  text: {
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "left",
  },
  label: {
    width: "40%",
    // border: "1px solid gray",
    textAlign: "left",
  },
});

const InvoiceNo = ({ invoice }) => (
  <Fragment>
    <View style={styles.row}>
      <BillFrom invoice={invoice} />
      <View style={styles.col}>
        <View style={styles.invoiceDateContainer}>
          <Text style={styles.label}>Invoice No</Text>
          <Text style={styles.text}>:</Text>
          <View style={styles.textC}>
            <Text style={styles.text}>{invoice.invoice_no}</Text>
          </View>
        </View>
        <View style={styles.invoiceDateContainer}>
          <Text style={styles.label}>Date</Text>
          <Text style={styles.text}>:</Text>
          <View style={styles.textC}>
            <Text style={styles.text}>{invoice.trans_date}</Text>
          </View>
        </View>
        <View style={styles.invoiceDateContainer}>
          <Text style={styles.label}>Order No: </Text>
          <Text style={styles.text}>:</Text>
          <View style={styles.textC}>
            <Text style={styles.text}>{invoice.order_no}</Text>
          </View>
        </View>
        <View style={styles.invoiceDateContainer}>
          <Text style={styles.label}>Order No</Text>
          <Text style={styles.text}>:</Text>
          <View style={styles.textC}>
            <Text style={styles.text}>{invoice.order_number}</Text>
          </View>
        </View>
      </View>
    </View>
  </Fragment>
);

export default InvoiceNo;
