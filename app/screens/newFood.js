import { StatusBar } from "expo-status-bar";
import React, { Component, useState } from "react";
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
  FlatList,
  Image,
} from "react-native";
import Food from "../Food";
import * as firebaseApp from "firebase";
import { Formik } from "formik";
import * as ImagePicker from "expo-image-picker";

export default function NewFood({ navigation }) {
  let user = firebaseApp.auth().currentUser;
  let food = { name: "", preptime: "", kind: "", ingredients: [""] };

  async function pickImage(handleChange) {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });
    console.log(result);
    if (!result.cancelled) {
      handleChange(result.uri);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Create The Recipe</Text>

      <Formik
        initialValues={{
          name: "",
          preptime: "",
          kind: "",
          ingredients: [""],
          instructions: "",
          image: "",
        }}
        onSubmit={(values) => {
          firebaseApp
            .database()
            .ref("users/" + user.uid + "/foods")
            .push()
            .set(values);
          navigation.push("AddItem");
        }}
      >
        {(props) => (
          <View>
            <TextInput
              style={styles.input}
              placeholder="Recipe Name"
              onChangeText={props.handleChange("name")}
              value={props.values.name}
            />

            <TextInput
              multiline
              style={styles.input}
              placeholder="Preptime"
              onChangeText={props.handleChange("preptime")}
              value={props.values.preptime}
              keyboardType="numeric"
            />

            <TextInput
              placeholder="Breakfast, Lunch, or Dinner"
              onChangeText={props.handleChange("kind")}
              style={styles.input}
              value={props.values.kind}
            />

            <TextInput
              placeholder="Ingredients"
              onChangeText={props.handleChange("ingredients")}
              value={props.values.ingredients}
              style={styles.input}
            />

            <TextInput
              multiline
              placeholder="Cooking Instructions"
              onChangeText={props.handleChange("instructions")}
              value={props.values.instructions}
              style={styles.input}
            />
            <View>
              <Button
                title="choose a picture"
                icon="add-a-photo"
                mode="contained"
                style={styles.button}
                onPress={() => {
                  pickImage(props.handleChange("image"));
                }}
              />
              {props.values.image && props.values.image.length > 0 ? (
                <Image
                  source={{ uri: props.values.image }}
                  style={{ width: 200, height: 200 }}
                />
              ) : null}
            </View>
            <Button
              color="maroon"
              title="Submit"
              onPress={props.handleSubmit}
            />
          </View>
        )}
      </Formik>
      <StatusBar style="auto" />
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
