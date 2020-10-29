import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LoginScreen from './app/screens/LoginScreen';
import ScheduleScreen from './app/screens/ScheduleScreen';
import RecipetoSchedule from './app/screens/RecipetoScheduleScreen'
import Test from './app/screens/test'
export default function App() {
  //return (<LoginScreen></LoginScreen>);
  //return (<ScheduleScreen></ScheduleScreen>);
  return (<RecipetoSchedule></RecipetoSchedule>);
  //return (<Test></Test>)  
}
