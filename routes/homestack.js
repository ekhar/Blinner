import {createStackNavigator} from 'react-navigation-stack'
import React from "react";
import {NavigationContainer} from "@react-navigation/native"
import {createAppContainer} from 'react-navigation'
import ScheduleScreen from '../app/screens/ScheduleScreen'
import RecipetoSchedule from '../app/screens/RecipetoScheduleScreen'
import MenuScreen from '../app/screens/MenuScreen'
import NewFood from '../app/screens/newFood'
const screens = {
    Home:  {
        screen: ScheduleScreen 
    },
    NewItem: {
        screen: NewFood
    },

    AddItem:  {
        screen: RecipetoSchedule
    },

    Menu: {
        screen: MenuScreen
    },

    
}
const HomeStack = createStackNavigator(screens)

export default createAppContainer(HomeStack)