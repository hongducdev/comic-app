import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { GenreScreen, HomeScreen, SearchScreen, TopScreen } from "../screens";

const TabNavigator = () => {
  const Tab = createBottomTabNavigator();

  const screenOptions = ({ route }) => ({
    headerShown: false,
    tabBarIcon: ({ focused, color, size }) => {
      let iconName;

      if (route.name === "Trang chủ") {
        iconName = focused ? "home" : "home-outline";
      } else if (route.name === "Tìm kiếm") {
        iconName = focused ? "search" : "search-outline";
      } else if (route.name === "Thể loại") {
        iconName = focused ? "grid" : "grid-outline";
      } else if (route.name === "Tài khoản") {
        iconName = focused ? "person" : "person-outline";
      } else if (route.name === "Top") {
        iconName = focused ? "trophy" : "trophy-outline";
      }

      return <Ionicons name={iconName} size={size} color={color} />;
    },
    tabBarActiveTintColor: "#a6d189",
    tabBarInactiveTintColor: "#c6d0f5",
    tabBarStyle: {
      position: "absolute",
      backgroundColor: "#232634",
      borderTopRightRadius: 30,
      borderTopLeftRadius: 30,
      height: 60,
    },
    tabBarShowLabel: false,
  });

  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen name="Trang chủ" component={HomeScreen} />
      <Tab.Screen name="Thể loại" component={GenreScreen} />
      <Tab.Screen name="Tìm kiếm" component={SearchScreen} />
      <Tab.Screen name="Top" component={TopScreen} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
