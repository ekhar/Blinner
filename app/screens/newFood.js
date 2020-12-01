import { StatusBar } from "expo-status-bar";
import React, { Component, useState } from "react";
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
  GridList,
} from "react-native";
import Food from "../Food";

export default function NewFood({ navigation }) {
  const [name, setname] = useState("");
  const [preptime, setpreptime] = useState("");
  const [kind, setkind] = useState("");
  const [ingredients, setingredients] = useState([]);
  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Create The Recipe</Text>

      <Text>Name:</Text>
      <TextInput style={styles.input} value={name} onChangeText={setname} />

      <Text>Prep Time:</Text>
      <TextInput
        multiline
        style={styles.input}
        value={preptime}
        onChangeText={setpreptime}
      />

      <Text>Breakfast, Lunch, or Dinner?</Text>
      <TextInput
        multiline
        style={styles.input}
        value={kind}
        onChangeText={setkind}
      />

      <Text>Ingredients</Text>

      <View style={styles.row}>
        <TextInput
          style={styles.formInput}
          onChangeText={(text) => {
            props.setSubIngredients(text);
          }}
          placeholder="Sub-ingredient"
        />
        <Button
          style={styles.button}
          title="Add"
          onPress={() => {
            props.submitSubIngredients();
          }}
        />
      </View>

      <GridList items={props.food.subIngredients} />

      <StatusBar style="auto" />
      <Button
        title="Add to Recipes"
        onPress={() =>
          navigation.push("AddItem", {
            name: name,
            preptime: preptime,
            kind: kind,
          })
        }
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
