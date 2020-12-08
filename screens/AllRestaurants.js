import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Button,
} from "react-native";
import { Card, Rating } from "react-native-elements";
import { fetchAllRestaurants } from "../api/apiCalls";
import { FontAwesome5 } from "@expo/vector-icons";

export class AllRestaurants extends Component {
  state = {
    isLoading: false,
    restaurants: [],
  };

  componentDidMount() {
    this.setState({ isLoading: true }, async () => {
      try {
        const rest = await fetchAllRestaurants();
        this.setState({ restaurants: rest, isLoading: false });
      } catch (error) {
        console.log(error);
        this.setState({ isLoading: false });
      }
    });
  }

  renderCards = ({ item }) => {
    return (
      <TouchableOpacity>
        <Card key={item.restaurantId}>
          <Card.Title>{item.restaurantName}</Card.Title>
          <Card.Divider />
          <Card.Image source={require("../images/no-image.jpg")} />
          <Rating
            type="star"
            ratingColor="yellow"
            imageSize={20}
            style={{ marginTop: 5 }}
            readonly={true}
            fractions={1}
            startingValue={item.restaurantRating}
          />
          <Text style={{ margin: 10, alignSelf: "center" }}>
            <FontAwesome5 name="globe" size={15} color="grey" />{" "}
            {item.restaurantCity}
          </Text>
        </Card>
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <Button
          title="Go to Details"
          onPress={() => this.props.navigation.navigate("RestaurantDetails")}
        />
        <FlatList
          data={this.state.restaurants}
          renderItem={this.renderCards}
          keyExtractor={(item) => item.restaurantId.toString()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
  },
});

export default AllRestaurants;