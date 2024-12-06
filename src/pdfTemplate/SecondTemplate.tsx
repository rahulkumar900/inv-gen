import React from "react";

import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
  Image,
} from "@react-pdf/renderer";
import { Invoice, Item } from "@/lib/features/invoice/invoiceType";
import { formatCurrency, splitFirstLine } from "@/utils";
import { calculateGst } from "@/lib/calculategst";

type TaxOption = "notax" | "gst" | "igst" | "cgstigst";

// Create styles
const styles = StyleSheet.create({
  page: {
    padding: 40,
  },
  section: {
    marginBottom: 25,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 25,
  },
  logo: {
    width: 60,
    height: 60,
    display: "flex",
  },
  //   invoice: {
  //     textAlign: "right",
  //   },
  addressSection: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: "20px",
    gap: "15px",
  },
  address: {
    width: "33%",
    lineHeight: 1.3,
  },
  table: {
    // display: "table",
    width: "100%",
  },
  tableRow: {
    flexDirection: "row",
    borderBottom: "0.1px solid black",
  },
  tableColHeader: {
    border: 0,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#024751",
    color: "white",
    padding: "10px",
    textAlign: "center",
    fontWeight: "bold",
  },
  tableBody: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    flexShrink: 0,
    justifyContent: "center",
    // borderStyle: 'solid',
    // borderWidth: "0.2px",
    // borderLeftWidth: 0,
    // borderTopWidth: 0,
    borderBottom: "0.1px",
    borderStyle: "solid",
    padding: 8,
    minHeight: "35px",
    // height: "20px",
    // backgroundColor: "green",
  },
  tableCol: {
    width: "25%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: 8,
    textAlign: "center",
  },
  total: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",

    alignItems: "center",
    backgroundColor: "#d3dc4c",
  },
  totalLabel: {
    width: "75%",
    padding: 8,
    backgroundColor: "#d3dc4c",
    textAlign: "right",
    fontWeight: "bold",
  },
  totalValue: {
    width: "25%",
    padding: 8,
    textAlign: "center",
  },
  footer: {
    marginTop: 20,
    textAlign: "center",
  },
  invoiceType: {
    fontWeight: "bold",
    color: "#024751",
    fontFamily: "Helvetica-Bold",
  },
  invoiceNumber: {
    textAlign: "right",
    justifyContent: "center",
    fontSize: "12px",
    color: "#024751",
  },
  invoiceDetails: {
    textAlign: "right",
    alignItems: "flex-end",
    gap: "3px",
  },
  invoice: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    justifyContent: "center",
    gap: "10px",
  },
  smallText: {
    fontSize: "10px",
  },
  textMd: {
    fontSize: "12px",
  },
  horizontalLine: {
    borderBottom: "1px",
    borderStyle: "dashed",
    borderColor: "#024751",
    display: "flex",
  },
  wHalf: {
    width: "50%",
  },
  bold: {
    fontFamily: "Helvetica-Bold",
  },
});

// Dynamic Table
const DynamicTable = ({
  items,
  totalRows = 7,
  taxType = "notax",
}: {
  items: Item[];
  totalRows?: number;
  taxType: TaxOption;
}) => {
  const initialRows = totalRows; // Initial rows count
  const rowIncrement = 12; // Rows to add each time items exceed the limit

  // Calculate the total rows needed
  const dynamicTotalRows =
    items.length > initialRows
      ? initialRows +
        Math.ceil((items.length - initialRows) / rowIncrement) * rowIncrement
      : initialRows;

  return (
    <View>
      {Array.from({ length: dynamicTotalRows }).map((_, index) => {
        const item = items[index] || {}; // Use an empty object for blank rows
        const taxes = item.taxes || {};

        const { des = "", qty = "", rate = "", amount = "" } = item;

        return (
          <View style={styles.tableRow} key={index} break={index === 12}>
            <View
              style={[styles.tableBody, { width: "30%", textAlign: "left" }]}
            >
              <Text style={styles.smallText}>{item.desc || " "}</Text>
            </View>
            <View style={[styles.tableBody, { width: "15%" }]}>
              <Text style={styles.smallText}>{item.qty || " "}</Text>
            </View>
            <View style={[styles.tableBody, { width: "20%" }]}>
              <Text style={styles.smallText}>
                {formatCurrency(item.rate) || " "}
              </Text>
            </View>
            <View style={[styles.tableBody, { width: "10%" }]}>
              <Text style={styles.smallText}>{taxes.taxType > 0 || " "}</Text>
            </View>
            <View style={[styles.tableBody, { width: "25%" }]}>
              <Text style={styles.smallText}>
                {formatCurrency(item.amount) || " "}
              </Text>
            </View>
          </View>
        );
      })}
    </View>
  );
};

