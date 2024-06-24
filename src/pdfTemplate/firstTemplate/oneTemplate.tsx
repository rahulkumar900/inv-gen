import React, { useState } from "react";
import { Document, Text, View, Page, StyleSheet } from "@react-pdf/renderer";
import { useTheme } from "@/pdfComponent/themeContext";
import { Description } from "@radix-ui/react-dialog";
import { FileX } from "lucide-react";
import { Invoice, Item } from "@/lib/features/invoice/invoiceType";
import { splitFirstLine } from "@/utils";

const invoices = [
  { description: "Ipad Mini", price: 10, qty: 2, amount: 20 },
  { description: "Ipad Mini", price: 10, qty: 2, amount: 20 },
  { description: "Ipad Mini", price: 10, qty: 2, amount: 20 },
  { description: "Ipad Mini", price: 10, qty: 2, amount: 20 },
  { description: "Ipad Mini", price: 10, qty: 2, amount: 20 },
  // { description: "Ipad Mini", price: 10, qty: 2, amount: 20 },
];

function Tax() {
  return (
    <>
      <View
        style={{
          flexDirection: "row",
          fontStyle: "bold",
          fontSize: 12,
          paddingHorizontal: 4,
          paddingTop: 28,
        }}
      >
        <View style={{ width: "50%" }}>
          <Text style={{ textAlign: "left", fontStyle: "uppercase" }}>
            SUBTOTAL :
          </Text>
        </View>
        <View style={{ width: "50%" }}>
          <Text style={{ textAlign: "center" }}>5225</Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          fontStyle: "bold",
          paddingVertical: 7,
          paddingHorizontal: 4,
          marginVertical: 7,
          fontSize: 12,

          // paddingTop: 4,
        }}
      >
        <View style={{ width: "50%" }}>
          <Text style={{ textAlign: "left", fontStyle: "uppercase" }}>
            TAX :
          </Text>
        </View>
        <View style={{ width: "50%" }}>
          <Text style={{ textAlign: "center" }}>25</Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          fontStyle: "bold",
          // flex: 1,
          color: "white",

          fontSize: 12,
          backgroundColor: "#464097",
          paddingVertical: 7,
          marginVertical: 7,
          paddingHorizontal: 4,
          // paddingTop: 7,
        }}
      >
        <View style={{ width: "50%" }}>
          <Text style={{ textAlign: "left", fontStyle: "uppercase" }}>
            TOTAL DUE :
          </Text>
        </View>
        <View style={{ width: "50%" }}>
          <Text style={{ textAlign: "center" }}>25585</Text>
        </View>
      </View>
    </>
  );
}

function Note() {
  return (
    <View style={{ paddingHorizontal: 14, paddingVertical: 28 }}>
      <Text>Note : </Text>
      <Text
        style={{
          fontFamily: "Helvetica",
          fontSize: 11,
          marginTop: 4,
          lineHeight: 1.2,
          textOverflow: "ellipsis",
        }}
      >
        Payment should be within 15 days of delivery,React-pdf is shipped with a
        Font module that enables to load fonts from different sources, handle
        how words are wrapped and defined an emoji source to embed these glyphs
        on your document.
      </Text>
    </View>
  );
}

function Row({
  desc,
  rate,
  qty,
  amount,
}: {
  desc: string;
  rate: number;
  qty: number;
  amount: number;
}) {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        fontStyle: "bold",
        // marginTop: "24",

        // backgroundColor: "#464097",
        // color: "white",
        fontSize: 12,
        padding: 5,
        borderBottom: 1,
      }}
    >
      <View style={{ width: "40%", padding: 14 }}>
        <Text>{desc}</Text>
      </View>
      <View style={{ width: "20%", padding: 14 }}>
        <Text>{rate}</Text>
      </View>
      <View style={{ width: "20%", padding: 14 }}>
        <Text style={{ textAlign: "center" }}>{qty}</Text>
      </View>
      <View style={{ width: "20%", padding: 14 }}>
        <Text style={{ textAlign: "center" }}>{amount}</Text>
      </View>
    </View>
  );
}
function EmptyRow() {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        fontStyle: "bold",
        // marginTop: "24",

        // backgroundColor: "#464097",
        // color: "white",
        fontSize: 12,
        padding: 5,
        borderBottom: 1,
      }}
    >
      <View style={{ width: "40%", padding: 14 }}>
        <Text>-</Text>
      </View>
      <View style={{ width: "20%", padding: 14 }}>
        <Text>-</Text>
      </View>
      <View style={{ width: "20%", padding: 14 }}>
        <Text style={{ textAlign: "center" }}>-</Text>
      </View>
      <View style={{ width: "20%", padding: 14 }}>
        <Text style={{ textAlign: "center" }}>-</Text>
      </View>
    </View>
  );
}

function Table({ items,tableSize }: { items: Item[],tableSize: number }) {
  const itemsLenght = items.length;
  const ematyRows = tableSize - itemsLenght;

  console.log(items);

  return (
    <>
      {items &&
        items.length &&
        items.map((item, i) => <Row key={i} {...item} />)}
    </>
  );
}
function EmptyTable(rowsCount: number, itemsLength: number) {
  return (
    <>
      {rowsCount &&
        Array(rowsCount)
          .fill(0)
          .map((_, i) => <EmptyRow key={i} />)}
    </>
  );
}

export default function One({ invoice }: { invoice: Invoice }) {
  const tableSize = 6;
  const { firstLine, restOfText } = splitFirstLine(invoice.address);
  console.log(invoice);
  return (
    <Document>
      <Page
        style={{
          paddingTop: 35,
          paddingBottom: 35,
          paddingHorizontal: 35,
          fontFamily: "Helvetica",
          width: "100%",
          height: "100%",
        }}
      >
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
            <Text style={{ fontSize: 14, fontFamily: "Helvetica-Bold" }}>
              December 06, 2024
            </Text>
          </View>
        </View>

        <View style={{ display: "flex", flexDirection: "row", marginTop: 24 }}>
          <View style={{ width: "50%" }}>
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

          <View style={{ width: "50%", paddingLeft: 60, lineHeight: 1.7 }}>
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
              4th Floor N.P Tower Kankarbagh Patna 80020
            </Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            fontFamily: "Helvetica-Bold",
            fontStyle: "bold",
            marginTop: "24",

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
        <EmptyTable rowsCount={}  />
        <view
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
          <view style={{ width: "40%", height: "100%" }}>
            <Tax />
          </view>
        </view>

        <View
          style={{
            flexDirection: "row",
            padding: 14,
            height: "130",
          }}
        >
          <View
            style={{
              width: "60%",
              display: "flex",

              flexDirection: "column",
              height: "100%",
              alignItems: "flex-start",
              justifyContent: "flex-start",
              color: "#464097",
              flex: 1,
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
