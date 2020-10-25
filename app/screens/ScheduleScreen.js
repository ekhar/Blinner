import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { Button,StyleSheet, Text, TextInput, View } from 'react-native';

export default function ScheduleScreen(){
    let dates = getDates()
    return (
    <View style={styles.container}>
      <Text>{dates}</Text>
      <View style={styles.container2}>

      </View>
    </View>
  );
}



function getDates(){
    var dates = []
    for(let i=-2;i<3; i++){
        let new_date = new Date()
        new_date.setDate(new_date.getDate()+i)
        dates.push(String(new_date.getMonth()+1) + "/" +String(new_date.getDate()) + " ")
    }
    return dates
}

const styles = StyleSheet.create({
 container:{
   paddingTop: 20,
   flexDirection: 'row',
   justifyContent: 'space-around'
 }, 
 container2: {
   flexDirection: "column",
   justifyContent: "space-evenly",
 },

 meal:{

 }

})
