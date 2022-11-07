import { StyleSheet, ActivityIndicator, Dimensions, Image } from 'react-native'
import React, { useEffect } from 'react'
import { Colors, View, Text, TextField, Button } from 'react-native-ui-lib'
import AsyncStorage from '@react-native-async-storage/async-storage'

const width = Dimensions.get('screen').width

export default function Welcome({ navigation }) {
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('login')
      if (value !== null) {
        navigation.reset({
          routes: [{ name: 'HomeTab' }],
        })
      } else {
        navigation.reset({
          routes: [{ name: 'Login' }],
        })
      }
    } catch (e) {
      // error reading value
    }
  }

  useEffect(() => {
    getData()
  })
  return (
    <View style={Styles.body}>
      <View style={Styles.logoContainer}>
        <Image
          source={require('../assets/logo-2.png')}
          style={{ width: 50, height: 50 }}
        ></Image>
      </View>
      <Text style={Styles.welcome}>Dental Clinic</Text>
      <ActivityIndicator
        visible={false}
        size={40}
        color="white"
        style={Styles.indicator}
      ></ActivityIndicator>
    </View>
  )
}

const Styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'indigo',
  },

  logoContainer: {
    borderWidth: 2,
    borderRadius: 100,
    borderColor: 'white',
    backgroundColor: 'white',
    color: 'white',
    padding: 20,
    fontSize: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },

  logoText: {
    color: 'white',
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },

  welcome: {
    color: 'white',
    marginTop: 20,
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },

  indicator: {
    marginTop: 20,
  },
})
