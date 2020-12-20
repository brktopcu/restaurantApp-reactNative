import React, { Component } from "react";
import { Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import RestaurantDetails from "../screens/RestaurantDetails";
import { headerColor, primaryColor, secondaryColor } from "../api/constants";
import Favourites from "../screens/Favourites";

const Stack = createStackNavigator();

export class FavouriteStack extends Component {
  render() {
    return (
      <Stack.Navigator
        initialRouteName="Favourites"
        screenOptions={{
          headerTintColor: headerColor,
          headerStyle: { backgroundColor: secondaryColor },
        }}
      >
        <Stack.Screen
          name="Favourites"
          component={Favourites}
          options={{ title: "Favoriler" }}
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

export default FavouriteStack;
