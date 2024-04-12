import {
  Alert,
  TouchableOpacity,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useState, useRef } from "react";
import GradientContainer from "../components/GradientContainer.jsx";
import QRCode from "react-qr-code";
import { captureRef } from "react-native-view-shot";
import * as Sharing from "expo-sharing";
import { saveUrl } from "../databases/historyDB.js";
import * as MediaLibrary from "expo-media-library";
import { getSettingsContext } from "../contexts/SettingsContext.jsx";
import { getPermissionsContext } from "../contexts/PermissionsContext.jsx";

export default function Generator() {
  const [url, setUrl] = useState(null);
  const [showQr, setShowQr] = useState(false);
  const { permissionResponse } = getPermissionsContext();
  const qrRef = useRef();
  const { saveOnGenerate, themeColor } = getSettingsContext();
  const {
    generateErrorMessage,
    shareErrorMessage,
    downloadAlertTitle,
    downloadAlertContent,
    downloadAlertErrorMessage,
    downloadBtn,
    shareBtn,
    newQrBtn,
    inputPlaceholder,
    generateQrBtn,
    permissionsDenied,
  } = getSettingsContext().language.routes[1].texts;

  const qrSize = 900;

  function handleInput(input) {
    if (!input) {
      setShowQr(false);
    }
    setUrl(input);
  }

  async function generateQr() {
    try {
      if (!url) {
        Alert.alert(
          "Error",
          generateErrorMessage,
          [
            {
              text: "Ok",
            },
          ],
          { cancelable: true }
        );
      } else {
        setShowQr(true);
        if (saveOnGenerate) {
          await saveUrl(url);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function shareQr() {
    try {
      const uri = await captureRef(qrRef, {
        format: "png",
        height: qrSize,
        width: qrSize,
        quality: 1,
      });

      await Sharing.shareAsync(uri, {
        mimeType: "image/png",
      });
    } catch (error) {
      console.error(error);
      Alert.alert("Error", shareErrorMessage, [
        {
          text: "Ok",
        },
      ]);
    }
  }

  async function downloadQr() {
    try {
      const uri = await captureRef(qrRef, {
        format: "png",
        height: qrSize,
        width: qrSize,
        quality: 1,
      });
      await MediaLibrary.saveToLibraryAsync(uri);

      Alert.alert(downloadAlertTitle, downloadAlertContent, [
        {
          text: "Ok",
        },
      ]);
    } catch (error) {
      console.error(error);
      Alert.alert("Error", downloadAlertErrorMessage, [
        {
          text: "Ok",
        },
      ]);
    }
  }

  return (
    <GradientContainer>
      {permissionResponse && permissionResponse.granted && (
        <>
          {showQr ? (
            <View style={styles.qr} ref={qrRef}>
              <QRCode size={256} value={url} viewBox={`0 0 256 256`} />
            </View>
          ) : (
            <>
              <View style={styles.qrPlaceholder}>
                <Text style={styles.placeholderText}>Qr</Text>
              </View>
              <TextInput
                style={styles.input}
                onChangeText={(input) => handleInput(input)}
                placeholder={inputPlaceholder}
                keyboardType="default"
              />
            </>
          )}

          <View style={styles.btnsContainer}>
            {showQr ? (
              <>
                <View style={styles.topBtns}>
                  <TouchableOpacity
                    style={{ ...styles.btn, backgroundColor: themeColor.color }}
                    onPress={downloadQr}
                  >
                    <Text style={styles.btnText}>{downloadBtn}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{ ...styles.btn, backgroundColor: themeColor.color }}
                    onPress={shareQr}
                  >
                    <Text style={styles.btnText}>{shareBtn}</Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  style={{
                    ...styles.btn,
                    ...styles.generateQr,
                    backgroundColor: themeColor.color,
                  }}
                  onPress={() => setShowQr(false)}
                >
                  <Text style={styles.btnText}>{newQrBtn}</Text>
                </TouchableOpacity>
              </>
            ) : (
              <TouchableOpacity
                style={{
                  ...styles.btn,
                  ...styles.generateQr,
                  backgroundColor: themeColor.color,
                }}
                onPress={generateQr}
              >
                <Text style={styles.btnText}>{generateQrBtn}</Text>
              </TouchableOpacity>
            )}
          </View>
        </>
      )}

      {permissionResponse && !permissionResponse.granted && (
        <View style={styles.noPermissionContainer}>
          <Text style={styles.noPermissionText}>{permissionsDenied}</Text>
        </View>
      )}
    </GradientContainer>
  );
}

const styles = StyleSheet.create({
  qr: {
    padding: 10,
    backgroundColor: "white",
    marginBottom: 10,
  },
  input: {
    backgroundColor: "white",
    width: "80%",
    padding: 10,
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 20,
  },
  btnsContainer: {
    flexDirection: "row",
    gap: 20,
    width: "80%",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  topBtns: {
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  btn: {
    padding: 10,
    borderRadius: 10,
    marginTop: 20,
    width: "48%",
    justifyContent: "center",
    alignItems: "center",
  },
  generateQr: {
    width: "100%",
    marginTop: 0,
  },
  btnText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  qrPlaceholder: {
    width: 256,
    height: 256,
    borderWidth: 5,
    borderStyle: "dashed",
    borderColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 50,
    textAlign: "center",
  },
  noPermissionContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "80%",
  },
  noPermissionText: {
    color: "white",
    fontSize: 20,
    textAlign: "center",
  },
});
