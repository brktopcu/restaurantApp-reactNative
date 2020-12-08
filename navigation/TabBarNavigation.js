import React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AllRestaurants from "../screens/AllRestaurants";
import Favourites from "../screens/Favourites";
import MyReservations from "../screens/MyReservations";
import { MaterialIcons } from "@expo/vector-icons";
import AllRestaurantsStack from "./AllRestaurantsStack";

const Tab = createBottomTabNavigator();

const TabBarNavigation = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: () => {
            let iconName;
            if (route.name === "AllRestaurants") {
              iconName = "restaurant-menu";
            } else if (route.name === "Favourites") {
              iconName = "favorite";
            } else if (route.name === "MyReservations") {
              iconName = "assignment";
            }
            return <MaterialIcons name={iconName} size={24} color="tomato" />;
          },
        })}
        tabBarOptions={{
          activeTintColor: "black",
          inactiveTintColor: "gray",
          activeBackgroundColor: "#f7f7f7",
          showLabel: false,
        }}
      >
        <Tab.Screen name="AllRestaurants" component={AllRestaurantsStack} />
        <Tab.Screen name="Favourites" component={Favourites} />
        <Tab.Screen name="MyReservations" component={MyReservations} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default TabBarNavigation;
