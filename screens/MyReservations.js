import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { fetchReservations } from "../api/apiCalls";
import { ListItem } from "react-native-elements";
import { Icon } from "react-native-elements";
import { primaryColor } from "../api/constants";

export class MyReservations extends Component {
  state = {
    reservations: [],
    loading: false,
  };

  componentDidMount() {
    const { token, id } = this.props.userDetails.user;
    this.setState({ loading: true }, async () => {
      try {
        const reservations = await fetchReservations(token, id);
        this.setState({ reservations });
      } catch (error) {
        console.log(error);
      }
    });
  }

  renderReservation = (reservation) => {
    return (
      <ListItem
        key={reservation.reservationId}
        bottomDivider
        style={styles.reservationItem}
      >
        <Icon raised name="book" type="font-awesome" color={primaryColor} />
        <ListItem.Content>
          <ListItem.Title style={styles.reservationTitle}>
            {reservation.restaurantName}
          </ListItem.Title>
          <ListItem.Subtitle>
            {reservation.reservationName +
              " " +
              reservation.reservationLastName}
          </ListItem.Subtitle>
          <ListItem.Subtitle>
            {reservation.reservationDate +
              " (" +
              reservation.reservationPeriod +
              ")"}
          </ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        {this.state.reservations.map((reservation) =>
          this.renderReservation(reservation)
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "baseline",
  },
  reservationItem: {
    alignSelf: "stretch",
  },
  reservationTitle: {
    fontWeight: "bold",
  },
});

const mapStateToProps = (state) => {
  const { userDetails } = state;
  return { userDetails };
};

export default connect(mapStateToProps)(MyReservations);
