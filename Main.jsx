import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Scanner from "./views/Scanner";
import Config from "./views/Config";
import Generator from "./views/Generator";
import History from "./views/History";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useEffect } from "react";
import { createHistoryTable } from "./databases/historyDB";
import { blueGrey } from "./utils/colors";
import { StyleSheet } from "react-native";
import { getSettingsContext } from "./contexts/SettingsContext";

const Tab = createBottomTabNavigator();

const NavIcon = ({ icon, focused, color }) => {
  return <Icon name={icon} size={30} color={focused ? color : "white"} />;
};

const Main = () => {
  const { language, themeColor } = getSettingsContext();

  useEffect(() => {
    createHistoryTable();
  }, []);
  return (
    <NavigationContainer>
      <Tab.Navigator
        backBehavior="none"
        screenOptions={{
          headerShown: false,
          unmountOnBlur: true,
          tabBarActiveTintColor: themeColor.color,
          tabBarInactiveTintColor: "white",
          tabBarStyle: styles.tabBarStyle,
          tabBarLabelStyle: styles.tabBarLabelStyle,
        }}
      >
        <Tab.Screen
          name={language.routes[0].title}
          component={Scanner}
          options={{
            tabBarIcon: ({ focused }) => (
              <NavIcon
                icon="crop-free"
                focused={focused}
                color={themeColor.color}
              />
            ),
          }}
        />
        <Tab.Screen
          name={language.routes[1].title}
          component={Generator}
          options={{
            tabBarIcon: ({ focused }) => (
              <NavIcon
                icon="qr-code-2"
                focused={focused}
                color={themeColor.color}
              />
            ),
          }}
        />
        <Tab.Screen
          name={language.routes[2].title}
          component={History}
          options={{
            tabBarIcon: ({ focused }) => (
              <NavIcon
                icon="history"
                focused={focused}
                color={themeColor.color}
              />
            ),
          }}
        />
        <Tab.Screen
          name={language.routes[3].title}
          component={Config}
          options={{
            unmountOnBlur: false,
            tabBarIcon: ({ focused }) => (
              <NavIcon
                icon="settings"
                focused={focused}
                color={themeColor.color}
              />
            ),
          }}
        />
      </Tab.Navigator>
      <StatusBar style="light" />
    </NavigationContainer>
  );
};

export default Main;

const styles = StyleSheet.create({
  tabBarStyle: {
    backgroundColor: blueGrey,
    borderColor: "transparent",
    height: 80,
  },
  tabBarLabelStyle: {
    paddingBottom: 10,
    fontSize: 16,
  },
});
