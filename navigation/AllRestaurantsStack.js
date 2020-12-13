import React, { Component } from "react";
import { Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import AllRestaurants from "../screens/AllRestaurants";
import RestaurantDetails from "../screens/RestaurantDetails";
import { headerColor, primaryColor, secondaryColor } from "../api/constants";

const Stack = createStackNavigator();

export class AllRestaurantsStack extends Component {
  render() {
    return (
      <Stack.Navigator
        initialRouteName="AllRestaurants"
        screenOptions={{
          headerTintColor: headerColor,
          headerStyle: { backgroundColor: secondaryColor },
        }}
      >
        <Stack.Screen
          name="AllRestaurants"
          component={AllRestaurants}
          options={{ title: "Tüm Restoranlar" }}
        />
        <Stack.Screen
          name="RestaurantDetails"
          component={RestaurantDetails}
          options={{ title: "Restoran" }}
        />
      </Stack.Navigator>
    );
  }
}

export default AllRestaurantsStack;
