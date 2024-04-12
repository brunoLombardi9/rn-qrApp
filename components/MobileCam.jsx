import { Animated, Easing, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useRef } from "react";
import { Camera, CameraType } from "expo-camera";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { getSettingsContext } from "../contexts/SettingsContext";
import { getPermissionsContext } from "../contexts/PermissionsContext";

export default function MobileCam({ method, flash }) {
  const scannerGuideScale = useRef(new Animated.Value(1)).current;
  const { themeColor } = getSettingsContext();
  const { canUseCam } = getPermissionsContext();
  const { permissionsDenied } = getSettingsContext().language.routes[0].texts;

  async function handleScan({ type, data }) {
    method(data);
  }

  function animateScannerGuide() {
    Animated.timing(scannerGuideScale, {
      toValue: 4,
      duration: 200,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  }

  useEffect(() => {
    if (canUseCam.status) {
      animateScannerGuide();
    }
  }, [canUseCam]);

  return (
    <>
      {canUseCam.alreadyInitialized && !canUseCam.status && (
        <View style={styles.noPermissionContainer}>
          <Text style={styles.noPermissionText}>{permissionsDenied}</Text>
        </View>
      )}
      {canUseCam.alreadyInitialized && canUseCam.status && (
        <View style={styles.cameraWrapper}>
          <Camera
            style={styles.camera}
            facingMode={CameraType.back}
            onBarCodeScanned={handleScan}
            flashMode={flash}
            ratio="16:9"
          >
            {canUseCam.status && (
              <Animated.View
                style={{
                  transform: [{ scale: scannerGuideScale }],
                }}
              >
                <Icon name="scan-helper" size={60} color={themeColor.color} />
              </Animated.View>
            )}
          </Camera>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  cameraWrapper: {
    height: "100%",
    width: "100%",
  },
  camera: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
