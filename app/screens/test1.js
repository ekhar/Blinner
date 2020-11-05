import { StatusBar } from 'expo-status-bar';
import React, { Component, useState } from 'react';
import {ScrollView,Image,Button,StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import Food from '../Food'
import Day from '../Day'
export default function DetailsScreen({ route, navigation }) {
    const [postText, setPostText] = React.useState('');

    return (
      <>
        <TextInput
          multiline
          placeholder="What's on your mind?"
          style={{ height: 200, padding: 10, backgroundColor: 'white' }}
          value={postText}
          onChangeText={setPostText}
        />
        <Button
          title="Done"
          onPress={() => {
            // Pass params back to home screen
            navigation.navigate('Home',{ post: postText });
          }}
        />
      </>
    );
  }