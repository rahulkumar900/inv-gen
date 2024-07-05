import { Document, Text, View, Page, StyleSheet } from "@react-pdf/renderer";
export default function EmptyRow() {
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
          <Text></Text>
        </View>
        <View style={{ width: "20%", padding: 10 }}>
          <Text></Text>
        </View>
        <View style={{ width: "20%", padding: 10 }}>
          <Text style={{ textAlign: "center" }}></Text>
        </View>
        <View style={{ width: "20%", padding: 10 }}>
          <Text style={{ textAlign: "center" }}></Text>
        </View>
      </View>
    );
  }