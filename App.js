import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import ScheduleScreen from './app/screens/ScheduleScreen'
import RecipetoSchedule from './app/screens/RecipetoScheduleScreen'
import MenuScreen from './app/screens/MenuScreen'
import NewFood from './app/screens/newFood'
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './app/screens/LoginScreen'


export default function App() {
 const Stack = createStackNavigator();

//return (<Test></Test>)
//return (<LoginApp/>)
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" mode="modal">

        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={ScheduleScreen} />
        <Stack.Screen name="NewItem" component={NewFood} />
        <Stack.Screen name="Menu" component={MenuScreen} />
        <Stack.Screen name="AddItem" component={RecipetoSchedule} />
      </Stack.Navigator>
    </NavigationContainer>
  );

}
