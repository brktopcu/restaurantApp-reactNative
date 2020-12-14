import React, { Component } from "react";
import { Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import AllRestaurants from "../screens/AllRestaurants";
import RestaurantDetails from "../screens/RestaurantDetails";
import { headerColor, primaryColor, secondaryColor } from "../api/constants";
import { Icon } from "react-native-elements";
import { connect } from "react-redux";
import { logoutAction } from "../redux/actions/logoutAction";

const Stack = createStackNavigator();

export class AllRestaurantsStack extends Component {
  handleLogout = () => {
    this.props.logoutAction();
    this.props.updateUser();
  };

  render() {
    return (
      <Stack.Navigator
        initialRouteName="AllRestaurants"
        screenOptions={{
          headerTintColor: headerColor,
          headerStyle: { backgroundColor: secondaryColor },
          headerRight: (props) => (
            <Icon
              {...props}
              name="sign-out"
              type="font-awesome"
              size={25}
              style={{ marginRight: 15 }}
              accessibilityLabel="Çıkış Yap"
              onPress={this.handleLogout}
            />
          ),
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

const mapStateToProps = (state) => {
  const { userDetails } = state;
  return { userDetails };
};

export default connect(mapStateToProps, { logoutAction })(AllRestaurantsStack);
