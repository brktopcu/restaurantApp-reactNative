import React, { Component } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { ThemeProvider } from "react-native-elements";
import { NavigationContainer } from "@react-navigation/native";
import TabBarNavigation from "./navigation/TabBarNavigation";
import AuthStack from "./navigation/AuthStack";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import _ from "lodash";
import { primaryColor, secondaryColor } from "./api/constants";

const theme = {
  colors: {
    primary: primaryColor,
  },
};
export class App extends Component {
  state = { user: {} };

  updateUser = () => {
    this.setState({ user: store.getState().userDetails.user });
  };
  render() {
    return (
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <View style={styles.container}>
            <StatusBar style="auto" backgroundColor={secondaryColor} />
            <NavigationContainer>
              {_.isEmpty(this.state.user) ? (
                <AuthStack updateUser={this.updateUser} />
              ) : (
                <TabBarNavigation updateUser={this.updateUser} />
              )}
            </NavigationContainer>
          </View>
        </ThemeProvider>
      </Provider>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    paddingTop: 30,
  },
});

export default App;