// Gst Summary

const TaxSummary = ({ invoice }: { invoice: Invoice }) => {
  const { taxType, items, terms } = invoice;

  // Calculate GST and total tax
  const { taxSummary, totalTax } = calculateGst(invoice.items);
  const summary = taxSummary[taxType];

  return (
    <>
      {Object.entries(summary) && Object.entries(summary).length > 0 ? (
        <View>
          {Object.entries(summary).map(([key, value]) =>
            taxType !== "cgstigst" ? (
              <View style={[styles.tableRow]} key={key}>
                <View
                  style={[
                    styles.tableBody,
                    styles.smallText,
                    { width: "44.45%" },
                  ]}
                >
                  <Text style={[styles.smallText, { textAlign: "right" }]}>
                    {taxType.toUpperCase()}
                    {key} %
                  </Text>
                </View>
                <View
                  style={[
                    styles.tableBody,
                    styles.smallText,
                    { width: "55.55%" },
                  ]}
                >
                  <Text style={[styles.smallText]}>
                    {formatCurrency(value)}
                  </Text>
                </View>
              </View>
            ) : (
              <React.Fragment key={key}>
                <View style={[styles.tableRow]}>
                  <View
                    style={[
                      styles.tableBody,
                      styles.smallText,
                      { width: "29%" },
                    ]}
                  >
                    <Text style={[styles.smallText]}>
                      {`${"cgst".toUpperCase()} ${Number(key) / 2} %`}
                    </Text>
                  </View>
                  <View
                    style={[
                      styles.tableBody,
                      styles.smallText,
                      { width: "71%" },
                    ]}
                  >
                    <Text style={[styles.smallText]}>
                      {formatCurrency(value)}
                    </Text>
                  </View>
                </View>
                <View style={[styles.tableRow]}>
                  <View
                    style={[
                      styles.tableBody,
                      styles.smallText,
                      { width: "29%" },
                    ]}
                  >
                    <Text style={[styles.smallText]}>
                      {`SGST${Number(key) / 2} %`}
                    </Text>
                  </View>
                  <View
                    style={[
                      styles.tableBody,
                      styles.smallText,
                      { width: "71%" },
                    ]}
                  >
                    <Text style={[styles.smallText]}>
                      {formatCurrency(value / 2)}
                    </Text>
                  </View>
                </View>
              </React.Fragment>
            )
          )}
        </View>
      ) : null}
    </>
  );
};

