import { Alert, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { Colors, Text, View, TextField, Button } from 'react-native-ui-lib'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'

import Spinner from 'react-native-loading-spinner-overlay'

export default function CreateAppointment() {
  const [description, setDescription] = useState('')
  const [title, setTitle] = useState('')
  const [spinner, setSpinner] = useState(false)

  const createAppointment = async () => {
    if (description != '' && title != '') {
      const userID = await AsyncStorage.getItem('user_id')
      const patientID = JSON.parse(userID)
      setSpinner(true)

      axios
        .post(`${BASE_API}appointment/create`, {
          patient_id: patientID,
          title: title,
          description: description,
        })
        .then((response) => {
          setSpinner(false)
          Alert.alert('SUCCESS', 'Created Successfully')
          setDescription('')
          setTitle('')
        })
        .catch(function (error) {
          setSpinner(false)
          Alert.alert('ERROR', 'There was a problem Logging in')
          console.log(error)
        })
    } else {
      Alert.alert('ERROr', 'Fill all required fields')
    }
  }

  return (
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
          Create Appointment
        </Text>
        <Text
          style={{
            color: '#666',
            marginBottom: 20,
          }}
        >
          Book an appointment with us
        </Text>
      </View>
      <TextField
        value={title}
        onChangeText={(e) => setTitle(e)}
        migrate
        label="Title"
        style={styles.textfield}
      />
      <TextField
        value={description}
        onChangeText={(e) => setDescription(e)}
        showCharCounter
        migrate
        label="Description"
        style={styles.textfield2}
        multiline
        numberOfLines={4}
      />

      <Button
        label={'Submit'}
        fullWidth
        onPress={createAppointment}
        style={{ marginTop: 10 }}
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
    marginBottom: 5,
  },
  textfield2: {
    borderWidth: 2,
    borderColor: '#ddd',
    paddingHorizontal: 10,
    height: 90,
    borderRadius: 5,
  },
})
