import React from "react";
import { View, Text, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AllRestaurants from "../screens/AllRestaurants";
import RestaurantDetails from "../screens/RestaurantDetails";

const Stack = createStackNavigator();

const AllRestaurantsStack = () => {
  return (
    <Stack.Navigator initialRouteName="AllRestaurants">
      <Stack.Screen name="AllRestaurants" component={AllRestaurants} />
      <Stack.Screen name="RestaurantDetails" component={RestaurantDetails} />
    </Stack.Navigator>
  );
};

export default AllRestaurantsStack;
