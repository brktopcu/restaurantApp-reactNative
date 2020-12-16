import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
import { Button, Input, Icon } from "react-native-elements";
import { registerUser } from "../api/apiCalls";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { KeyboardAvoidingView } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

export class Register extends Component {
  state = {
    username: "",
    fullName: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  };
  registerUser = async () => {
    const {
      username,
      fullName,
      phoneNumber,
      password,
      confirmPassword,
    } = this.state;
    const user = { username, fullName, phoneNumber, password, confirmPassword };
    const newUser = await registerUser(user);
    console.log(newUser);
    this.props.navigation.navigate("Login");
  };
  render() {
    return (
      <View style={styles.container}>
        <Input
          leftIcon={<MaterialIcons name="email" size={15} color="black" />}
          label="E-posta adresi"
          value={this.state.username}
          onChangeText={(text) => this.setState({ username: text })}
        />
        <Input
          leftIcon={<FontAwesome name="user" size={15} color="black" />}
          label="Ad Soyad"
          value={this.state.fullName}
          onChangeText={(text) => this.setState({ fullName: text })}
        />
        <Input
          leftIcon={<FontAwesome name="phone" size={15} color="black" />}
          label="Telefon numarası"
          value={this.state.phoneNumber}
          onChangeText={(text) => this.setState({ phoneNumber: text })}
        />
        <Input
          leftIcon={<Entypo name="lock" size={15} color="black" />}
          label="Şifre"
          value={this.state.password}
          onChangeText={(text) => this.setState({ password: text })}
          secureTextEntry={true}
          password={true}
        />
        <Input
          leftIcon={<Entypo name="lock" size={15} color="black" />}
          label="Şifreyi Onayla"
          value={this.state.confirmPassword}
          onChangeText={(text) => this.setState({ confirmPassword: text })}
          secureTextEntry={true}
          password={true}
        />
        <Button title="Kayıt Ol" type="clear" onPress={this.registerUser} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  text: {
    fontWeight: "bold",
  },
});

export default Register;
