import { Alert, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import Spinner from 'react-native-loading-spinner-overlay'
import axios from 'axios'

import {
  Colors,
  TextField,
  Button,
  Icon,
  Text,
  View,
  Picker,
  Toast,
} from 'react-native-ui-lib'
import { FontAwesome5 } from '@expo/vector-icons'
import { ScrollView } from 'react-native-gesture-handler'

export default function Register({ navigation }) {
  const [fullname, setFullname] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [gender, setGender] = useState('male')
  const [city, setCity] = useState('')
  const [province, setProvince] = useState('')
  const [address, setAddress] = useState('')
  const [password, setPassword] = useState('')
  const [spinner, setSpinner] = useState(false)
  const [toast, setToast] = useState(false)

  const registerUser = () => {
    if (
      fullname == '' ||
      email == '' ||
      phone == '' ||
      gender == '' ||
      city == '' ||
      province == '' ||
      address == '' ||
      password == ''
    ) {
      Alert.alert('WARNING', 'Fill all the required fields')
    } else {
      setSpinner(true)
      axios
        .post(`${BASE_API}register`, {
          name: fullname,
          email: email,
          contact_number: phone,
          gender: gender,
          city: city,
          province: province,
          address: address,
          password: password,
        })
        .then(function (response) {
          setSpinner(false)
          Alert.alert('SUCCESS', 'Account has successfully been created')
          navigation.reset({
            routes: [{ name: 'Login' }],
          })
        })
        .catch(function (error) {
          setSpinner(false)
          Alert.alert('ERROR', 'There was a problem creating your account')
          console.log(error)
        })
    }
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <View>
          <Text
            style={{
              fontSize: 20,
              textTransform: 'uppercase',
              fontWeight: '900',
            }}
            color={Colors.blue1}
          >
            Register with Us
          </Text>
          <Text
            style={{
              color: '#666',
              marginBottom: 20,
            }}
          >
            Sign up
          </Text>
        </View>
        <TextField
          value={fullname}
          onChangeText={(e) => setFullname(e)}
          enableErrors
          validateOnChange
          validate={['required']}
          validationMessage={['Field is required']}
          placeholder={'Full name'}
          showCharCounter
          migrate
          label="Name"
          style={styles.textfield}
        />
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
          value={phone}
          onChangeText={(e) => setPhone(e)}
          enableErrors
          validateOnChange
          validate={['required', (value) => value.length > 9]}
          validationMessage={['Field is required', 'Number is too short']}
          placeholder={'Contact number'}
          showCharCounter
          migrate
          label="Phone"
          style={styles.textfield}
          keyboardType="phone-pad"
        />
        <Picker
          placeholder={'Gender'}
          value={gender}
          style={styles.textfield}
          onChange={(t) => setGender(t)}
          migrate
          migrateTextField
          getItemLabel={gender}
          label={'Gender'}
        >
          <Picker.Item key={1} value={'Male'} label={'Male'} />
          <Picker.Item key={2} value={'Female'} label={'Female'} />
        </Picker>
        <TextField
          value={city}
          onChangeText={(e) => setCity(e)}
          enableErrors
          validateOnChange
          validate={['required']}
          validationMessage={['Field is required']}
          placeholder={'City'}
          showCharCounter
          migrate
          label="City"
          style={styles.textfield}
        />
        <TextField
          value={province}
          onChangeText={(e) => setProvince(e)}
          enableErrors
          validateOnChange
          validate={['required']}
          validationMessage={['Field is required']}
          placeholder={'Province'}
          showCharCounter
          migrate
          label="Province"
          style={styles.textfield}
        />
        <TextField
          value={address}
          onChangeText={(e) => setAddress(e)}
          enableErrors
          validateOnChange
          validate={['required']}
          validationMessage={['Field is required']}
          placeholder={'Address'}
          showCharCounter
          migrate
          label="Address"
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
          label={'Register'}
          backgroundColor={Colors.yellow10}
          onPress={() => registerUser()}
        ></Button>
        <Spinner visible={spinner} textContent={'Please Wait...'} />
        <Toast
          visible={toast}
          position={'top'}
          autoDismiss={3000}
          backgroundColor={Colors.green10}
          centerMessage
          message={'Account has been created successfully'}
        ></Toast>
      </View>
    </ScrollView>
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
})
