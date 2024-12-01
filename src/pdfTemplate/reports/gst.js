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
    textAlign: "right",
    borderRightColor: borderColor,
    borderRightWidth: 1,
    borderLeftColor: borderColor,
    borderLeftWidth: 1,
    paddingRight: 8,
  },
  total: {
    width: "15%",
    // height: "100%",
    textAlign: "right",
    paddingRight: 8,
    borderRightColor: borderColor,
    borderRightWidth: 1,
  },
});

export const GstComponent = ({ name, summary }) => (
  <>
    {Object.entries(summary) && Object.entries(summary).length > 0 ? (
      <View style={{ borderTopWidth: 1 }}>
        {Object.entries(summary).map(([key, value]) =>
          name !== "cgstigst" ? (
            <View style={[styles.row]} key={key}>
              <Text style={styles.description}>
                {`${name.toUpperCase()} ${key} %`}
              </Text>
              <Text style={styles.total}>
                {Number.parseFloat(value).toFixed(2)}
              </Text>
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
