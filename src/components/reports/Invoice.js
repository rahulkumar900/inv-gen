import React from "react";
import { Page, Document, Image, StyleSheet, View } from "@react-pdf/renderer";
import InvoiceTitle from "./InvoiceTitle";
import BillTo from "./BillTo";
import InvoiceNo from "./InvoiceNo";
import InvoiceItemsTable from "./InvoiceItemsTable";
import InvoiceFooter from "./invoiceFooter";
import BankWithSign from "./bankWithSign";
import InvoiceThankYouMsg from "./InvoiceThankYouMsg";

const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 11,
    padding: 30,

    lineHeight: 1.5,
    flexDirection: "column",
  },
  logo: {
    width: 74,
    height: 66,
    marginLeft: "auto",
    marginRight: "auto",
  },
});

const Invoice = (invoice) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* <Image style={styles.logo} src="logo.png" alt="logo" fixed /> */}
        <View fixed>
          <InvoiceTitle title="Invoice" />
          <InvoiceNo invoice={invoice} />
          <BillTo invoice={invoice} />
        </View>

        <InvoiceItemsTable invoice={invoice} />
        <InvoiceFooter items={invoice.items} />
        <BankWithSign Invoice={Invoice} />
        <InvoiceThankYouMsg />
      </Page>
    </Document>
  );
};

export default Invoice;
