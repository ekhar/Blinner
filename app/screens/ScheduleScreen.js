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
  TouchableOpacity,
} from "react-native";
import Food from "../Food";
import Day from "../Day";

export default function ScheduleScreen({ navigation }) {
  let dates = getDates();
  const [foods, setFoods] = useState([
    Food("./logo.jpg", "sandwich", "20min", "Lunch"),
    Food("./logo.jpg", "sandwich", "20min", "Lunch"),
    Food("./logo.jpg", "Bagel", "5min", "Breakfast"),
    Food("./logo.jpg", "Lasagne", "5min", "Dinner"),
  ]);

  const [day, setday] = useState(Day(foods, dates[1]));

  let today = Day(foods, dates[1]);
  let tommorow = Day([], dates[2]);
  let twodays = Day([], dates[3]);
  return (
    <View style={styles.container}>
      <View style={styles.topbar}>
        <Button title="Menu" onPress={() => navigation.navigate("Menu")} />
        <Button title={dates[0]} />
        <Button title={dates[1]} onPress={() => setday(today)} />
        <Button title={dates[2]} onPress={() => setday(tommorow)} />
        <Button title={dates[3]} onPress={() => setday(twodays)} />
      </View>
      <ScrollView style={styles.foodList}>
        {/*Breakfast*/}
        <Text style={styles.descriptions}>BREAKFAST</Text>
        {renderFoods(day, "Breakfast")}

        {/*Lunch*/}
        <Text style={styles.descriptions}>Lunch</Text>
        {renderFoods(day, "Lunch")}

        {/*Dinner*/}
        <Text style={styles.descriptions}>Dinner</Text>
        {renderFoods(day, "Dinner")}
      </ScrollView>
      <Button title="+" onPress={() => navigation.navigate("AddItem")} />
    </View>
  );
}

function renderFoods(date, kind) {
  let x = [];
  for (let i = 0; i < date.foods.length; i++) {
    if (date.foods[i].kind === kind) {
      x.push(
        renderFood("./logo.jpg", date.foods[i].name, date.foods[i].preptime)
      );
    }
  }
  return x;
}
function renderFood(logo, name, time) {
  return (
    <TouchableOpacity>
      <View style={styles.foodItems}>
        {/*Cannot figure out how to make it load the variable named logo*/}
        <Image style={styles.image} source={require("./logo.jpg")} />
        <View style={styles.foodTexts}>
          <Text style={styles.foodTexts}>{name}</Text>
          <Text style={styles.foodTexts}>{time}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

//to render the list of buttons in the view
function renderButtons(buttonTitles) {
  let buttons = [];
  for (var name of buttonTitles) {
    buttons.push(<Button title={name} />);
  }
  return buttons;
}

//generates strings of 4 days (current day index=1 ) in format MM/DD
function getDates() {
  var dates = [];
  for (let i = -1; i < 3; i++) {
    let new_date = new Date();
    new_date.setDate(new_date.getDate() + i);
    dates.push(
      String(new_date.getMonth() + 1) + "/" + String(new_date.getDate()) + " "
    );
  }
  return dates;
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
    flexDirection: "row",
  },

  //Name of food and how long it takes to cook
  foodTexts: {
    paddingTop: 20,
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
