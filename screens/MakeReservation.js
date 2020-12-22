import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import { Text, Input } from "react-native-elements";
import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { getTablesUrl, primaryColor } from "../api/constants";
import { fetchTables } from "../api/apiCalls";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import { TouchableOpacity } from "react-native";

export class MakeReservation extends Component {
  state = {
    reservationName: "",
    reservationLastName: "",
    reservationDate: "",
    reservationPeriod: "",
    guestCount: 0,
    rtableId: "",
    reservationNote: "",
    tables: [],
    showPicker: false,
  };

  componentDidMount = () => {
    this.getTables();
  };

  getTables = async () => {
    const tables = await fetchTables(this.props.route.params.restaurantId);
    this.setState({ tables });
  };

  render() {
    return (
      <View>
        <Text h2>{this.props.route.params.restaurantName}</Text>
        <Input
          leftIcon={<FontAwesome name="user" size={24} color="black" />}
          label="Ad"
          value={this.state.username}
          onChangeText={(text) => this.setState({ username: text })}
        />
        <Input
          leftIcon={<FontAwesome name="user" size={24} color="black" />}
          label="Soyad"
          value={this.state.username}
          onChangeText={(text) => this.setState({ username: text })}
        />

        {/*Implement date picker*/}

        <Picker
          selectedValue={this.state.reservationPeriod}
          style={styles.picker}
          onValueChange={(itemValue, itemIndex) =>
            this.setState({ reservationPeriod: itemValue })
          }
        >
          <Picker.Item label="9:00-12:00" value="9:00-12:00" />
          <Picker.Item label="12:00-16:00" value="12:00-16:00" />
          <Picker.Item label="16:00-19:00" value="16:00-19:00" />
          <Picker.Item label="19:00-..." value="19:00-..." />
        </Picker>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  dateContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  datePicker: {
    backgroundColor: primaryColor,
  },
  picker: {
    height: 50,
    width: 150,
  },
});

export default MakeReservation;
