import { formatCurrency } from "@/utils";
import { Text, View, StyleSheet } from "@react-pdf/renderer";
import React from "react";

const borderColor = "black";
const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    display: "flex",
    alignItems: "center",
    height: 24,
    fontSize: 12,
  },
  description: {
    width: "85%",
    // height: "100%",
    height: 24,
    textAlign: "right",
    
    justifyContent: "center",
lineHeight:1,
    borderTopColor: borderColor,
    borderTopWidth: 1,
    borderRightColor: borderColor,
    borderRightWidth: 1,
    borderLeftColor: borderColor,
    borderLeftWidth: 1,
    paddingRight: 8,
  },
  total: {
    width: "15%",
    
    justifyContent: "center",
    height: 24,
    textAlign: "right",
    paddingRight: 8,
    borderTopWidth: 1,
    lineHeight:1,
    borderRightColor: borderColor,
    borderRightWidth: 1,
  },
});

export const GstComponent = ({ name, summary }) => (
  <>
    {Object.entries(summary) && Object.entries(summary).length > 0 ? (
      <View>
        {Object.entries(summary).map(([key, value]) =>
          name !== "cgstigst" ? (
            <View style={[styles.row]} key={key}>
              <View style={styles.description}>
                <Text>{`${name.toUpperCase()} ${key} %`}</Text>
              </View>
              <View style={styles.total}>
                <Text>{formatCurrency( Number.parseFloat(value).toFixed(2))}</Text>
              </View>
            </View>
          ) : (
            <React.Fragment key={key}>
              <View style={[styles.row]}>
                <Text style={styles.description}>
                  {`${"cgst".toUpperCase()} ${key / 2} %`}
                </Text>
                <Text style={styles.total}>
                  {Number.parseFloat(value / 2).toFixed(2)}
                </Text>
              </View>
              <View style={[styles.row]}>
                <Text style={styles.description}>
                  {`${"sgst".toUpperCase()} ${key / 2} %`}
                </Text>
                <Text style={styles.total}>
                  {Number.parseFloat(value / 2).toFixed(2)}
                </Text>
              </View>
            </React.Fragment>
          )
        )}
      </View>
    ) : null}
  </>
);
