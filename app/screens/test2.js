import { StatusBar } from 'expo-status-bar';
import React, { Component, useState } from 'react';
import {ScrollView,Image,Button,StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import Food from '../Food'
import Day from '../Day'
export default function HomeScreen({ route, navigation }) {
    React.useEffect(() => {
        if (route.params?.post) {
            // Post updated, do something with `route.params.post`
            // For example, send the post to the server
          }
        }, [route.params?.name]);
    
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Button
            title="Create post"
            onPress={() => navigation.navigate('Details')}
          />
          <Text style={{ margin: 10 }}>Post: {route.params?.post}</Text>
        </View>
      );
    }