import React, { Component } from "react";
import { ScrollView } from "react-native";
import { Text, View, StyleSheet } from "react-native";
import {
  Image,
  Divider,
  Button,
  Input,
  Overlay,
  Rating,
} from "react-native-elements";
import { primaryColor } from "../api/constants";
import Comment from "../components/Comment";
import _ from "lodash";
import { sendComment } from "../api/apiCalls";
import { connect } from "react-redux";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

export class RestaurantDetails extends Component {
  state = {
    commentText: "",
    commentScore: 0,
    scoreEmptyError: false,
    commentSuccess: false,
  };
  componentDidMount() {
    this.props.navigation.setOptions({
      title: this.props.route.params.restaurantName,
    });
  }

  handleCommentSend = async () => {
    if (this.state.commentScore === 0) {
      this.setState({ scoreEmptyError: true });
    } else {
      const token = this.props.userDetails.user.token;
      const comment = {
        commentText: this.state.commentText,
        commentScore: this.state.commentScore,
      };
      try {
        const response = await sendComment(
          this.props.route.params.restaurantId,
          token,
          comment
        );

        this.setState({
          commentText: "",
          commentScore: 0,
          commentSuccess: true,
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

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
  renderScore = () => {
    return (
      <View style={styles.scoreContainer}>
        <TouchableOpacity>
          <AntDesign
            name="minuscircle"
            size={24}
            color="black"
            onPress={() => {
              if (this.state.commentScore > 0) {
                this.setState((prevState) => ({
                  commentScore: prevState.commentScore - 1,
                }));
              }
            }}
          />
        </TouchableOpacity>
        <Text style={styles.scoreText}>{this.state.commentScore}</Text>
        <TouchableOpacity>
          <AntDesign
            name="pluscircle"
            size={24}
            color="black"
            onPress={() => {
              if (this.state.commentScore < 5) {
                this.setState((prevState) => ({
                  commentScore: prevState.commentScore + 1,
                }));
              }
            }}
          />
        </TouchableOpacity>
      </View>
    );
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
        {this.renderScore()}
        <Input
          placeholder="Yorum yazın..."
          multiline
          value={this.state.commentText}
          onChangeText={(text) => this.setState({ commentText: text })}
        />
        <Button
          title="Gönder"
          onPress={this.handleCommentSend}
          buttonStyle={{
            width: 150,
            marginTop: 20,
            marginLeft: 10,
            marginBottom: 20,
          }}
        />
        <Overlay
          isVisible={this.state.scoreEmptyError}
          onBackdropPress={() => {
            this.setState({ scoreEmptyError: false });
          }}
        >
          <View style={styles.errorTextContainer}>
            <MaterialIcons name="error" size={30} color="orange" />
            <Text style={styles.errorText}>Lütfen bir puan verin!</Text>
          </View>
        </Overlay>
        <Overlay
          isVisible={this.state.commentSuccess}
          onBackdropPress={() => {
            this.setState({ commentSuccess: false });
          }}
        >
          <View style={styles.errorTextContainer}>
            <AntDesign name="checkcircle" size={30} color="green" />
            <Text style={styles.errorText}>
              Yorumunuz başarıyla gönderildi.
            </Text>
          </View>
        </Overlay>
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
  errorTextContainer: {
    flexDirection: "row",
    padding: 25,
  },
  errorText: {
    paddingTop: 7,
    marginLeft: 5,
    fontWeight: "bold",
  },
  scoreContainer: {
    flexDirection: "row",
    marginTop: 30,
    marginBottom: 20,
    marginLeft: 20,
  },
  scoreText: {
    fontSize: 20,
    marginRight: 10,
    marginLeft: 10,
  },
});

const mapStateToProps = (state) => {
  const { userDetails } = state;
  return { userDetails };
};

export default connect(mapStateToProps, null)(RestaurantDetails);
