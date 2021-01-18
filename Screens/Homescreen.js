import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";

export default class Homescreen extends Component {
  constructor() {
    super();
    this.state = {
      text: "",
      isSearchPressed: null,
      word: "",
      lexicalCategory: "",
      examples: [],
      definition: "",
    };
  }
  getWord = (word) => {
    var searchKeyword = word.toLowerCase();
    var url =
      "https://rupinwhitehatjr.github.io/dictionary/" + searchKeyword + ".json";
    return fetch(url)
      .then((data) => {
        if (data.status === 200) {
          return data.json();
        } else {
          return null;
        }
      })
      .then((response) => {
        var responseObject = response;
        if (responseObject) {
          var wordData = responseObject.definitions[0];
          var definition = wordData.description;
          var lexicalCategory = wordData.wordtype;
          this.setState({
            word: this.state.text,
            definition: definition,
            lexicalCategory: lexicalCategory,
          });
        } else {
          this.setState({
            word: this.state.text,
            definition: "Not Found",
            lexicalCategory: "Not Found",
          });
        }
      });
  };
  render() {
    return (
      <View>
        <TextInput
          style={styles.inputBox}
          onChangeText={(text) => {
            this.setState({
              text: text,
              isSearchPressed: false,
              word: "Loading...",
              lexicalCategory: "",
              examples: [],
              definition: "",
            });
          }}
          value={this.state.text}
        />
        <TouchableOpacity
          style={styles.searchButton}
          onPress={() => {
            this.setState({ isSearchPressed: true });
            this.getWord(this.state.text);
          }}
        >
          <Text style={{ fontWeight: "bold" }}>Search</Text>
        </TouchableOpacity>
        <View style={styles.detailsContainer}>
          <Text style={styles.detailsTitle}>Word: </Text>
          <Text style={{ fontSize: 18 }}>{this.state.word}</Text>
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.detailsTitle}>Type: </Text>
          <Text style={{ fontSize: 18 }}>{this.state.lexicalCategory}</Text>
        </View>
        <View
          style={{
            width: "80%",
            alignSelf: "center",
            flexDirection: "row",
            flexWrap: "wrap",
          }}>
          <Text style={styles.detailsTitle}>Definitions: </Text>
          <Text style={{ fontSize: 18 }}>{this.state.definition}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  inputBox: {
    marginTop: 100,
    width: "80%",
    alignSelf: "center",
    height: 40,
    border: "solid",
    textAlign: "center",
    fontSize: 18,
  },
  searchButton: {
    marginTop: 50,
    marginBottom:25,
    width: "50%",
    alignSelf: "center",
    height: 40,
    border: "solid black",
    textAlign: "center",
    justifyContent: "center",
  },
  detailsContainer: {
    width: "80%",
    alignSelf: "center",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  detailsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FDA500",
  },
});
