import React, { Component } from "react";
import { View, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Favourites from "../screens/Favourites";
import MyReservations from "../screens/MyReservations";
import { MaterialIcons } from "@expo/vector-icons";
import AllRestaurantsStack from "./AllRestaurantsStack";
import { primaryColor } from "../api/constants";
import { FavouriteStack } from "./FavouriteStack";
import { Provider } from "react-redux";
import { store } from "../redux/store";

const Tab = createBottomTabNavigator();

export class TabBarNavigation extends Component {
  render() {
    return (
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
            return (
              <MaterialIcons name={iconName} size={24} color={primaryColor} />
            );
          },
        })}
        tabBarOptions={{
          activeTintColor: "black",
          inactiveTintColor: "gray",
          activeBackgroundColor: "#f7f7f7",
          showLabel: false,
        }}
      >
        <Tab.Screen name="AllRestaurants">
          {(props) => (
            <AllRestaurantsStack
              {...props}
              updateUser={this.props.updateUser}
            />
          )}
        </Tab.Screen>
        <Tab.Screen name="Favourites">
          {(props) => (
            <FavouriteStack {...props} updateUser={this.props.updateUser} />
          )}
        </Tab.Screen>
        <Tab.Screen name="MyReservations" component={MyReservations} />
      </Tab.Navigator>
    );
  }
}
export default TabBarNavigation;
