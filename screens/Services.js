import { StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ListItem, Colors, Card, Text, View } from 'react-native-ui-lib'
import axios from 'axios'
import Spinner from 'react-native-loading-spinner-overlay/lib'

export default function Services() {
  const [services, setServices] = useState([])

  useEffect(() => {
    getService()
  }, [])

  const getService = () => {
    axios
      .get(`${BASE_API}services`)
      .then((response) => {
        setServices(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <View style={styles.container}>
      {services != '' ? (
        services.map((item, index) => {
          return (
            <Card
              backgroundColor={Colors.white}
              style={{ marginBottom: 15 }}
              padding-10
              key={index}
            >
              <View>
                <Text style={{ fontSize: 20 }}>{item.name}</Text>
                <View row>
                  <Text text90 color={Colors.red20}>
                    Price: {item.price}
                  </Text>
                </View>
              </View>
            </Card>
          )
        })
      ) : (
        <Card
          backgroundColor={Colors.yellow50}
          style={{
            marginBottom: 15,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          padding-20
        >
          <View>
            <Text style={{ fontSize: 20 }} color={Colors.yellow1}>
              No service available
            </Text>
          </View>
        </Card>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
})
