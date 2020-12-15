import React, { Component } from "react";
import { ScrollView } from "react-native";
import { Text, View, StyleSheet } from "react-native";
import { Image, Divider, Button } from "react-native-elements";
import { primaryColor } from "../api/constants";
import Comment from "../components/Comment";
import _ from "lodash";

export class RestaurantDetails extends Component {
  componentDidMount() {
    this.props.navigation.setOptions({
      title: this.props.route.params.restaurantName,
    });
  }
  renderComments = () => {
    if (!_.isEmpty(this.props.route.params.commentList)) {
      return this.props.route.params.commentList.map((comment) => (
        <Comment key={comment.commentId} comment={comment} />
      ));
    } else {
      return (
        <Text style={styles.text}>
          Bu restoran için henüz bir yorum yapılmamış.
        </Text>
      );
    }
  };
  render() {
    return (
      <ScrollView>
        <Image
          source={{
            uri: `data:image/jpeg;base64,${this.props.route.params.thumbnail}`,
          }}
          style={styles.thumbnail}
        />
        <View style={styles.detailsContainer}>
          <View>
            <Text style={styles.textHeader}>
              {this.props.route.params.restaurantName}
            </Text>
            <Text>{this.props.route.params.restaurantAddress}</Text>
          </View>

          <Button title="Rezervasyon Yap" />
        </View>
        <Divider style={styles.divider} />
        <Text style={styles.textHeader}>Yorumlar</Text>
        {this.renderComments()}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  thumbnail: {
    height: 300,
    alignSelf: "stretch",
  },
  textHeader: {
    fontWeight: "bold",
    fontSize: 20,
  },
  detailsContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },
  details: {
    flex: 3,
  },
  rating: {
    flex: 1,
  },
  divider: {
    backgroundColor: primaryColor,
    height: 1.5,
    marginTop: 15,
    marginBottom: 15,
    width: 180,
    alignSelf: "center",
  },
  text: {
    marginTop: 10,
  },
});

export default RestaurantDetails;
