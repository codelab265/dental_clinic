import { StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors, Text, View } from 'react-native-ui-lib'
import moment from 'moment'
import { FontAwesome5 } from '@expo/vector-icons'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function Transactions() {
  const [trans, setTransactions] = useState([])

  useEffect(() => {
    getTransactions()
  }, [])

  const getSum = (array) => {
    var sum = 0
    array.forEach((element) => {
      return (sum += parseFloat(element.amount))
    })

    return sum.toFixed(2)
  }

  const getTransactions = async () => {
    const id = await AsyncStorage.getItem('user_id')
    const patientID = JSON.parse(id)

    axios
      .get(`${BASE_API}transactions?id=${patientID}`)
      .then((response) => {
        console.log(response.data)
        setTransactions(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <View style={styles.container}>
      {trans != '' ? (
        trans.map((item, index) => {
          return (
            <View
              style={styles.card}
              key={index}
              backgroundColor={Colors.blue70}
            >
              <View>
                <Text text70>{item.invoice.invoice_number}</Text>
                <Text text90 color={Colors.grey30}>
                  {item.medical_record.service.name}
                </Text>
              </View>
              <View>
                <Text text90 color={Colors.yellow10}>
                  Total:
                  <Text> ₱{getSum(item.invoice.invoice_detail)}</Text>
                </Text>
                <Text text90 color={Colors.yellow10}>
                  Paid:
                  <Text style={{ marginLeft: 5 }}>₱{item.amount}</Text>
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
    marginBottom: 10,
  },
})
