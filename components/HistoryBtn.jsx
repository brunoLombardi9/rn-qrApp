import { StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { grey } from "../utils/colors";

export default function HistoryBtn({ icon, color = grey, method }) {
  return (
    <TouchableOpacity
      style={{ ...styles.container, backgroundColor: color }}
      onPress={method}
    >
      {icon}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 1,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "black",
  },
});
