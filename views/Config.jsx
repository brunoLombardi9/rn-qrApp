import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import GradientContainer from "../components/GradientContainer";
import { getSettingsContext } from "../contexts/SettingsContext";
import Checkbox from "expo-checkbox";
import { Picker } from "@react-native-picker/picker";
import languages from "../utils/languages";
import colorOptions from "../utils/colors";

export default function Config() {
  const {
    languageTitle,
    qrOptions,
    saveOnScannedText,
    saveOnGenerateText,
    openOnScannedText,
    themeTitle,
  } = getSettingsContext().language.routes[3].texts;
  const {
    language,
    handleChangeLanguage,
    saveOnGenerate,
    handleSaveOnGenerate,
    saveOnScan,
    handleSaveOnScan,
    openOnScan,
    handleOpenOnScan,
    themeColor,
    handleThemeChange,
  } = getSettingsContext();

  const historySettings = [
    {
      optionText: saveOnScannedText,
      value: saveOnScan,
      onValueChange: handleSaveOnScan,
    },
    {
      optionText: saveOnGenerateText,
      value: saveOnGenerate,
      onValueChange: handleSaveOnGenerate,
    },
    {
      optionText: openOnScannedText,
      value: openOnScan,
      onValueChange: handleOpenOnScan,
    },
  ];

  return (
    <GradientContainer>
        <ScrollView style={styles.container}>
          <Text style={styles.optionTitle}>{languageTitle}</Text>
          <Picker
            selectedValue={language.name}
            onValueChange={(itemValue, itemIndex) =>
              handleChangeLanguage(itemValue)
            }
            style={styles.picker}
          >
            {languages.map((lan) => (
              <Picker.Item
                label={lan.name}
                value={lan.name}
                key={lan.name}
                style={styles.pickerOpt}
              />
            ))}
          </Picker>

          <View style={styles.separator} />
          <Text style={styles.optionTitle}>{qrOptions}</Text>

          {historySettings.map((setting, index) => (
            <View style={styles.option} key={index}>
              <Text style={styles.optionText}>{setting.optionText}</Text>
              <Checkbox
                style={styles.checkBox}
                value={setting.value}
                onValueChange={setting.onValueChange}
                color={setting.value ? themeColor.color : null}
              />
            </View>
          ))}

          <View style={styles.separator} />
          <Text style={styles.optionTitle}>{themeTitle}</Text>

          <View style={styles.colorPicker}>
            {colorOptions.map((opt, index) => (
              <View
                style={{ ...styles.colorOpt, backgroundColor: opt.color }}
                key={index}
              >
                <Pressable
                  style={styles.colorBtn}
                  key={index}
                  onPress={() => handleThemeChange(opt)}
                />
              </View>
            ))}
          </View>
        </ScrollView>
    </GradientContainer>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, marginTop: 30, paddingHorizontal: 15 },
  optionTitle: {
    color: "white",
    fontWeight: "bold",
    fontSize: 25,
    marginVertical: 10,
  },
  separator: { borderWidth: 1, borderColor: "white", marginVertical: 20 },
  option: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 15,
  },
  optionText: {
    color: "white",
    fontSize: 20,
  },
  checkBox: {
    width: 25,
    height: 25,
  },
  picker: {
    color: "black",
    backgroundColor: "white",
    borderRadius: 20,
    marginBottom: 15,
  },
  pickerOpt: {
    color: "black",
    fontWeight: "bold",
    fontSize: 20,
  },
  colorPicker: {
    flex: 1,
    gap: 15,
    flexDirection: "row",
    maxWidth: "100%",
    flexWrap: "wrap",
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  colorOpt: {
    width: "15%",
    height: 50,
    backgroundColor: "white",
    borderRadius: 10,
  },
  colorBtn: {
    height: "100%",
    width: "100%",
  },
});
