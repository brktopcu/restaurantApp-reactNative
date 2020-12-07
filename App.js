import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AllRestaurants from "./screens/AllRestaurants";
import Favourites from "./screens/Favourites";
import MyReservations from "./screens/MyReservations";
import { MaterialIcons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
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
          <Tab.Screen name="AllRestaurants" component={AllRestaurants} />
          <Tab.Screen name="Favourites" component={Favourites} />
          <Tab.Screen name="MyReservations" component={MyReservations} />
        </Tab.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    paddingTop: 30,
  },
});
