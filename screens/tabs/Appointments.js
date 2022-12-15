import { Alert, StyleSheet, TouchableOpacity,  } from "react-native";
import React, { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Card, Colors, Text, View } from "react-native-ui-lib";
import { FontAwesome5 } from "@expo/vector-icons";

export default function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [spinner, setSpinner] = useState(false);

  const isFocused = useIsFocused();

  useEffect(() => {
    getAppointment();
  }, [isFocused]);

  const getAppointment = async () => {
    const id = await AsyncStorage.getItem("user_id");
    const patientID = JSON.parse(id);

    axios
      .get(`${BASE_API}appointment?id=${patientID}`)
      .then((response) => {
        setAppointments(response.data);
      })
      .catch(function (error) {
        Alert.alert("ERROR", "There was a problem");
        console.log(error);
      });
  };

  const deleteAppointment = (appointmentID) => {
    setSpinner(true);
    axios
      .post(`${BASE_API}appointment/delete`, {
        id: appointmentID,
      })
      .then((response) => {
        getAppointment();
        setSpinner(false);
      })
      .catch(function (error) {
        setSpinner(false);
        Alert.alert("ERROR", "There was a problem");
        console.log(error);
      });
  };

  const viewAppointment = (id, title, desc, date, status) => {
    navigation.navigate("ViewAppointment", {
      id: id,
      title: title,
      desc: desc,
      date: date,
      status: status,
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
    const statuses = {
      0: "Pending",
      1: "Accepted",
      2: "Rejected",
    };

    return statuses[status]
  };

  return (
    <View style={styles.container}>
      <Text style={{ fontWeight: "700", fontSize: 16, color: "#6360DC" }}>
        Appointments
      </Text>
      <View style={{ marginTop: 20 }}>
        {appointments.length > 0 ? (
          appointments.map((item, index) => {
            return (
              <Card backgroundColor={"white"} padding-10 key={index} row>
                <View style={styles.timeContainer}>
                  <FontAwesome5
                    name="calendar"
                    color="#6360DC"
                    size={20}
                  ></FontAwesome5>
                </View>
                <View style={{ flex:1, justifyContent:"space-between", paddingLeft:5 }} row>
                  <View>
                    <Text text70 color={Colors.blue10}>{item.service.name}</Text>
                    <Text color={Colors.green10}>{getStatus(item.status)}</Text>
                  </View>
                  <View>
                    <Text>
                      <FontAwesome5 name={'calendar'} color="#6360DC"></FontAwesome5>
                      {"  "}
                      {getDay(item.dentist_schedule.dayOfWeek)}
                    </Text>
                    <Text>
                      <FontAwesome5 name={'clock'} color="#6360DC"></FontAwesome5>
                      {"  "}
                      {`${item.dentist_schedule.startTime} - ${item.dentist_schedule.endTime}`}
                    </Text>

                    <TouchableOpacity onPress={()=>deleteAppointment(item.id)}>
                      <View backgroundColor={Colors.red10} style={styles.deleteButton}>
                        <Text color={Colors.white}>Delete</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              </Card>
            );
          })
        ) : (
          <Card backgroundColor={"white"} padding-20 style={{ justifyContent:'center', alignItems:'center' }}>
            <Text>No appointments created yet!</Text>
          </Card>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  timeContainer: {
    width: 50,
    height: 50,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ddd",
  },

  deleteButton:{
   
    marginTop:10,
    borderRadius:5,
    padding:5,
    justifyContent:'center',
    alignItems:'center'

  }
});
