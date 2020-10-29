import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import {ScrollView,Image,Button,StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';

export default function ScheduleScreen(){
    let dates = getDates()
    return (
    <View style={styles.container}>
    <View style={styles.topbar}>
      <Button title="settings" />
      {renderButtons(dates)}
      </View>
      <ScrollView style={styles.foodList}>
      {/*Note renderFood does not dynamically take logos yet */}
      {/*Breakfast*/}
      <Text style = {styles.descriptions}>BREAKFAST</Text>
      {renderFood('./logo.png', 'sandwich', '20 min')}

      {/*Lunch*/}
      <Text style = {styles.descriptions}>Lunch</Text>
      {renderFood('./logo.png', 'sandwich', '20 min')}

      {/*Dinner*/}
      <Text style = {styles.descriptions}>Dinner</Text>
      {renderFood('./logo.png', 'sandwich', '20 min')}
      {renderFood('./logo.png', 'sandwich', '20 min')}

    
    
    </ScrollView>
  </View>
  );
}



function renderFood(logo, name, time){
        return(
          <TouchableOpacity>
      <View style = {styles.foodItems}>
        {/*Cannot figure out how to make it load the variable named logo*/}
           <Image style = {styles.image}source={require('./logo.png')}/>
          <View style= {styles.foodTexts}>
           <Text style = {styles.foodTexts}>{name}</Text>
           <Text style = {styles.foodTexts}>{time}</Text>
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

//generates strings of 4 days (current day index=1 ) in format MM/DD
function getDates(){
    var dates = []
    for(let i=-1;i<3; i++){
        let new_date = new Date()
        new_date.setDate(new_date.getDate()+i)
        dates.push(String(new_date.getMonth()+1) + "/" +String(new_date.getDate()) + " ")
    }
    return dates
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
   flexDirection : 'row'
 },

 //Name of food and how long it takes to cook
 foodTexts:{
  paddingTop : 20,
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
