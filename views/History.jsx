import {
  Alert,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  Text,
} from "react-native";
import React, { useEffect, useState } from "react";
import GradientContainer from "../components/GradientContainer.jsx";
import { deleteAllUrls, getUrls } from "../databases/historyDB.js";
import ScannedQr from "../components/ScannedQr.jsx";
import { red } from "../utils/colors.js";
import LoadingScreen from "../components/LoadingScreen.jsx";
import { getSettingsContext } from "../contexts/SettingsContext.jsx";

export default function History() {
  const [data, setData] = useState(null);
  const [mustUpdate, setMustUpdate] = useState(true);
  const [loading, setLoading] = useState(true);
  const {
    deleteAllAlertTitle,
    deleteAllAlertContent,
    cancelBtn,
    deleteAllBtn,
    noResultText,
  } = getSettingsContext().language.routes[2].texts;

  useEffect(() => {
    if (mustUpdate) {
      fetchDb();
    }
  }, [mustUpdate]);

  async function fetchDb() {
    try {
      const savedUrls = await getUrls();
      setData(savedUrls);
    } catch (error) {
      console.log(error);
    } finally {
      setMustUpdate(false);
      setLoading(false);
    }
  }

  function handleUpdate() {
    setMustUpdate(true);
  }

  function handleLoading() {
    setLoading(true);
  }

  function handleDeleteAll() {
    try {
      Alert.alert(
        deleteAllAlertTitle,
        deleteAllAlertContent,
        [
          {
            text: cancelBtn,
          },
          {
            text: deleteAllBtn,
            onPress: () => {
              handleLoading();
              deleteAllUrls();
              handleUpdate();
            },
          },
        ],
        { cancelable: false }
      );
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <GradientContainer>
      {loading && <LoadingScreen />}

      {!loading && (
        <>
          {data?.length === 0 ? (
            <Text style={styles.noDataText}>{noResultText}</Text>
          ) : (
            <SafeAreaView style={styles.listContainer}>
              <TouchableOpacity
                style={styles.deleteAllBtn}
                onPress={handleDeleteAll}
              >
                <Text style={styles.deleteAlltext}>{deleteAllBtn}</Text>
              </TouchableOpacity>
              <FlatList
                data={data}
                renderItem={({ item }) => (
                  <ScannedQr
                    item={item}
                    handleUpdate={handleUpdate}
                    handleLoading={handleLoading}
                  />
                )}
                keyExtractor={(item) => item.id}
              />
            </SafeAreaView>
          )}
        </>
      )}
    </GradientContainer>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    width: "90%",
    flex: 1,
    marginTop: 50,
  },
  deleteAllBtn: {
    backgroundColor: red,
    width: 120,
    borderRadius: 5,
    padding: 5,
    marginBottom: 10,
    borderWidth: 2,
  },
  deleteAlltext: {
    color: "white",
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
  },
  noDataText: {
    color: "white",
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
  },
});
