import { formatCurrency } from "@/utils";
import { Document, Text, View, Page, StyleSheet } from "@react-pdf/renderer";

export default function Row({
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
        <View style={{ width: "40%", padding: 10 }}>
          <Text>{desc}</Text>
        </View>
        <View style={{ width: "20%", padding: 10 }}>
          <Text>{rate}</Text>
        </View>
        <View style={{ width: "20%", padding: 10 }}>
          <Text style={{ textAlign: "center" }}>{qty}</Text>
        </View>
        <View style={{ width: "20%", padding: 10 }}>
          <Text style={{ textAlign: "center" }}>{formatCurrency(amount)}</Text>
        </View>
      </View>
    );
  }