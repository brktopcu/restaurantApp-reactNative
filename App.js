import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { ThemeProvider } from "react-native-elements";
import { NavigationContainer } from "@react-navigation/native";
import TabBarNavigation from "./navigation/TabBarNavigation";
import AuthStack from "./navigation/AuthStack";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { Login } from "./screens/Login";
import Register from "./screens/Register";
import { createStackNavigator } from "@react-navigation/stack";

export default function App() {
  const theme = {
    colors: {
      primary: "#db2828",
    },
  };
  console.log(store.getState().userDetails);
  const Stack = createStackNavigator();
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <View style={styles.container}>
          <StatusBar style="auto" />
          <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="Register" component={Register} />
            </Stack.Navigator>
          </NavigationContainer>
        </View>
      </ThemeProvider>
    </Provider>
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
