import React, { Component } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Text, Input, Button, Divider } from "react-native-elements";
import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { getTablesUrl, primaryColor } from "../api/constants";
import { fetchTables } from "../api/apiCalls";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import { TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import dateformat from "dateformat";

export class MakeReservation extends Component {
  state = {
    reservationName: "",
    reservationLastName: "",
    reservationDate: "",
    reservationPeriod: "",
    guestCount: 0,
    reservationNote: "",
    rtableId: 0,
    tables: [],
    showDatePicker: false,
    selectedDate: new Date(),
  };

  componentDidMount = () => {
    this.getTables();
    this.setState({ reservationDate: this.format(new Date()) });
  };

  getTables = async () => {
    try {
      const tables = await fetchTables(
        this.props.route.params.restaurantId,
        this.props.userDetails.user.token
      );
      this.setState({ tables });
    } catch (error) {
      console.log(error);
    }
  };

  setDate = (event, selectedDate) => {
    if (selectedDate === undefined) {
      this.setState({ selectedDate: new Date(), showDatePicker: false });
    } else {
      this.setState({
        selectedDate: selectedDate,
        showDatePicker: false,
        reservationDate: this.format(selectedDate),
      });
    }
  };

  format = (date) => {
    return dateformat(date, "dd-mm-yyyy");
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.headerText} h2>
          {this.props.route.params.restaurantName}
        </Text>
        <Divider style={styles.divider} />
        <Input
          leftIcon={<FontAwesome name="user" size={15} color="black" />}
          label="Ad"
          value={this.state.reservationName}
          onChangeText={(text) => this.setState({ reservationName: text })}
        />
        <Input
          leftIcon={<FontAwesome name="user" size={15} color="black" />}
          label="Soyad"
          value={this.state.reservationLastName}
          onChangeText={(text) => this.setState({ reservationLastName: text })}
        />

        <View style={styles.dateContainer}>
          {this.state.selectedDate && (
            <Text style={styles.dateText}>{this.state.reservationDate}</Text>
          )}

          <Button
            title="Tarih seçin"
            onPress={() => this.setState({ showDatePicker: true })}
          />

          {this.state.showDatePicker && (
            <RNDateTimePicker
              value={this.state.selectedDate}
              mode="date"
              onChange={this.setDate}
            />
          )}
        </View>

        <Picker
          selectedValue={this.state.reservationPeriod}
          style={styles.picker}
          onValueChange={(itemValue, itemIndex) =>
            this.setState({ reservationPeriod: itemValue })
          }
        >
          <Picker.Item label="Saat aralığı seçin" value="" />
          <Picker.Item label="9:00-12:00" value="9:00-12:00" />
          <Picker.Item label="12:00-16:00" value="12:00-16:00" />
          <Picker.Item label="16:00-19:00" value="16:00-19:00" />
          <Picker.Item label="19:00-..." value="19:00-..." />
        </Picker>

        <Picker
          selectedValue={this.state.guestCount}
          style={styles.picker}
          onValueChange={(itemValue, itemIndex) =>
            this.setState({ guestCount: itemValue })
          }
        >
          <Picker.Item label="Kişi sayısını seçin" value={0} />
          <Picker.Item label="1" value={1} />
          <Picker.Item label="2" value={2} />
          <Picker.Item label="3" value={3} />
          <Picker.Item label="4" value={4} />
          <Picker.Item label="5" value={5} />
          <Picker.Item label="6" value={6} />
        </Picker>

        <Picker
          selectedValue={this.state.rtableId}
          style={styles.picker}
          onValueChange={(itemValue, itemIndex) =>
            this.setState({ rtableId: itemValue })
          }
        >
          <Picker.Item label="Masanızı seçin" value="" />
          {this.state.tables &&
            this.state.tables.map((table) => (
              <Picker.Item
                key={table.tableId}
                label={table.tableName + " (" + table.tableDescription + ")"}
                value={table.tableId}
              />
            ))}
        </Picker>

        <Input
          leftIcon={
            <MaterialCommunityIcons
              name="library-books"
              size={15}
              color="black"
            />
          }
          label="Not"
          value={this.state.reservationNote}
          onChangeText={(text) => this.setState({ reservationNote: text })}
          multiline
          style={styles.multilineText}
        />

        <Button
          title="Gönder"
          onPress={() => console.log("Rezervasyon gönderildi")}
          buttonStyle={styles.sendButton}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerText: {
    alignSelf: "center",
  },
  dateContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    margin: 20,
  },
  dateText: {
    fontWeight: "bold",
  },
  datePicker: {
    backgroundColor: primaryColor,
  },
  picker: {
    height: 50,
    width: 200,
  },
  pickerItem: {},
  multilineText: {
    height: 60,
  },
  divider: {
    backgroundColor: primaryColor,
    height: 1.5,
    marginTop: 15,
    marginBottom: 15,
    width: 180,
    alignSelf: "center",
  },
  sendButton: {
    marginBottom: 15,
  },
});

const mapStateToProps = (state) => {
  const { userDetails } = state;
  return { userDetails };
};

export default connect(mapStateToProps)(MakeReservation);
