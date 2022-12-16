import { ScrollView, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { Card, Colors, Text, View } from "react-native-ui-lib";
import moment from "moment";
import { FontAwesome5 } from "@expo/vector-icons";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Schedules() {
  const [schedules, setSchedule] = useState([]);

  useEffect(() => {
    getSchedules();
  }, []);

  const getSchedules = async () => {
    const id = await AsyncStorage.getItem("user_id");
    const patientID = JSON.parse(id);

    axios
      .get(`${BASE_API}schedules?id=${patientID}`)
      .then((response) => {
        setSchedule(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getDay = (day) => {
    const days = {
      1: "Monday",
      2: "Tuesday",
      3: "Wednesday",
      4: "Thursday",
      5: "Friday",
      6: "Saturday",
      7: "Sunday",
    };

    return days[day];
  };

  const getStatus = (status) => {
    if (status == 1) {
      return "accepted";
    } else {
      return "Rejected";
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
      <Text style={{ fontWeight: "700", fontSize: 16, color: "#6360DC", marginBottom:20 }}>
        Schedules
      </Text>
      {schedules != "" ? (
        schedules.map((item, index) => {
          return (
            <Card key={index} backgroundColor={Colors.white} row padding-10>
              <View style={styles.timeContainer}>
                <FontAwesome5
                  name="calendar"
                  color="#6360DC"
                  size={20}
                ></FontAwesome5>
              </View>
              <View row style={{ flex:1, justifyContent:'space-between', paddingLeft:5 }}>
                <View>
                  <Text text70 blue10>
                    {item.dentist_schedule.dentist.name}
                  </Text>
                  <Text text90 color={Colors.grey40}>
                    Appointment {getStatus(item.status)}
                  </Text>
                </View>
                <View>
                  <Text text90 color={Colors.blue10}>
                    <FontAwesome5 name="calendar"></FontAwesome5>
                    <Text style={{ marginLeft: 10 }}>
                      {"  "}
                      {getDay(item.dentist_schedule.dayOfWeek)}
                    </Text>
                  </Text>
                  <Text text90 color={Colors.blue10}>
                    <FontAwesome5 name="clock"></FontAwesome5>
                    <Text style={{ marginLeft: 5 }}>
                      {" "}
                      {`${item.dentist_schedule.startTime}-${item.dentist_schedule.endTime}`}
                    </Text>
                  </Text>
                </View>
              </View>
            </Card>
          );
        })
      ) : (
        <View
          backgroundColor={Colors.yellow70}
          padding-20
          style={{ alignItems: "center" }}
        >
          <Text style={{ fontSize: 20 }} color={Colors.yellow1}>
            No service available
          </Text>
        </View>
      )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },

  timeContainer: {
    width: 50,
    height: 50,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ddd",
  },
});
