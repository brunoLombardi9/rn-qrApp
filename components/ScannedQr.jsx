import { Alert, StyleSheet, Text, View } from "react-native";
import React from "react";
import HistoryBtn from "./HistoryBtn";
import { blueGrey, red } from "../utils/colors";
import Icon from "react-native-vector-icons/MaterialIcons";
import { deleteUrl } from "../databases/historyDB";
import { copyUrl, openUrl } from "../utils/handleUrl";
import { getSettingsContext } from "../contexts/SettingsContext";

export default function ScannedQr({ item, handleUpdate, handleLoading }) {
  const { deleteIndividualAlert, deleteIndividualAlertBtn, cancelBtn } =
  getSettingsContext().language.routes[2].texts;

  const Button = ({ name }) => {
    return <Icon name={name} size={30} color="white" />;
  };

  function deleteLink() {
    try {
      Alert.alert(
        deleteIndividualAlert,
        item.link,
        [
          {
            text: deleteIndividualAlertBtn,
            onPress: () => {
              handleLoading();
              deleteUrl(item.id);
              handleUpdate();
            },
          },
          {
            text: cancelBtn,
          },
        ],
        { cancelable: false }
      );
    } catch (error) {
      console.log(error);
    }
  }

  function copyLink() {
    copyUrl(item.link);
  }

  function openLink() {
    openUrl(item.link);
  }

  return (
    <View style={styles.container}>
      <View style={styles.btnsContainer}>
        <HistoryBtn method={openLink} icon={<Button name="link" />} />
        <HistoryBtn method={copyLink} icon={<Button name="copy-all" />} />
        <HistoryBtn
          icon={<Button name="delete-forever" />}
          color={red}
          method={deleteLink}
        />
      </View>
      <Text style={styles.urlText}>{item.link}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: blueGrey,
    padding: 10,
    justifyContent: "space-between",
    marginVertical: 10,
    borderRadius: 10,
    borderWidth: 2,
  },
  btnsContainer: {
    flexDirection: "row",
    width: 125,
    marginStart: "auto",
    justifyContent: "space-evenly",
    marginBottom: 15,
  },
  urlText: {
    color: "white",
    fontSize: 18,
  },
});
