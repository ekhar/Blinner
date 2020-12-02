import { StatusBar } from "expo-status-bar";
import React, { Component, useState } from "react";
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
  FlatList,
} from "react-native";
import Food from "../Food";

export default function NewFood({ navigation }) {
  let food = { name: "", kind: "", image: "", preptime: "", ingredients: [] };
  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Create The Recipe</Text>

      <Text>Name:</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => {
          setName(text, food);
        }}
      />

      <Text>Prep Time:</Text>
      <TextInput
        multiline
        style={styles.input}
        onChangeText={(text) => {
          setPreptime(text, food);
        }}
      />

      <Text>Breakfast, Lunch, or Dinner?</Text>
      <TextInput
        multiline
        style={styles.input}
        onChangeText={(text) => {
          setKind(text, food);
        }}
      />

      <Text>Ingredients</Text>

      <View style={styles.row}>
        <TextInput
          style={styles.input}
          onChangeText={(text) => {
            setIngredients(text, food);
          }}
          placeholder="Sub-ingredient"
        />
        <Button style={styles.button} title="Add" onPress={() => {}} />
      </View>

      <FlatList items={food.ingredients} />

      <StatusBar style="auto" />
      <Button
        title="Add to Recipes"
        onPress={() => navigation.push("AddItem")}
      />
    </View>
  );

  function setName(text, food) {
    food.name = text;
  }
  function setPreptime(text, food) {
    food.preptime = text;
  }
  function setIngredients(text, food) {
    food.ingredients.push(text);
  }
  function setKind(text, food) {
    food.kind = text;
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  welcome: {
    fontSize: 40,
    textAlign: "center",
    margin: 10,
    color: "black",
  },
  input: {
    width: "60%",
    height: 40,
    backgroundColor: "grey",
    padding: 10,
    marginBottom: 10,
  },
  row: {
    justifyContent: "space-between",
    alignSelf: "stretch",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 32,
  },
});
