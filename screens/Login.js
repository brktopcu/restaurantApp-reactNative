import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
import { Button, Input, ThemeProvider } from "react-native-elements";
import { MaterialIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { loginRequest } from "../api/apiCalls";
import jwt_decode from "jwt-decode";
import { connect } from "react-redux";
import { setUserAction } from "../redux/actions/setUserAction";

const theme = {
  colors: {
    primary: "#db2828",
  },
};

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
      console.log(response);
      const decodedToken = jwt_decode(response.token);
      //set response.token globally(redux)
      //route to home screen
      this.props.setUserAction(decodedToken);
      console.log(this.props.userDetails);
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <ThemeProvider theme={theme}>
        <View>
          <Text> Login </Text>
          <Input
            placeholder="E-posta adresinizi girin"
            leftIcon={<MaterialIcons name="email" size={15} color="black" />}
            value={this.state.username}
            onChangeText={(text) => this.setState({ username: text })}
          />
          <Input
            placeholder="Şifrenizi girin"
            leftIcon={<Entypo name="lock" size={15} color="black" />}
            value={this.state.password}
            onChangeText={(text) => this.setState({ password: text })}
            secureTextEntry={true}
            password={true}
          />
          <Button title="Giriş Yap" type="clear" onPress={this.handleLogin} />
          <Button
            title="Kayıt Ol"
            type="clear"
            onPress={() => {
              this.props.navigation.navigate("Register");
            }}
          />
        </View>
      </ThemeProvider>
    );
  }
}

const mapStateToProps = (state) => {
  const { userDetails } = state;
  return { userDetails };
};

export default connect(mapStateToProps, { setUserAction })(Login);
