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
import Food from "../Food.js";

export default function RecipetoSchedule({ navigation }) {
  const [foods, setFoods] = useState([
    Food("./logo.png", "sandwich", "20min", "Lunch"),
    Food("./logo.png", "Bagel", "5min", "Breakfast"),
    Food("./logo.png", "Lasagne", "5min", "Dinner"),
  ]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        paddingTop={75}
        placeholder="Search for item"
      />
      <View style={styles.topbar}>
        {renderButtons(["All", "Breakfast", "Lunch", "Dinner"])}

        <Button
          title="Settings"
          onPress={() => navigation.push("Menu", { id: 36 })}
        />
      </View>

      <FlatList numColumns={2} data={foods} renderItem={renderFood} />

      {/*
     <ScrollView style= {styles.foodlist}>
         {renderFoods(sandwiches)}
     </ScrollView>
*/}
      <Button paddingBottom={50} title="Add to schedule" />

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
      <TouchableOpacity onPress={() => navigation.navigate("Home")}>
        <View style={styles.foodItems}>
          {/*Cannot figure out how to make it load the variable named logo*/}
          <Image style={styles.image} source={require("./logo.jpg")} />
          <View style={styles.foodTexts}>
            <Text style={styles.foodTexts}>{item.name}</Text>
            <Text style={styles.foodTexts}>{item.preptime}</Text>
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