export default function SecondDesign({ invoice }: { invoice: Invoice }) {
  // seperate Compamy name and address
  const { firstLine, restOfText } = splitFirstLine(invoice.address);
  const { firstLine: b_company, restOfText: b_address } = splitFirstLine(
    invoice.b_address
  );
  const { firstLine: s_company, restOfText: s_address } = splitFirstLine(
    invoice.s_address
  );

  const { items, taxType, terms } = invoice;
  // Calculate GST and total tax
  const { totalTax } = calculateGst(invoice.items);
  // Sum up the total amount from the items array
  const totalAmount = items
    .map((item) => item.amount)
    .reduce((accumulator, currentValue) => accumulator + currentValue, 0);

  // Assuming taxType is defined elsewhere, or can be extracted from invoice
  // const taxType = invoice.taxType; // Assuming this is TaxOption
  const totalWithTax = totalAmount + (totalTax[taxType] || 0);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View fixed={true}>
          <View style={styles.header}>
            <View style={styles.logo}>

               {/* eslint-disable-next-line jsx-a11y/alt-text */}

              {invoice.logo && <Image src={invoice.logo} />}
            </View>
            {/* <Image style={styles.logo} src={invoice?.logo} /> */}
            <View style={styles.invoice}>
              <Text style={styles.invoiceType}>INVOICE</Text>
              <View style={styles.invoiceDetails}>
                <Text style={[styles.invoiceNumber, styles.textMd]}>
                  #{invoice.invoice_no}
                </Text>
                <Text style={styles.smallText}>
                  Date: {invoice.invoice_date}
                </Text>
                <Text style={styles.smallText}>Due Date: working..</Text>
              </View>
            </View>
          </View>

          <View
            style={[
              styles.horizontalLine,
              { marginBottom: "25px", color: "#024751" },
            ]}
          ></View>

          <View style={styles.addressSection}>
            <View style={styles.address}>
              <Text
                style={[
                  styles.textMd,
                  styles.bold,
                  { marginBottom: "5px", color: "#024751" },
                ]}
              >
                BIll FROM
              </Text>
              <Text style={styles.smallText}>{firstLine}</Text>
              <Text style={styles.smallText}>{restOfText}</Text>
              {/* <Text style={styles.smallText}>1 3455 6783</Text>
            <Text style={styles.smallText}>joystick@market.com</Text> */}
            </View>
            <View style={styles.address}>
              <Text
                style={[
                  styles.textMd,
                  styles.bold,
                  { marginBottom: "5px", color: "#024751" },
                ]}
              >
                BILL TO
              </Text>
              <Text style={styles.smallText}>{b_company}</Text>
              <Text style={styles.smallText}>{b_address}</Text>
              {/* <Text style={styles.smallText}>1 7654 2384</Text>
            <Text style={styles.smallText}>celinebrian@mail.com</Text> */}
            </View>
            <View style={styles.address}>
              <Text
                style={[
                  styles.textMd,
                  styles.bold,
                  { marginBottom: "5px", color: "#024751" },
                ]}
              >
                SHIP TO
              </Text>
              <Text style={styles.smallText}>{s_company}</Text>
              <Text style={styles.smallText}>{s_address}</Text>
              {/* <Text style={styles.smallText}>1 7654 2384</Text>
            <Text style={styles.smallText}>celinebrian@mail.com</Text> */}
            </View>
          </View>
        </View>

        <View style={styles.table}>
          {/* // Header of Table */}
          <View style={styles.tableRow}>
            <View
              style={[
                styles.tableColHeader,
                styles.smallText,
                { width: "30%" },
              ]}
            >
              <Text style={[styles.smallText]}>Product Description</Text>
            </View>
            <View
              style={[
                styles.tableColHeader,
                styles.smallText,
                { width: "15%" },
              ]}
            >
              <Text style={[styles.smallText]}>Quantity</Text>
            </View>
            <View
              style={[
                styles.tableColHeader,
                styles.smallText,
                { width: "20%" },
              ]}
            >
              <Text style={[styles.smallText]}>Price</Text>
            </View>
            <View
              style={[
                styles.tableColHeader,
                styles.smallText,
                { width: "10%" },
              ]}
            >
              <Text style={[styles.smallText]}>Tax</Text>
            </View>
            <View
              style={[
                styles.tableColHeader,
                styles.smallText,
                { width: "25%" },
              ]}
            >
              <Text style={[styles.smallText]}>Amount</Text>
            </View>
          </View>
          {/* Table */}
          <DynamicTable
            items={invoice.items}
            totalRows={7}
            taxType={invoice.taxType}
          />

          {/*  Terms and conditions and Tax summary row*/}
          <View style={[styles.tableRow, { gap: "10px" }]}>
            {/* Terma and conditions  */}
            <View
              style={[
                styles.smallText,
                { width: "55%", padding: "8px", fontWeight: "bold" },
              ]}
            >
              <Text style={[styles.textMd, { color: "#024751" }]}>
                Terms and Consitions{" "}
              </Text>
              <Text
                style={[styles.smallText, { lineHeight: 1.3, marginTop: "5" }]}
              >
                {terms}
              </Text>
            </View>
            {/*  */}
            <View style={[{ width: "45%" }]}>
              {/* Tax Summary  */}
              <TaxSummary invoice={invoice} />
              {/* // Toatal Amount /////////////////////////////////// */}
              <View style={[styles.total, styles.tableRow]}>
                <View
                  style={[
                    styles.totalLabel,
                    styles.smallText,
                    { width: "44.45%" },
                  ]}
                >
                  <Text style={styles.bold}>Total Amount</Text>
                </View>
                <View
                  style={[
                    styles.totalValue,
                    styles.textMd,
                    { width: "55.55%" },
                  ]}
                >
                  <Text style={styles.bold}>
                    {formatCurrency(totalWithTax)}
                  </Text>
                </View>
              </View>
              {/* ///////////////////////////////////// */}
            </View>
          </View>
          {/* // //// */}
        </View>

        <View style={{ marginTop: "25px" }}>
          <Text style={[styles.footer, styles.textMd]}>
            Thank you for your patience and understanding.
          </Text>
        </View>
      </Page>
    </Document>
  );
}
