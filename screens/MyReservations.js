import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";

export class MyReservations extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text> MyReservations </Text>
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

export default MyReservations;
