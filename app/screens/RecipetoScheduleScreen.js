import { StatusBar } from "expo-status-bar";
import React, { Component, useState } from "react";
import {
  SearchBar,
  ScrollView,
  Image,
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import * as firebaseApp from "firebase";

export default function RecipetoSchedule({ navigation }) {
  let user = firebaseApp.auth().currentUser;
  let ref = firebaseApp.database().ref("users/" + user.uid + "/foods");
  let display1 = [];
  ref.on("value", (snapshot) => {
    const data = snapshot.val();
    for (let name in data) {
      display1.push(data[name]);
    }
  });

  return (
    <View style={styles.container}>
      <Button
        align="left"
        title="Settings"
        onPress={() => navigation.push("Menu")}
      />
      <View style={styles.topbar}>
        <Text>View All Created Recipes Here</Text>
      </View>
      <Text>Touch Image to Add to Schedule</Text>
      <FlatList numColumns={2} data={display1} renderItem={renderFood} />

      <Button
        title="Create new Recipe"
        onPress={() =>
          navigation.push("NewItem", {
            itemId: Math.floor(Math.random() * 100),
          })
        }
      />
    </View>
  );

  function renderFood({ item }) {
    return (
      <TouchableOpacity
        onPress={() => {
          let recent = firebaseApp
            .database()
            .ref("users/" + user.uid + "/recent");
          recent.once("value", (snapshot) => {
            let date = snapshot.val();

            firebaseApp
              .database()
              .ref("users/" + user.uid + "/" + date)
              .push()
              .set(item);

            navigation.navigate("Home");
          });
        }}
      >
        <View style={styles.foodItems}>
          <Image style={styles.image} source={{ uri: item.image }} />
          <View style={styles.foodTexts}>
            <Text style={styles.foodTexts}>{item.name}</Text>
            <Text style={styles.foodTexts}>{item.preptime + " min"}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

function renderFoods(foods) {
  let foodlist = [];
  for (let i = 0; i < foods.length; i++) {
    foodlist.push(renderFood(foods[i]));
  }

  return foodlist;
}

//to render the list of buttons in the view
function renderButtons(buttonTitles) {
  let buttons = [];
  for (var name of buttonTitles) {
    buttons.push(<Button title={name} />);
  }
  return buttons;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  //Top Bar with dates
  topbar: {
    paddingTop: 20,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  //Breakfast Lunch and Dinner segments
  foodList: {
    flex: 1,
    flexDirection: "column",
  },

  //Image to the right, name in middle, calorie count
  foodItems: {
    width: "50%",
  },

  //Name of food and how long it takes to cook
  foodTexts: {
    flexDirection: "column",
  },
  //image of the food item
  image: {
    width: 160,
    height: 160,
  },
  descriptions: {
    fontWeight: "bold",
    padding: 15,
  },
});
