import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LoginScreen from './app/screens/LoginScreen';
import ScheduleScreen from './app/screens/ScheduleScreen';

export default function App() {
  //return (<LoginScreen></LoginScreen>);
  return (<ScheduleScreen></ScheduleScreen>);
  }
