import { StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors, Text, View } from 'react-native-ui-lib'
import moment from 'moment'
import { FontAwesome5 } from '@expo/vector-icons'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function Schedules() {
  const [schedules, setSchedule] = useState([])

  useEffect(() => {
    getSchedules()
  }, [])

  const getSchedules = async () => {
    const id = await AsyncStorage.getItem('user_id')
    const patientID = JSON.parse(id)

    axios
      .get(`${BASE_API}schedules?id=${patientID}`)
      .then((response) => {
        setSchedule(response.data)
        console.log(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <View style={styles.container}>
      {schedules != '' ? (
        schedules.map((item, index) => {
          return (
            <View
              style={styles.card}
              key={index}
              backgroundColor={Colors.blue80}
            >
              <View>
                <Text text70>{item.dentist.name}</Text>
                <Text text90 color={Colors.grey40}>
                  {item.title}
                </Text>
              </View>
              <View>
                <Text text90 color={Colors.purple10}>
                  <FontAwesome5
                    name="calendar"
                    style={{ marginRight: 10 }}
                  ></FontAwesome5>
                  <Text>
                    {' '}
                    {moment(new Date(item.schedule_date)).format('DD-MM-YYYY')}
                  </Text>
                </Text>
                <Text text90 color={Colors.purple10}>
                  <FontAwesome5 name="clock"></FontAwesome5>
                  <Text style={{ marginLeft: 5 }}> {item.schedule_time}</Text>
                </Text>
              </View>
            </View>
          )
        })
      ) : (
        <View
          backgroundColor={Colors.yellow70}
          padding-20
          style={{ alignItems: 'center' }}
        >
          <Text style={{ fontSize: 20 }} color={Colors.yellow1}>
            No service available
          </Text>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },

  card: {
    padding: 20,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
})
