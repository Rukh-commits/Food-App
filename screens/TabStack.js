import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import 'react-native-gesture-handler';

import Home2 from './home';
import RecipeBook from './recipe';
import SearchBlog from './SearchBlog'

import Icon from "react-native-vector-icons/Ionicons" 
import Icon2 from "react-native-vector-icons/Entypo" 

const Tab = createBottomTabNavigator();


const TabStack=()=>{

  return(
  <Tab.Navigator screenOptions={({ route }) => ({
    headerShown: false,
    tabBarIcon: ({ focused, color, size }) => {
      let iconName;

      if (route.name === 'Home2') {
        iconName = focused? 'home': 'home-outline';
      } 
      else if (route.name === 'RecipeBook') {
        iconName = focused ? 'fast-food' : 'fast-food-outline';
      }
      else if(route.name === 'SearchBlog'){
        iconName = focused ? 'ios-newspaper' : 'ios-newspaper-outline';
      }

   

      // You can return any component that you like here!
      return <Icon name={iconName} size={size} color={color} style={{margin: 2}}/>;
    },
      tabBarActiveTintColor: "black",
      tabBarInactiveTintColor: "gray",
      
     
      tabBarStyle: {
        height: 50,
      },
    })}>
    <Tab.Screen name="Home2" component={Home2}/>
    <Tab.Screen name="RecipeBook" component={RecipeBook}/>
    <Tab.Screen name="SearchBlog" component={SearchBlog}  />
    
  </Tab.Navigator>
  )
}
export default TabStack