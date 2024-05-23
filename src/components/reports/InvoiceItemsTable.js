import React from "react";
import { View, StyleSheet } from "@react-pdf/renderer";
import InvoiceTableHeader from "./InvoiceTableHeader";
import InvoiceTableRow from "./InvoiceTableRow";
import InvoiceTableBlankSpace from "./InvoiceTableBlankSpace";
import GstandTotal from "./gstAndTotal";

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

const InvoiceItemsTable = ({ invoice }) => {
  const rowsCount = Number(invoice.tableRows) - Number(invoice.items.length);
  console.log(invoice.tableRows, invoice.items.length, rowsCount);
  return (
    <View style={styles.tableContainer}>
      <InvoiceTableHeader />
      <InvoiceTableRow items={invoice.items} 
      />
      <InvoiceTableBlankSpace rowsCount={rowsCount} itemsLength = {invoice.items.length}   />
      <GstandTotal invoice={invoice} />
    </View>
  );
};

export default InvoiceItemsTable;
