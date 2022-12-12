import { Dimensions, SafeAreaView, StyleSheet, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { FontAwesome5 } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import moment from "moment";
import { useIsFocused } from "@react-navigation/native";
import Spinner from "react-native-loading-spinner-overlay";
import {
  Text,
  View,
  Card,
  CardProps,
  Button,
  Colors,
  TouchableOpacity,
} from "react-native-ui-lib";

const width = Dimensions.get("screen").width;

export default function Home({ navigation }) {
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

  const editAppointment = (id, title, desc) => {
    navigation.navigate("EditAppointment", {
      id: id,
      title: title,
      desc: desc,
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

  const Logout = () => {
    AsyncStorage.removeItem("login");
    navigation.reset({
      routes: [{ name: "Login" }],
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity onPress={() => navigation.navigate("Services")}>
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

          <TouchableOpacity onPress={() => navigation.navigate("Dentists")}>
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
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            onPress={() => navigation.navigate("CreateAppointment")}
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
            {appointments != "" ? (
              appointments.map((item, index) => {
                return (
                  <Card
                    backgroundColor={Colors.blue80}
                    style={{ marginBottom: 15 }}
                    key={index}
                  >
                    <View padding-20>
                      <View row style={{ justifyContent: "space-between" }}>
                        <View>
                          <Text text90>{item.service.name}</Text>
                          <Text text70 $textDefault>
                            Appointment {getStatus(item.status)}
                          </Text>
                        </View>

                        <View>
                          <Text>
                            <FontAwesome5 name={"calendar"}></FontAwesome5>
                            {"  "}
                            {getDay(item.dentist_schedule.dayOfWeek)}
                          </Text>
                          <Text>
                            <FontAwesome5 name={"clock"}></FontAwesome5>
                            {"  "}
                            {`${item.dentist_schedule.startTime} - ${item.dentist_schedule.endTime}`}
                          </Text>
                        </View>
                      </View>

                      <View>
                        <View row right style={{ padding:5 }}>
                          <Button
                            text90
                            link
                            
                            label="Delete"
                            onPress={() => {
                              deleteAppointment(item.id);
                            }}
                          />
                        </View>
                      </View>
                    </View>
                  </Card>
                );
              })
            ) : (
              <View
                backgroundColor={Colors.yellow20}
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  padding: 20,
                  borderRadius: 5,
                }}
              >
                <Text color={Colors.white}>
                  You haven`t created any appointment
                </Text>
              </View>
            )}
            <Spinner visible={spinner} textContent={"Please Wait..."} />
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  header: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },

  footer: {
    flex: 2,
    backgroundColor: "#6360DC",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },

  card: {
    flexDirection: "column",
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    padding: 20,
    margin: 10,
    width: width / 3 - 20,
    backgroundColor: "#6360DC",
  },

  recent: {
    borderBottomWidth: 2,
    borderBottomColor: "#fff",
    marginBottom: 10,
  },
});
