import React, { Component } from "react";
import { Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import AllRestaurants from "../screens/AllRestaurants";
import RestaurantDetails from "../screens/RestaurantDetails";

const Stack = createStackNavigator();

export class AllRestaurantsStack extends Component {
  render() {
    return (
      <Stack.Navigator initialRouteName="AllRestaurants">
        <Stack.Screen name="AllRestaurants" component={AllRestaurants} />
        <Stack.Screen name="RestaurantDetails" component={RestaurantDetails} />
      </Stack.Navigator>
    );
  }
}

export default AllRestaurantsStack;
