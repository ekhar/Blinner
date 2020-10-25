import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { Button,StyleSheet, Text, TextInput, View } from 'react-native';

export default function LoginScreen(){
  
    return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Blinner</Text>
      
      <TextInput 
      style={styles.input}
      placeholder = "Username"
      />
      <TextInput 
      style={styles.input}
      placeholder = "Password"
      />
      <StatusBar style="auto" />
      <Button title="login" padding="15" />
      <Button title="Create account" />



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
  welcome: {
    fontSize: 40,
    textAlign: 'center',
    margin: 10,
    color: "black",
  },
  input: {
      width: "60%",
      height: 40,
      backgroundColor: "grey",
      padding: 10,
      marginBottom: 10
  },

})
