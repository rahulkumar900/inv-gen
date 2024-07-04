import React from "react";
import { View, Text, StyleSheet } from "@react-pdf/renderer";
import { formatCurrency } from "@/utils";

type GstProps = {
  name: string;
  summary: { [key: string]: string | number };
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
  },
  total: {
    fontSize: 16,
  },
});

export const GstComponent: React.FC<GstProps> = ({ name, summary }) => (
  <View>
    {Object.entries(summary).map(([key, value]) => (
      <View
      style={{
        flexDirection: "row",
        fontStyle: "bold",
        fontSize: 12,
      }}
        key={key}
      >

        <View style={{ width: "50%" }}>
          <Text style={{ textAlign: "left", fontStyle: "uppercase" }}>
          {`${name.toUpperCase()} ${key} %`}
          </Text>
        </View>
        <View style={{ width: "50%" }}>
          <Text style={{ textAlign: "center" }}> {typeof value === "number"
            ? formatCurrency(value.toFixed(2))
            : formatCurrency(Number.parseFloat(value).toFixed(2))}</Text>
        </View>
      </View>
    ))}
  </View>
);
