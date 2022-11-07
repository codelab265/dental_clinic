import { Dimensions, SafeAreaView, StyleSheet, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { FontAwesome5 } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import moment from 'moment'
import { useIsFocused } from '@react-navigation/native'
import Spinner from 'react-native-loading-spinner-overlay'
import {
  Text,
  View,
  Card,
  CardProps,
  Button,
  Colors,
  TouchableOpacity,
} from 'react-native-ui-lib'

const width = Dimensions.get('screen').width

export default function Home({ navigation }) {
  const [appointments, setAppointments] = useState([])
  const [spinner, setSpinner] = useState(false)

  const isFocused = useIsFocused()

  useEffect(() => {
    getAppointment()
  }, [isFocused])

  const getAppointment = async () => {
    const id = await AsyncStorage.getItem('user_id')
    const patientID = JSON.parse(id)

    axios
      .get(`${BASE_API}appointment?id=${patientID}`)
      .then((response) => {
        setAppointments(response.data)
      })
      .catch(function (error) {
        Alert.alert('ERROR', 'There was a problem')
        console.log(error)
      })
  }

  const deleteAppointment = (appointmentID) => {
    setSpinner(true)
    axios
      .post(`${BASE_API}appointment/delete`, {
        id: appointmentID,
      })
      .then((response) => {
        getAppointment()
        setSpinner(false)
      })
      .catch(function (error) {
        setSpinner(false)
        Alert.alert('ERROR', 'There was a problem')
        console.log(error)
      })
  }

  const viewAppointment = (id, title, desc, date, status) => {
    navigation.navigate('ViewAppointment', {
      id: id,
      title: title,
      desc: desc,
      date: date,
      status: status,
    })
  }

  const editAppointment = (id, title, desc) => {
    navigation.navigate('EditAppointment', {
      id: id,
      title: title,
      desc: desc,
    })
  }

  const Logout = () => {
    AsyncStorage.removeItem('login')
    navigation.reset({
      routes: [{ name: 'Login' }],
    })
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity onPress={() => navigation.navigate('Services')}>
            <View style={styles.card}>
              <FontAwesome5
                name="list"
                size={20}
                color={Colors.white}
              ></FontAwesome5>
              <Text style={{ marginTop: 5 }} color={Colors.white}>
                Services
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Dentists')}>
            <View style={styles.card}>
              <FontAwesome5
                name="users"
                size={20}
                color={Colors.white}
              ></FontAwesome5>
              <Text style={{ marginTop: 5 }} color={Colors.white}>
                Dentist
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('CreateAppointment')}
          >
            <View style={styles.card}>
              <FontAwesome5
                name="plus-circle"
                size={20}
                color={Colors.white}
              ></FontAwesome5>
              <Text style={{ marginTop: 5 }} color={Colors.white}>
                Create
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => Logout()}>
            <View style={styles.card}>
              <FontAwesome5
                name="power-off"
                size={20}
                color={Colors.white}
              ></FontAwesome5>
              <Text style={{ marginTop: 5 }} color={Colors.white}>
                Logout
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.footer}>
        <ScrollView>
          <View style={{ padding: 10 }}>
            <View style={styles.recent}>
              <Text text70 blue80 style={{ marginBottom: 5 }}>
                Recent Appointments
              </Text>
            </View>
            {appointments != '' ? (
              appointments.map((item, index) => {
                return (
                  <Card
                    backgroundColor={Colors.blue80}
                    style={{ marginBottom: 15 }}
                    onPress={() =>
                      viewAppointment(
                        item.id,
                        item.title,
                        item.description,
                        item.created_at,
                        item.status,
                      )
                    }
                    key={index}
                  >
                    <View padding-20>
                      <Text text60 $textDefault>
                        {item.title}
                      </Text>
                      <View row>
                        <Text text90>sdsdsd | </Text>
                        <Text text90 $textDefault>
                          {moment(new Date(item.created_at)).format(
                            'DD-MM-YYYY',
                          )}
                        </Text>
                      </View>

                      <Text text70 $textDefault>
                        {item.description.slice(0, 50)}
                      </Text>

                      <View>
                        <View row right>
                          <Button
                            style={{ marginRight: 10 }}
                            text90
                            link
                            label="Edit"
                            onPress={() =>
                              editAppointment(
                                item.id,
                                item.title,
                                item.description,
                              )
                            }
                          />
                          <Button
                            text90
                            link
                            label="Delete"
                            onPress={() => {
                              deleteAppointment(item.id)
                            }}
                          />
                        </View>
                      </View>
                    </View>
                  </Card>
                )
              })
            ) : (
              <View
                backgroundColor={Colors.yellow20}
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: 20,
                  borderRadius: 5,
                }}
              >
                <Text color={Colors.white}>
                  You haven`t created any appointment
                </Text>
              </View>
            )}
            <Spinner visible={spinner} textContent={'Please Wait...'} />
          </View>
        </ScrollView>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  header: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },

  footer: {
    flex: 2,
    backgroundColor: '#6360DC',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },

  card: {
    flexDirection: 'column',
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    padding: 20,
    margin: 10,
    width: width / 3 - 20,
    backgroundColor: '#6360DC',
  },

  recent: {
    borderBottomWidth: 2,
    borderBottomColor: '#fff',
    marginBottom: 10,
  },
})
