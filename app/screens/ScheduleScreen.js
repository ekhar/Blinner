import { StatusBar } from "expo-status-bar";
import React, { Component, useState } from "react";
import {
  ScrollView,
  FlatList,
  Image,
  Button,
  StyleSheet,
  Text,
  TextInput,
  SafeAreaView,
  View,
  TouchableOpacity,
  Modal,
} from "react-native";
import * as firebaseApp from "firebase";

export default function ScheduleScreen({ navigation }) {
  let dates = getDates();
  let user = firebaseApp.auth().currentUser;
  let display = [];
  const [date, setdate] = useState(dates[0].replace("/", "s"));
  const [modalOpen, setModalOpen] = useState(false);
  const [modalItem, setModalItem] = useState({});
  function renderFood({ item }) {
    return (
      <View>
        <Modal visible={modalOpen} animationType="slide">
          <View>
            <Button
              title="close"
              size={24}
              onPress={() => setModalOpen(false)}
            />
            <View>
              <Image style={styles.image} source={{ uri: modalItem.image }} />
              <View style={styles.foodTexts}>
                <Text style={styles.foodTexts}>
                  {"Recipe Name: " + modalItem.name}
                </Text>
                <Text style={styles.foodTexts}>
                  {"Preptime: " + modalItem.preptime + " min"}
                </Text>
                <Text>{"Ingredients: " + modalItem.ingredients}</Text>
                <Text>{"Meal Type: " + modalItem.kind}</Text>
                <Text>{"Cooking Instructions: " + modalItem.instructions}</Text>
              </View>
            </View>
          </View>
        </Modal>
        <TouchableOpacity
          value={item}
          onPress={() => {
            setModalItem(item);
            setModalOpen(true);
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
      </View>
    );
  }

  function renderList(x, navigation) {
    let user = firebaseApp.auth().currentUser;
    let ref = firebaseApp.database().ref("users/" + user.uid + "/" + x);
    ref.on("value", (snapshot) => {
      const data = snapshot.val();
      display = [];
      for (let name in data) {
        display.push(data[name]);
      }
    });
    return (
      <View>
        <Text style={styles.descriptions}>
          {"Schedule for " + date.replace("s", "/")}
        </Text>
        <Text style={styles.descriptions}>BREAKFAST</Text>
        <FlatList
          style={styles.foodItems}
          numColumns={2}
          data={display.filter((item) => item.kind === "Breakfast")}
          renderItem={renderFood}
        />
        <Text style={styles.descriptions}>Lunch</Text>
        <FlatList
          style={styles.foodItems}
          numColumns={2}
          data={display.filter((item) => item.kind === "Lunch")}
          renderItem={renderFood}
        />
        <Text style={styles.descriptions}>Dinner</Text>
        <FlatList
          style={styles.foodItems}
          numColumns={2}
          data={display.filter((item) => item.kind === "Dinner")}
          renderItem={renderFood}
        />
      </View>
    );
  }

  function renderDates({ item }) {
    return (
      <Button
        value={item}
        title={item}
        onPress={() => {
          setdate(item.replace("/", "s"));
        }}
      />
    );
  }
  //generates strings of 4 days (current day index=1 ) in format MM/DD
  function getDates() {
    var dates = [];
    for (let i = -1; i < 13; i++) {
      let new_date = new Date();
      new_date.setDate(new_date.getDate() + i);
      dates.push(
        String(new_date.getMonth() + 1) + "/" + String(new_date.getDate()) + " "
      );
    }
    return dates;
  }
  return (
    <View style={styles.container}>
      <View style={styles.topbar}>
        <Button
          height="4%"
          width="2%"
          title="Menu"
          onPress={() => navigation.navigate("Menu")}
        />
        <FlatList
          paddingTop={50}
          horizontal={true}
          data={dates}
          renderItem={renderDates}
        />
      </View>

      <Button
        title="+"
        onPress={() => {
          let recent = firebaseApp
            .database()
            .ref("users/" + user.uid + "/recent");
          recent.set(date);
          navigation.navigate("AddItem");
        }}
      />
      {renderList(date, navigation)}
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
    paddingHorizontal: 23,
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
