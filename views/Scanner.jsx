import React, { useState } from "react";
import { Alert, TouchableOpacity, StyleSheet, View } from "react-native";
import GradientContainer from "../components/GradientContainer.jsx";
import MobileCam from "../components/MobileCam.jsx";
import Icon from "react-native-vector-icons/FontAwesome";
import { blueGrey, lightGrey } from "../utils/colors.js";
import * as ImagePicker from "expo-image-picker";
import { Camera } from "expo-camera";
import { copyUrl, openUrl } from "../utils/handleUrl.js";
import { saveUrl } from "../databases/historyDB.js";
import { BarCodeScanner } from "expo-barcode-scanner";
import { getSettingsContext } from "../contexts/SettingsContext.jsx";
import { getPermissionsContext } from "../contexts/PermissionsContext.jsx";

export default function Scanner() {
  const [url, setUrl] = useState(null);
  const [searchFile, setSearchFile] = useState(false);
  const [flashMode, setFlashMode] = useState(Camera.Constants.FlashMode.off);
  const { canUseCam } = getPermissionsContext();
  const { openOnScan, saveOnScan } = getSettingsContext();
  const {
    alertTitle,
    alertContent,
    openBtn,
    cancelBtn,
    copyBtn,
    errorMessage,
  } = getSettingsContext().language.routes[0].texts;

  async function showAlert(scanResult) {
    setUrl(scanResult);
    try {
      if (saveOnScan) {
        await saveUrl(scanResult);
      }
      Alert.alert(
        alertTitle,
        `${alertContent} ${scanResult}`,
        [
          {
            text: cancelBtn,
            onPress: () => {
              cleanUrl();
            },
          },
          {
            text: copyBtn,
            onPress: () => {
              copyUrl(scanResult);
              cleanUrl();
            },
          },
          {
            text: openBtn,
            onPress: () => {
              openUrl(scanResult);
              cleanUrl();
            },
          },
        ],
        { cancelable: false }
      );
    } catch (error) {
      console.log(error);
    }
  }

  async function openScanning(scanResult) {
    try {
      if (saveOnScan) {
        await saveUrl(scanResult);
      }
      openUrl(scanResult);
    } catch (error) {
      console.log(error);
    }
  }

  function handleFlash() {
    if (flashMode) {
      setFlashMode(Camera.Constants.FlashMode.off);
    } else {
      setFlashMode(Camera.Constants.FlashMode.torch);
    }
  }

  async function pickImage() {
    if (flashMode) {
      setFlashMode(Camera.Constants.FlashMode.off);
    }
    setSearchFile(true);
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        const decodedQr = await BarCodeScanner.scanFromURLAsync(
          result.assets[0].uri
        );
        if (decodedQr.length > 0) {
          const data = decodedQr[0].data;
          if (openOnScan) {
            if (saveOnScan) {
              await saveUrl(data);
            }
            openUrl(data);
          } else {
            showAlert(data);
          }
        } else {
          Alert.alert("Error", errorMessage);
        }
      }
      setSearchFile(false);
    } catch (error) {
      console.log(error);
    }
  }

  function cleanUrl() {
    setUrl(null);
  }

  return (
    <GradientContainer>
      {!url && !searchFile && (
        <MobileCam
          method={openOnScan ? openScanning : showAlert}
          flash={flashMode}
        />
      )}
      {canUseCam.alreadyInitialized && canUseCam.status && (
        <View style={styles.btnsContainer}>
          <TouchableOpacity
            style={
              flashMode ? { ...styles.btn, ...styles.btnEnabled } : styles.btn
            }
            onPress={handleFlash}
          >
            <Icon name="flash" size={30} color="white" />
          </TouchableOpacity>

          <TouchableOpacity
            style={
              searchFile ? { ...styles.btn, ...styles.btnEnabled } : styles.btn
            }
            onPress={pickImage}
          >
            <Icon name="file-picture-o" size={30} color="white" />
          </TouchableOpacity>
        </View>
      )}
    </GradientContainer>
  );
}

const styles = StyleSheet.create({
  btnsContainer: {
    flexDirection: "row",
    gap: 10,
    marginTop: 50,
    position: "absolute",
    bottom: 50,
  },
  btn: {
    width: 100,
    padding: 10,
    backgroundColor: blueGrey,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  btnEnabled: {
    backgroundColor: lightGrey,
  },
});
