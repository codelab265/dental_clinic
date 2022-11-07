import { StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ListItem, Colors, Card, Text, View } from 'react-native-ui-lib'
import axios from 'axios'
import Spinner from 'react-native-loading-spinner-overlay/lib'
import { FontAwesome5 } from '@expo/vector-icons'

export default function Dentists() {
  const [dentists, setDentists] = useState([])

  useEffect(() => {
    getDentist()
  }, [])

  const getDentist = () => {
    axios
      .get(`${BASE_API}dentists`)
      .then((response) => {
        setDentists(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <View style={styles.container}>
      {dentists != '' ? (
        dentists.map((item, index) => {
          return (
            <Card
              backgroundColor={Colors.white}
              style={{ marginBottom: 15, flexDirection: 'row' }}
              padding-10
              key={index}
            >
              <View
                style={styles.avatarContainer}
                backgroundColor={Colors.purple60}
              >
                <FontAwesome5
                  name="user"
                  size={20}
                  color={Colors.purple20}
                ></FontAwesome5>
              </View>
              <View paddingL-10>
                <Text style={{ fontSize: 20 }}>{item.name}</Text>
                <View row>
                  <Text text90 color={Colors.purple20}>
                    Specialization: {item.specialization}
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

  avatarContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 70,
    height: 70,
    borderRadius: 10,
  },
})
