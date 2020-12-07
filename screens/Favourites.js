import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";

export class Favourites extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text> Favourites </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 30,
  },
});

export default Favourites;
