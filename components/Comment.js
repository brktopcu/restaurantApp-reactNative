import React, { Component } from "react";
import { ScrollView } from "react-native";
import { Text, View, StyleSheet } from "react-native";
import { Icon } from "react-native-elements";
import { primaryColor } from "../api/constants";
import { AntDesign } from "@expo/vector-icons";

export class Comment extends Component {
  renderStarIcon = () => {
    let starArray = [];
    for (let index = 0; index < this.props.comment.commentScore; index++) {
      starArray.push(
        <AntDesign
          name="star"
          size={20}
          color="orange"
          key={index}
          style={{ marginRight: 5, paddingTop: 20 }}
        />
      );
    }
    return starArray;
  };
  render() {
    return (
      <View style={styles.container}>
        <Icon
          raised
          name="user"
          type="font-awesome"
          color={primaryColor}
          style={styles.avatar}
        />
        <View style={styles.commentDetails}>
          <Text style={styles.textHeader}>
            {this.props.comment.commentWriter}
          </Text>
          <Text>{this.props.comment.commentText}</Text>
        </View>
        <View style={{ flexDirection: "row", marginRight: 70 }}>
          {this.renderStarIcon()}
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: { flex: 1, flexDirection: "row", marginTop: 10 },
  avatar: { flex: 1 },
  commentDetails: { flex: 3 },
  textHeader: {
    fontWeight: "bold",
    fontSize: 13,
    paddingTop: 12,
  },
});

export default Comment;
