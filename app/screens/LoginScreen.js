import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

export default function LoginScreen(){
  
    const Button = ({ onPress, children }) => {

        return (
          <TouchableOpacity onPress={onPress} style={styles.buttonStyle}>
            <Text style={styles.textStyle}>
                {children}
            </Text>
          </TouchableOpacity>
        );
      };
  
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

  textStyle: {
    alignSelf: 'center',
    color: 'teal',
    fontSize: 16,
    fontWeight: '600',
    paddingTop: 10,
    paddingBottom: 10,
},
buttonStyle: {
    flex: 1,
    backgroundColor: 'white',
    marginLeft: 5,
    marginRight: 5,
    borderRadius: 50
},

})
