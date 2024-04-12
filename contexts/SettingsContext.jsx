import React, { createContext, useContext, useEffect, useState } from "react";
import languages from "../utils/languages";
import {
  createSettingsTable,
  getSettings,
  updateLanguageSetting,
  updateOpenOnScan,
  updateSaveOnGenerate,
  updateSaveOnScan,
  updateThemeColor,
} from "../databases/settingsDB";
import colorOptions from "../utils/colors";

const context = createContext();

const SettingsContext = ({ children }) => {
  const [language, setLanguage] = useState(languages[1]);
  const [saveOnGenerate, setSaveOnGenerate] = useState(false);
  const [saveOnScan, setSaveOnScan] = useState(false);
  const [openOnScan, setOpenOnScan] = useState(false);
  const [themeColor, setThemeColor] = useState(colorOptions[6]);

  useEffect(() => {
    createSettingsTable();
    fetchSettings();
  }, []);

  async function fetchSettings() {
    try {
      const data = await getSettings();
      const settings = data[0];
      setLanguage(
        settings.language === "english" ? languages[1] : languages[0]
      );
      setSaveOnGenerate(settings.saveOnGenerate ? true : false);
      setSaveOnScan(settings.saveOnScan ? true : false);
      setOpenOnScan(settings.openOnScan ? true : false);
      setThemeColor(
        colorOptions.find((obj) => obj.color === settings.themeColor)
      );
    } catch (error) {
      console.log(error);
    } 
  }

  async function handleChangeLanguage(lan) {
    try {
      setLanguage(languages.find((obj) => obj.name === lan));
      await updateLanguageSetting(lan);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleSaveOnGenerate() {
    try {
      setSaveOnGenerate(!saveOnGenerate);
      if (saveOnGenerate) {
        await updateSaveOnGenerate(0);
      } else {
        await updateSaveOnGenerate(1);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function handleSaveOnScan() {
    try {
      setSaveOnScan(!saveOnScan);
      if (saveOnScan) {
        await updateSaveOnScan(0);
      } else {
        await updateSaveOnScan(1);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function handleOpenOnScan() {
    try {
      setOpenOnScan(!openOnScan);
      if (openOnScan) {
        await updateOpenOnScan(0);
      } else {
        await updateOpenOnScan(1);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function handleThemeChange(opt) {
    try {
      setThemeColor(opt);
      await updateThemeColor(opt.color);
    } catch (error) {
      console.log(error)
    }
  }

  const data = {
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
  };

  return <context.Provider value={data}>{children}</context.Provider>;
};

export function getSettingsContext() {
  return useContext(context);
}

export default SettingsContext;
