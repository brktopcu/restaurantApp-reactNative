import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
import { Button, Input } from "react-native-elements";
import { MaterialIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { loginRequest } from "../api/apiCalls";
import jwt_decode from "jwt-decode";
import { connect } from "react-redux";
import { setUserAction } from "../redux/actions/setUserAction";

export class Login extends Component {
  state = {
    username: "",
    password: "",
    showErrorMessage: false,
  };

  handleLogin = async () => {
    const user = {
      username: this.state.username,
      password: this.state.password,
    };
    try {
      const response = await loginRequest(user);
      const decodedToken = jwt_decode(response.token);
      const userWithToken = { ...decodedToken, token: response.token };
      this.props.setUserAction(userWithToken);
      console.log(userWithToken);
      this.props.updateUser();
    } catch (error) {
      this.setState({ showErrorMessage: true });
      console.log(error);
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Input
          label="E-posta adresi"
          leftIcon={<MaterialIcons name="email" size={15} color="black" />}
          value={this.state.username}
          onChangeText={(text) => this.setState({ username: text })}
        />
        <Input
          label="Şifre"
          leftIcon={<Entypo name="lock" size={15} color="black" />}
          value={this.state.password}
          onChangeText={(text) => this.setState({ password: text })}
          secureTextEntry={true}
          password={true}
        />
        {this.state.showErrorMessage && (
          <Text style={styles.text}>Hatalı giriş yaptınız!</Text>
        )}
        <Button title="Giriş Yap" type="clear" onPress={this.handleLogin} />
        <Button
          title="Kayıt Ol"
          type="clear"
          onPress={() => {
            this.props.navigation.navigate("Register");
          }}
        />
      </View>
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
  text: {
    fontWeight: "bold",
  },
});

const mapStateToProps = (state) => {
  const { userDetails } = state;
  return { userDetails };
};

export default connect(mapStateToProps, { setUserAction })(Login);
