"use client";
import React, { useState } from "react";
import { Document, Text, View, Page, StyleSheet } from "@react-pdf/renderer";
import { Invoice, Item } from "@/lib/features/invoice/invoiceType";
import { splitFirstLine } from "@/utils";
import Table from "./table";
import EmptyTable from "./emptyTable";
import Note from "./note";
import Tax from "./tax";
import { calculateGst } from "@/lib/calculategst";

const invoices = [
  { description: "Ipad Mini", price: 10, qty: 2, amount: 20 },
  { description: "Ipad Mini", price: 10, qty: 2, amount: 20 },
  { description: "Ipad Mini", price: 10, qty: 2, amount: 20 },
  { description: "Ipad Mini", price: 10, qty: 2, amount: 20 },
  { description: "Ipad Mini", price: 10, qty: 2, amount: 20 },
  // { description: "Ipad Mini", price: 10, qty: 2, amount: 20 },
];

export default function One({ invoice }: { invoice: Invoice }) {
  const [tableSize, setTableSize] = useState(6);
  const itemLength = invoice.items.length;

  if (itemLength > tableSize) {
    setTableSize(tableSize + 11);
  }

  const numEmptyRows = tableSize - itemLength;
  const { firstLine, restOfText } = splitFirstLine(invoice.address);
  console.log(invoice);

 


  return (
    <Document>
      <Page
        style={{
          paddingTop: 35,
          paddingBottom: 28,
          paddingHorizontal: 35,
          fontFamily: "Helvetica",
          width: "100%",
          height: "100%",
        }}
      >
        <View fixed={true}>
          <View style={{ display: "flex", flexDirection: "row" }}>
            <View style={{ width: "50%" }}>
              <View style={{ width: 60, height: 60, border: 1 }}>q</View>
              <Text
                style={{
                  fontFamily: "Helvetica-Bold",
                  color: "#464097",
                  marginTop: 8,
                  fontSize: 16,
                }}
              >
                {firstLine}
              </Text>
            </View>
            <View style={{ width: "50%", paddingLeft: 60 }}>
              <Text
                style={{
                  fontSize: 24,
                  maxWidth: "80%",
                  color: "#464097",
                  fontFamily: "Helvetica-Bold",
                  marginBottom: 4,

                  letterSpacing: 4,
                }}
              >
                INVOICE
              </Text>
              <Text style={{ fontSize: 14,marginBottom: 4, fontFamily: "Helvetica-Bold" }}>
                December 06, 2024
              </Text>
              <Text style={{ fontSize: 14, fontFamily: "Helvetica-Bold" }}>INV NO : 154</Text>
            </View>
          </View>

          <View
            style={{ display: "flex", flexDirection: "row", marginTop: 12 }}
          >
            <View
              style={{ width: "50%", maxHeight: 100, textOverflow: "ellipsis" }}
            >
              <Text
                style={{
                  fontSize: 12,
                  marginBottom: 7,
                  fontFamily: "Helvetica-Bold",
                }}
              >
                Office Address
              </Text>
              <Text style={{ fontSize: 12, maxWidth: "70%", lineHeight: 1.7 }}>
                {restOfText}
              </Text>
            </View>

            <View style={{ width: "50%",maxHeight: 100, textOverflow: "ellipsis", paddingLeft: 60, lineHeight: 1.7 }}>
              <Text
                style={{
                  fontSize: 12,
                  marginBottom: 7,
                  fontFamily: "Helvetica-Bold",
                }}
              >
                To:
              </Text>
              <Text style={{ fontSize: 12, maxWidth: "70%" }}>
                {invoice.s_address}
              </Text>
            </View>
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            fontFamily: "Helvetica-Bold",
            fontStyle: "bold",
            marginTop: "12",

            backgroundColor: "#464097",
            color: "white",
            fontSize: 12,
            // padding: 4,
          }}
        >
          <View style={{ width: "40%", padding: 10 }}>
            <Text>Items Description</Text>
          </View>
          <View style={{ width: "20%", padding: 10 }}>
            <Text>Unit Price</Text>
          </View>
          <View style={{ width: "20%", padding: 10 }}>
            <Text style={{ textAlign: "center" }}>Qty</Text>
          </View>
          <View style={{ width: "20%", padding: 10 }}>
            <Text style={{ textAlign: "center" }}>Amount</Text>
          </View>
        </View>

        <Table {...invoice} tableSize={tableSize} />
        <EmptyTable rowsCount={numEmptyRows} itemsLength={itemLength} />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            fontFamily: "Helvetica-Bold",
            fontStyle: "bold",
            width: "100%",
            height: "auto",
            fontSize: 13,
            // backgroundColor: "blue"
          }}
        >
          <View
            style={{
              width: "60%",

              flexDirection: "column",
              justifyContent: "flex-end",
              overflow: "hidden",
            }}
          >
            <Note />
          </View>
          <View style={{ width: "40%", height: "100%" }}>
            <Tax invoice={invoice}  />
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            padding: 14,
            height: "120",
          }}
        >
          <View
            style={{
              width: "60%",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "flex-start",
              color: "#464097",
          
            }}
          >
            <Text style={{ fontSize: 18, fontFamily: "Helvetica-Bold" }}>
              Thanks for your Business
            </Text>
          </View>
          <View
            style={{
              width: "40%",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <Text>Signature</Text>
          </View>
        </View>

        {/* <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) =>
            `${pageNumber} / ${totalPages}`
          }
          fixed
        /> */}
      </Page>
    </Document>
  );
}
