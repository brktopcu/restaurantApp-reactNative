import { createStackNavigator } from "@react-navigation/stack";
import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
import { headerColor, secondaryColor } from "../api/constants";
import Login from "../screens/Login";
import Register from "../screens/Register";

const Stack = createStackNavigator();

export class AuthStack extends Component {
  render() {
    return (
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerTintColor: headerColor,
          headerStyle: { backgroundColor: secondaryColor },
        }}
      >
        <Stack.Screen name="Login" options={{ title: "Giriş Yap" }}>
          {(props) => <Login {...props} updateUser={this.props.updateUser} />}
        </Stack.Screen>
        <Stack.Screen
          name="Register"
          component={Register}
          options={{ title: "Kayıt Ol" }}
        />
      </Stack.Navigator>
    );
  }
}

export default AuthStack;
