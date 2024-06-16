import React from "react";
import {
  Page,
  Document,
  Image,
  StyleSheet,
  View,
  Font,
} from "@react-pdf/renderer";
import InvoiceTitle from "./InvoiceTitle";
import BillTo from "./BillTo";
import InvoiceNo from "./InvoiceNo";
import InvoiceItemsTable from "./InvoiceItemsTable";
import InvoiceFooter from "./invoiceFooter";
import BankWithSign from "./bankWithSign";
import InvoiceThankYouMsg from "./InvoiceThankYouMsg";
import { Invoice as invoiceType } from "@/lib/features/invoice/invoiceType";
import { Inter } from "next/font/google";

// Font.register({
//   family: "Roboto",
//   fonts: [{ src: "./fonts/roboto/Roboto-Black.ttf", fontWeight: "bold" }],
// });

const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 11,
    padding: 30,
    paddingBottom: 0,

    lineHeight: 1.5,
    flexDirection: "column",
  },
  logo: {
    width: 74,
    height: 66,
    marginLeft: "auto",
    marginRight: "auto",
  },

  fixedBottom: {
    position: "absolute",
    fontSize: 12,
    bottom: 10,
    left: 0,
    right: 0,
    textAlign: "center",
  },
});

const Invoice = (invoice) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* <Image style={styles.logo} src="logo.png" alt="logo" fixed /> */}
        <View fixed>
          <InvoiceTitle title="TAX Invoice" />
          <InvoiceNo invoice={invoice} />
          <BillTo invoice={invoice} />
        </View>

        <InvoiceItemsTable invoice={invoice} />
        {/* <InvoiceFooter items={invoice.items} /> */}
        <View
          fixed
          render={({ pageNumber, totalPages }) =>
            pageNumber == totalPages ? (
              <View>
                <BankWithSign invoice={invoice} />
              </View>
            ) : (
              ""
            )
          }
        />
        <View
          style={styles.fixedBottom}
          fixed
          render={({ pageNumber, totalPages }) => (
            <InvoiceThankYouMsg
              pageNumber={pageNumber}
              totalPages={totalPages}
            />
          )}
        />
      </Page>
    </Document>
  );
};

export default Invoice;
