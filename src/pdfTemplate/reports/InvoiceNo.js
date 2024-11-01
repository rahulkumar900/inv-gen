import React, { Fragment } from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";
import BillFrom from "./BillFrom";
const styles = StyleSheet.create({
  colA: {
    width: "50%",
    padding: 6,
  },
  colB: {
    width: "50%",
  },
  colBB: {
    width: "50%",
    padding: 6,
  },
  billTo: {
    paddingBottom: 3,
  },
  col2: {
    flexDirection: "row",
  },
  invoiceDateContainer: {
    flexDirection: "row",
  },
  bold: {
    fontFamily: "Helvetica-Bold",
  },
});

const InvoiceNo = ({ invoice }) => (
  <Fragment>
    <View style={styles.col2}>
      <View style={[styles.colA, { border: 1 }]}>
        <BillFrom invoice={invoice} />
      </View>
      <View
        style={[
          styles.colB,
          {
            borderRight: 1,
            borderTop: 1,
          },
        ]}
      >
        <View style={styles.col2}>
          <Text style={[styles.colA, { borderBottom: 1, borderRight: 1 }]}>
            Invoice No
          </Text>
          {/* <Text style={styles.text}>:</Text> */}
          {/* <View style={styles.colB}> */}
          <Text style={[styles.colBB, styles.bold, { borderBottom: 1 }]}>
            {invoice.invoice_no}
          </Text>
          {/* </View> */}
        </View>
        <View style={styles.col2}>
          <Text style={[styles.colA, { borderBottom: 1, borderRight: 1 }]}>
            Date
          </Text>
          {/* <Text style={styles.text}>:</Text> */}
          {/* <View style={styles.colB}> */}
          <Text style={[styles.colBB, styles.bold, { borderBottom: 1 }]}>
            {invoice.invoice_date}
          </Text>
          {/* </View> */}
        </View>
        <View style={[styles.col2, { borderBottom: 1 }]}>
          <Text style={[styles.colA, { borderRight: 1 }]}>Order No:</Text>

          <Text style={[styles.colBB, styles.bold, {}]}>
            {invoice.order_no}
          </Text>
          {/* </View> */}
        </View>
      </View>
    </View>
  </Fragment>
);

export default InvoiceNo;
