import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import Homescreen from "./Screens/Homescreen";

export default class App extends Component {
  render() {
    return (
      <View>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Pocket Dictionary</Text>
        </View>
        <Homescreen />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headerContainer:{
    width:"100%",
    height:55,
    border:"solid",
    justifyContent: "center",
    backgroundColor: "#81007E"
  },
  headerText:{
    alignSelf: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff"
  }
});
