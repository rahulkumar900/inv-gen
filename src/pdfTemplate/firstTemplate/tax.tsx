import { Document, Text, View, Page, StyleSheet } from "@react-pdf/renderer";

export default function Tax({total}:{total: number}) {
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
            <Text style={{ textAlign: "center" }}>{total}</Text>
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