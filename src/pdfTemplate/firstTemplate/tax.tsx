import { Document, Text, View, Page, StyleSheet } from "@react-pdf/renderer";
import { GstComponent } from "./gstcomponent";
import { Invoice } from "@/lib/features/invoice/invoiceType";
import { calculateGst } from "@/lib/calculategst";
import { formatCurrency } from "@/utils";

export default function Tax({ invoice }: { invoice: Invoice }) {
  const {
    cgstSummary,
    sgstSummary,
    igstSummary,
    totalCgst,
    totalSgst,
    totalIgst,
  } = calculateGst(invoice.items);

  const TotalAmount = invoice.items
    .map((item) => item.amount)
    .reduce((accumulator, currentValue) => accumulator + currentValue, 0);

  console.log(typeof TotalAmount);

  const totalWithTax = invoice.isIgst
    ? TotalAmount + totalIgst
    : TotalAmount + totalCgst + totalSgst;
  return (
    <>
      <View
        style={{
          flexDirection: "row",
          fontStyle: "bold",
          fontSize: 12,
        marginBottom:7,
          paddingTop: 28,
         
        }}
      >
        <View style={{ width: "50%" }}>
          <Text style={{ textAlign: "left", fontStyle: "uppercase", }}>
          SUBTOTAL :
          </Text>
        </View>
        <View style={{ width: "50%" }}>
          <Text style={{ textAlign: "center" }}>{formatCurrency(TotalAmount)}</Text>
        </View>
      </View>
      <View 
      >
        {invoice.isIgst ? (
          <GstComponent name="igst" summary={igstSummary} />
        ) : (
          <>
            <GstComponent name="cgst" summary={cgstSummary} />
            <GstComponent name="sgst" summary={sgstSummary} />
          </>
        )}
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
          marginTop: 7,
          paddingHorizontal: 4,
        }}
      >
        <View style={{ width: "50%" }}>
          <Text style={{ textAlign: "left", fontStyle: "uppercase" }}>
            TOTAL DUE :
          </Text>
        </View>
        <View style={{ width: "50%" }}>
          <Text style={{ textAlign: "center" }}>{formatCurrency(totalWithTax)}</Text>
        </View>
      </View>
    </>
  );
}
