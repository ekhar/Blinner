import { StatusBar } from 'expo-status-bar';
import React, { Component, useState } from 'react';
import { ScrollView,Image,Button,StyleSheet, Text, TextInput, View, FlatList, TouchableOpacity } from 'react-native';
import Food from '../Food.js'
export default function RecipetoSchedule(){

    let sandwich = Food('./logo.png', 'sandwich', '20 min')
    let sand = [sandwich,sandwich,sandwich,sandwich, sandwich, sandwich, sandwich]
    return (
    <View style={styles.container}>
    <View style={styles.topbar}>
      {renderButtons(["Settings","All","Breakfast","Lunch","Dinner"])}
    </View>

    <FlatList 
        numColumns = {2}
        data={sand} 
        renderItem={renderFood} 
      />

{/*
     <ScrollView style= {styles.foodlist}>
         {renderFoods(sandwiches)}
     </ScrollView>
*/}
  </View>
  );
}


function renderFoods(foods){
    let foodlist = []
    for(let i=0; i<foods.length; i++){
      foodlist.push(renderFood(foods[i])) 
  
    }

    return foodlist
}
function renderFood({item}){
        return(
            <TouchableOpacity>
      <View style = {styles.foodItems}>
        {/*Cannot figure out how to make it load the variable named logo*/}
           <Image style = {styles.image}source={require('./logo.png')}/>
          <View style= {styles.foodTexts}>
           <Text style = {styles.foodTexts}>{item.name}</Text>
           <Text style = {styles.foodTexts}>{item.preptime}</Text>
          </View>
       </View>
       </TouchableOpacity>
        )
}

//to render the list of buttons in the view
function renderButtons(buttonTitles){
  let buttons = []
  for(var name of buttonTitles){
      buttons.push(<Button title={name}/>)
  }
  return buttons

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  //Top Bar with dates
  topbar:{
   paddingTop: 20,
   flexDirection: 'row',
   justifyContent: 'space-around'
 }, 
 //Breakfast Lunch and Dinner segments
  foodList: {
   flex: 1,
   flexDirection: 'column',
 },

//Image to the right, name in middle, calorie count
 foodItems:{
   width: '50%'
 },

 //Name of food and how long it takes to cook
 foodTexts:{
  flexDirection : "column"
  
 },
 //image of the food item
 image:{
   width:160, 
   height: 160
 },
 descriptions:{
    fontWeight: "bold", 
    padding: 15
 },
})
