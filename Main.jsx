import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Scanner from "./views/Scanner";
import Config from "./views/Config";
import Generator from "./views/Generator";
import History from "./views/History";
import { useEffect } from "react";
import { createHistoryTable } from "./databases/historyDB";
import { blueGrey } from "./utils/colors";
import { StyleSheet } from "react-native";
import { getSettingsContext } from "./contexts/SettingsContext";
import NavIcon from "./components/NavIcon";

const Tab = createBottomTabNavigator();

const Main = () => {
  const { language, themeColor } = getSettingsContext();

  useEffect(() => {
    createHistoryTable();
  }, []);

  const routes = [
    { name: language.routes[0].title, component: Scanner, icon: "crop-free" },
    { name: language.routes[1].title, component: Generator, icon: "qr-code-2" },
    { name: language.routes[2].title, component: History, icon: "history" },
    { name: language.routes[3].title, component: Config, icon: "settings" },
  ];

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
        {routes.map((r, index) => (
          <Tab.Screen
            key={index}
            name={language.routes[index].title}
            component={r.component}
            options={{
              unmountOnBlur:
                language.routes[index].title !== language.routes[3].title,
              tabBarIcon: ({ focused }) => (
                <NavIcon
                  icon={r.icon}
                  focused={focused}
                  color={themeColor.color}
                />
              ),
            }}
          />
        ))}
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
