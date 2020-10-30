import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import {ScrollView,Image,Button,StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';

export default function MenuScreen(){
    return (
    <View style={styles.container}>
        <Image style = {styles.image} source={require('./logo.png')}/>
        <Text>Name</Text>
        <Button title = {'Schedule'}/> 
        <Button title = {'Recipes'}/> 
        <Button title = {'Ingredients'}/> 
        <Button title = {'Grocery List'}/> 
        <Button title = {'Settings'}/> 
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
      height: 160,
      width: 160
  }
})