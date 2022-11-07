import { StyleSheet, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { View, Text, Colors } from 'react-native-ui-lib'
import axios from 'axios'
import Spinner from 'react-native-loading-spinner-overlay/lib'

export default function ViewInvoice({ route }) {
  const [invoice, setInvoice] = useState([])
  const [spinner, setSpinner] = useState(false)

  useEffect(() => {
    getDetail()
  }, [])

  const getSum = (array) => {
    var sum = 0
    array.forEach((element) => {
      return (sum += element.amount)
    })

    return sum.toLocaleString('en-US')
  }

  const getDetail = () => {
    var id = route.params.id
    setSpinner(true)
    axios
      .get(`${BASE_API}invoice/details?id=${id}`)
      .then((response) => {
        setSpinner(false)
        setInvoice(response.data)
      })
      .catch((error) => {
        setSpinner(false)
        console.log(error)
      })
  }
  return (
    <View style={styles.container} backgroundColor={Colors.white}>
      <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
        <View style={{ flexDirection: 'column' }}>
          <Text>Dental Clinic</Text>
          <Text>P.O Box 136</Text>
          <Text>Java, Philippines</Text>
        </View>
        <View>
          <Image
            source={require('../assets/logo-2.png')}
            style={{ width: 80, height: 80 }}
          ></Image>
        </View>
      </View>
      <View
        backgroundColor={Colors.blue10}
        row
        style={{ justifyContent: 'space-between' }}
        padding-10
        marginT-30
      >
        <View>
          <Text color={Colors.blue80}>SERVICE</Text>
        </View>
        <View>
          <Text color={Colors.blue80}>AMOUNT</Text>
        </View>
      </View>
      {invoice.map((item, index) => {
        return (
          <View
            row
            style={{
              justifyContent: 'space-between',
              borderBottomWidth: 1,
              borderBottomColor: Colors.blue20,
            }}
            padding-10
            marginT-5
            key={index}
          >
            <View>
              <Text>{item.service.name}</Text>
            </View>
            <View>
              <Text color={Colors.yellow20}>₱ {item.amount}</Text>
            </View>
          </View>
        )
      })}
      <View
        backgroundColor={Colors.blue80}
        row
        style={{ justifyContent: 'flex-end' }}
        padding-5
      >
        <View
          paddingR-5
          style={{ borderRightWidth: 1, borderRightColor: Colors.blue20 }}
        >
          <Text>TOTAL</Text>
        </View>
        <View paddingL-5>
          <Text>₱ {getSum(invoice)}</Text>
        </View>
      </View>

      <Spinner visible={spinner} textContent={'Please Wait...'} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    margin: 20,
    borderRadius: 10,
  },
})
