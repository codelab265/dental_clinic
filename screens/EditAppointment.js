import { Alert, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { Colors, Text, View, TextField, Button } from 'react-native-ui-lib'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'

import Spinner from 'react-native-loading-spinner-overlay'

export default function EditAppointment({ route, navigation }) {
  const [description, setDescription] = useState(route.params.desc)
  const [title, setTitle] = useState(route.params.title)
  const [spinner, setSpinner] = useState(false)

  const editAppointment = () => {
    if (description != '' && title != '') {
      setSpinner(true)

      axios
        .post(`${BASE_API}appointment/edit`, {
          id: route.params.id,
          title: title,
          description: description,
        })
        .then((response) => {
          setSpinner(false)
          Alert.alert('SUCCESS', 'Updated Successfully')
          navigation.goBack()
        })
        .catch(function (error) {
          setSpinner(false)
          Alert.alert('ERROR', 'There was a problem')
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
          Edit Appointment
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
        onPress={editAppointment}
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
