import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import React, { createContext, useContext, useEffect, useState } from "react";

const context = createContext();

const PermissionsContext = ({ children }) => {
  const [camPermission, requestCamPermission] = Camera.useCameraPermissions();
  const [canUseCam, setCanUseCam] = useState({
    status: false,
    alreadyInitialized: false,
  });
  const [permissionResponse, getPermission, requestPermission] =
    MediaLibrary.usePermissions();

  useEffect(() => {
    initializeCamera();
    handleFilePermissions();
  }, []);

  async function initializeCamera() {
    try {
      const { granted } = await requestCamPermission();
      if (granted) {
        setCanUseCam({
          alreadyInitialized: true,
          status: true,
        });
      } else {
        setCanUseCam((prevState) => ({
          ...prevState,
          alreadyInitialized: true,
        }));
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function handleFilePermissions() {
    try {
      const { granted } = await getPermission();
      if (!granted) {
        await requestPermission();
      }
    } catch (error) {
      console.error(error);
    }
  }

  const data = {
    canUseCam,
    permissionResponse,
  };

  return <context.Provider value={data}>{children}</context.Provider>;
};

export function getPermissionsContext() {
  return useContext(context);
}

export default PermissionsContext;
