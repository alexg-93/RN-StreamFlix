import { Tabs } from 'expo-router';
import React from 'react';
import Feather from '@expo/vector-icons/Feather';


export default function TabLayout() {


  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        tabBarStyle: {
          backgroundColor: '#121212',
        },
        tabBarActiveTintColor: '#32A873'
       
      }}
      >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon:({focused}:any)=><Feather name="home" size={24} color={focused ? "#32A873" : "#BBBBBB"} />
        }}

      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
          tabBarIcon:({focused}:any)=><Feather name="search" size={24} color={focused ? "#32A873" : "#BBBBBB"} />,
          headerStyle:{
            backgroundColor: '#121212'
          },
          headerTintColor: 'white',
          headerTitleAlign: 'center',
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: 'Favorites',
          tabBarIcon:({focused}:any)=><Feather name="heart" size={24} color={focused ? "#32A873" : "#BBBBBB"} />,
          headerTitleAlign: 'center',
          headerStyle:{
            backgroundColor: '#121212',
          },
          headerTintColor: 'white',
        }}
      />
      
    </Tabs>
  );
}
