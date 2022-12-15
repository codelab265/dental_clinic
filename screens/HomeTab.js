import { StyleSheet, Text, View, Image } from 'react-native'
import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { FontAwesome5 } from '@expo/vector-icons'
import Home from './tabs/Home'
import Invoice from './tabs/Invoices'
import Transactions from './tabs/Transactions'
import Schedules from './tabs/Schedules'
import Appointments from './tabs/Appointments'

const Tab = createBottomTabNavigator()

export default function HomeTab() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: styles.tabBar,
        tabBarShowLabel: false,
        headerTitleAlign: 'center',
      }}
      
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.tabIconContainer}>
              <FontAwesome5
                name="home"
                size={20}
                style={{ color: focused ? '#6360DC' : '#000' }}
              ></FontAwesome5>
              <Text
                style={{ color: focused ? '#6360DC' : '#000', marginTop: 5 }}
              >
                Home
              </Text>
            </View>
          ),
          headerShown:false
        }}
      />
      
      <Tab.Screen
        name="Schedules"
        component={Schedules}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.tabIconContainer}>
              <FontAwesome5
                name="calendar-check"
                size={20}
                style={{ color: focused ? '#6360DC' : '#000' }}
              ></FontAwesome5>
              <Text
                style={{ color: focused ? '#6360DC' : '#000', marginTop: 5 }}
              >
                Schedules
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Appointments"
        component={Appointments} 
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.tabIconContainer}>
              <FontAwesome5
                name="clipboard"
                size={20}
                style={{ color: focused ? '#6360DC' : '#000' }}
              ></FontAwesome5>
              <Text
                style={{ color: focused ? '#6360DC' : '#000', marginTop: 5 }}
              >
                Appointments
              </Text>
            </View>
          ),
        }}
      />
      
    </Tab.Navigator>
  )
}

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    height: 70,
    backgroundColor: '#fff',
  },

  tabIconContainer: {
    position: 'absolute',
    top: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabLabel: {},
})
