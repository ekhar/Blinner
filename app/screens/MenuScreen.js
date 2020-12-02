import { StatusBar } from "expo-status-bar";
import React, { Component, useState } from "react";
import {
  ScrollView,
  Image,
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
  Modal,
  TouchableOpacity,
} from "react-native";
import * as firebaseApp from "firebase";

export default function MenuScreen({ navigation }) {
  let user = firebaseApp.auth().currentUser;
  let display = [];
  const [modalOpen, setModalOpen] = useState(false);
  function getIngredients() {
    let ref = firebaseApp.database().ref("users/" + user.uid);

    ref.once("value", (snapshot) => {
      const data = snapshot.val();
      display = [];
      for (let name in data) {
        display.push(data[name]);
      }
    });
    display = display.slice(0, -2);
    let ingredients = [];
    for (let name in display) {
      let values = Object.values(display[name]);
      for (let day in values) {
        ingredients.push(values[day].ingredients);
        //ingredients.push(day.ingredients);
      }
    }

    ingredients = ingredients.join(", ");
    ingredients = ingredients.split(", ");
    ingredients = ingredients.map(
      (ingredient) =>
        ingredient.charAt(0).toUpperCase() + ingredient.substring(1)
    );

    var count = {};
    ingredients.forEach((i) =>
      i.length === 0 ? null : (count[i] = (count[i] || 0) + 1)
    );

    ingredients = Object.keys(count);
    let freq = Object.values(count);
    console.log(ingredients);
    let ingredients_string = ingredients.join(", ");
    let frequencies = [];

    for (let i = 0; i < ingredients.length; i++) {
      let foo =
        ingredients[i] + " in " + freq[i] + " meals over the next 2 weeks";
      frequencies.push(foo);
    }
    let frequencies_string = frequencies.join("\n");
    return (
      <View>
        <Text>Ingredients: {ingredients_string}</Text>
        <Text>Frequencies: {frequencies_string}</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Modal visible={modalOpen} animationType="slide">
        <View>
          <Button title="close" size={24} onPress={() => setModalOpen(false)} />
          {getIngredients()}
        </View>
      </Modal>
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

      <Button
        title="Generate Grocery List"
        onPress={() => setModalOpen(true)}
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
