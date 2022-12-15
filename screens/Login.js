import { Alert, SafeAreaView, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import {
  Colors,
  TextField,
  Button,
  Icon,
  Text,
  View,
} from 'react-native-ui-lib'
import { FontAwesome5 } from '@expo/vector-icons'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Spinner from 'react-native-loading-spinner-overlay'
import { set } from 'react-native-reanimated'

export default function Login({ navigation }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [spinner, setSpinner] = useState(false)

  const loginUser = () => {
    if (email != '' && password != '') {
      setSpinner(true)
      axios
        .post(`${BASE_API}login`, {
          email: email,
          password: password,
        })
        .then(async (response) => {
          setSpinner(false)
          if (response.data.status == true) {
            try {
              await AsyncStorage.setItem('login', 'true')
              const user_id = JSON.stringify(response.data.data.id)
              const username = JSON.stringify(response.data.data.name)
              await AsyncStorage.setItem('user_id', user_id)
              await AsyncStorage.setItem('username', username)
            } catch (e) {
              // saving error
            }
            navigation.reset({
              routes: [{ name: 'HomeTab' }],
            })
          } else {
            Alert.alert('ERROR', 'Invalid email or password')
          }
        })
        .catch(function (error) {
          setSpinner(false)
          Alert.alert('ERROR', 'There was a problem Logging in')
          console.log(error)
        })
    } else {
      Alert.alert('WARNING', 'Fill all the required fields')
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <View style={styles.logoBody}>
          <Icon source={require('../assets/logo-1.png')} size={70}></Icon>
        </View>
      </View>
      <View>
        <Text
          style={{
            fontSize: 20,
            textTransform: 'uppercase',
            fontWeight: '900',
          }}
          color={Colors.blue1}
        >
          Get connected
        </Text>
        <Text
          style={{
            color: '#666',
            marginBottom: 20,
          }}
        >
          Sign in
        </Text>
      </View>
      <TextField
        value={email}
        onChangeText={(e) => setEmail(e)}
        enableErrors
        validateOnChange
        validate={['required', 'email', (value) => value.length > 6]}
        validationMessage={[
          'Field is required',
          'Email is invalid',
          'Password is too short',
        ]}
        placeholder={'Email'}
        showCharCounter
        migrate
        label="Email"
        style={styles.textfield}
      />
      <TextField
        value={password}
        onChangeText={(e) => setPassword(e)}
        enableErrors
        validateOnChange
        validate={['required', (value) => value.length > 6]}
        validationMessage={['Field is required', 'Password is too short']}
        placeholder={'Password'}
        showCharCounter
        migrate
        label="Password"
        style={styles.textfield}
        secureTextEntry={true}
      />
      <Button
        label={'Login'}
        style={{ marginTop: 20 }}
        onPress={() => loginUser()}
      ></Button>

      <Text style={styles.or}>OR</Text>
      <Button
        label={'Register'}
        style={{ marginTop: 20 }}
        outline
        outlineColor={Colors.yellow20}
        outlineWidth={2}
        onPress={() => {
          navigation.navigate('Register')
        }}
      ></Button>
      <Spinner visible={spinner} textContent={'Please Wait...'} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  textfield: {
    borderWidth: 2,
    borderColor: '#ddd',
    paddingHorizontal: 10,
    height: 40,
    borderRadius: 5,
  },

  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 80,
    marginTop: 80,
  },

  logoBody: {
    padding: 20,
    borderRadius: 100,
    backgroundColor: '#6360DC',
  },

  or: {
    alignSelf: 'center',
    marginTop: 15,
  },
})
