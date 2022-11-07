import { Dimensions, StyleSheet, Alert } from 'react-native'
import React, { useState } from 'react'
import {
  Text,
  View,
  Card,
  CardProps,
  Button,
  Colors,
  TouchableOpacity,
} from 'react-native-ui-lib'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import moment from 'moment'

import Spinner from 'react-native-loading-spinner-overlay'
import { FontAwesome5 } from '@expo/vector-icons'

const Width = Dimensions.get('screen').width

export default function ViewAppointment({ route, navigation }) {
  const [spinner, setSpinner] = useState(false)

  const editAppointment = () => {
    navigation.navigate('EditAppointment', {
      id: route.params.id,
      title: route.params.title,
      desc: route.params.desc,
    })
  }

  const deleteAppointment = (appointmentID) => {
    setSpinner(true)
    axios
      .post(`${BASE_API}appointment/delete`, {
        id: appointmentID,
      })
      .then((response) => {
        Alert.alert('Success', 'Deleted successfully')
        navigation.goBack()
        setSpinner(false)
      })
      .catch(function (error) {
        setSpinner(false)
        Alert.alert('ERROR', 'There was a problem')
        console.log(error)
      })
  }

  return (
    <View style={styles.container}>
      <Card backgroundColor={Colors.white} style={{ marginBottom: 15 }}>
        <View padding-20>
          <Text text60 $textDefault>
            {route.params.title}
          </Text>
          <View row>
            <Text text90>
              {route.params.status === 0 ? (
                <Text color={Colors.yellow10}>Pending</Text>
              ) : route.params.status === 1 ? (
                <Text color={Colors.green10}>Accepted</Text>
              ) : (
                <Text color={Colors.red10}>Rejected</Text>
              )}
            </Text>
            <Text
              text90
              $textDefault
              style={{ marginLeft: 20 }}
              color={Colors.blue10}
            >
              <FontAwesome5 name="calendar"></FontAwesome5>
              {moment(new Date(route.params.date)).format('DD-MM-YYYY')}
            </Text>
          </View>

          <Text text80 $textDefault style={{ marginTop: 10 }}>
            {route.params.desc}
          </Text>
        </View>
      </Card>
      <Spinner visible={spinner} textContent={'Please Wait...'} />
      <View style={styles.action}>
        <View>
          <Button
            label={'edit'}
            fullWidth
            backgroundColor={Colors.yellow10}
            onPress={() => editAppointment()}
          ></Button>
        </View>
        <View>
          <Button
            label={'Delete'}
            fullWidth
            backgroundColor={Colors.red10}
            onPress={() => deleteAppointment(route.params.id)}
          ></Button>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },

  action: {
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 5,
    flexDirection: 'row',
    width: Width,
  },
})
