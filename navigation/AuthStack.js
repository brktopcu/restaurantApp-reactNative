import { createStackNavigator } from "@react-navigation/stack";
import React, { Component } from "react";
import { Text, View } from "react-native";
import Login from "../screens/Login";
import Register from "../screens/Register";

const Stack = createStackNavigator();

export class AuthStack extends Component {
  render() {
    return (
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login">
          {(props) => <Login {...props} updateUser={this.props.updateUser} />}
        </Stack.Screen>
        <Stack.Screen name="Register" component={Register} />
      </Stack.Navigator>
    );
  }
}

export default AuthStack;
