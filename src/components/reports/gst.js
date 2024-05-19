import { Text, View, StyleSheet } from "@react-pdf/renderer";
import React from "react";

const borderColor = "black";
const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    borderBottomColor: borderColor,
    borderBottomWidth: 1,
    alignItems: "center",
    height: 24,
    fontSize: 12,
    fontWeight: "bold",
  },
  description: {
    width: "85%",
    textAlign: "right",
    borderRightColor: borderColor,
    borderRightWidth: 1,
    paddingRight: 8,
  },
  total: {
    width: "15%",
    textAlign: "right",
    paddingRight: 8,
  },
});

export const GstComponent = ({ name, isIgst, summary }) => (
  <View>
    {Object.entries(summary).map(([key, value]) => (
      <View style={styles.row} key={key}>
        <Text style={styles.description}>
          {`${name.toUpperCase()} ${key} %`}
        </Text>
        <Text style={styles.total}>
          {Number.parseFloat(value).toFixed(2)}
        </Text>
      </View>
    ))}
  </View>
);
