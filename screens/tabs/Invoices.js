import { StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors, Text, View } from 'react-native-ui-lib'
import moment from 'moment'
import { FontAwesome5 } from '@expo/vector-icons'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { TouchableOpacity } from 'react-native-gesture-handler'

export default function Invoices({ navigation }) {
  const [invoices, setInvoices] = useState([])

  useEffect(() => {
    getInvoices()
  }, [])

  const getSum = (array) => {
    var sum = 0
    array.forEach((element) => {
      return (sum += element.amount)
    })

    return sum.toLocaleString('en-US')
  }

  const getInvoices = async () => {
    const id = await AsyncStorage.getItem('user_id')
    const patientID = JSON.parse(id)

    axios
      .get(`${BASE_API}invoices?id=${patientID}`)
      .then((response) => {
        console.log(response.data)
        setInvoices(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <View style={styles.container}>
      {invoices != '' ? (
        invoices.map((item, index) => {
          return (
            <TouchableOpacity
              key={index}
              onPress={() =>
                navigation.navigate('ViewInvoice', {
                  id: item.id,
                })
              }
            >
              <View style={styles.card} backgroundColor={Colors.blue70}>
                <View>
                  <Text text70>{item.invoice_number}</Text>
                  <Text text90 color={Colors.grey30}>
                    <FontAwesome5 name="calendar-check"></FontAwesome5>
                    <Text> {item.due_date}</Text>
                  </Text>
                </View>
                <View>
                  <Text text90 color={Colors.yellow10}>
                    Total:
                    <Text> ₱{getSum(item.invoice_detail)}</Text>
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
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
    marginBottom: 10,
  },
})
