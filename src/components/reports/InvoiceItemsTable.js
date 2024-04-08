import React from "react";
import { View, StyleSheet } from "@react-pdf/renderer";
import InvoiceTableHeader from "./InvoiceTableHeader";
import InvoiceTableRow from "./InvoiceTableRow";
import InvoiceTableBlankSpace from "./InvoiceTableBlankSpace";
import InvoiceTableFooter from "./InvoiceTableFooter";

const tableRowsCount = 13;

const styles = StyleSheet.create({
  tableContainer: {
    flexDirection: "row",
    flexWrap: "wrap",

    borderWidth: 1,
    borderBottom: 0,
    borderTop: 0,
    borderColor: "black",
  },
});

const InvoiceItemsTable = ({ invoice }) => (
  <View style={styles.tableContainer}>
    <InvoiceTableHeader />
    <InvoiceTableRow items={invoice.items} />
    <InvoiceTableBlankSpace rowsCount={tableRowsCount - invoice.items.length} />
    <InvoiceTableFooter items={invoice.items} />
  </View>
);

export default InvoiceItemsTable;
