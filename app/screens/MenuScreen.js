import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import {
  ScrollView,
  Image,
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";

export default function MenuScreen({ navigation }) {
  let user = firebaseApp.auth().currentUser;
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require("./logo.jpg")} />
      <Text>{JSON.stringify(user.displayName)}</Text>
      <Button title={"Schedule"} onPress={() => navigation.navigate("Home")} />
      <Button
        title={"Recipes"}
        onPress={() => navigation.navigate("AddItem")}
      />
      <Button
        title={"Create Recipie"}
        onPress={() => navigation.navigate("NewItem")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    height: 160,
    width: 160,
  },
});
