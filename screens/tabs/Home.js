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
import Item from "../../components/Item";
import { color } from "react-native-reanimated";

const width = Dimensions.get("screen").width;

export default function Home({ navigation }) {
  const [username, setUserName] = useState("User");

  useEffect(() => {
    getUser()
  }, [
  ]);

  const getUser = async () => {
    const user = await AsyncStorage.getItem("username");
    setUserName(JSON.parse(user));
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
      <View
        style={{
          paddingHorizontal: 15,
          paddingTop: 20,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View>
          <Text style={styles.greetings}>Welcome {username} </Text>
          <Text style={styles.welcome}>What can we do for you?</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <View style={styles.profile}>
            <FontAwesome5 name={"user"} color="white"></FontAwesome5>
          </View>
          <TouchableOpacity onPress={Logout}>
            <View style={styles.logout}>
              <FontAwesome5 name={"power-off"} color="white"></FontAwesome5>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.header}>
        <Item
          name={"Create"}
          icon={"plus-circle"}
          onPress={() => navigation.navigate("CreateAppointment")}
        />

        <Item
          name={"Service"}
          icon={"list"}
          onPress={() => navigation.navigate("Services")}
        />

        <Item
          name={"Dentists"}
          icon={"users"}
          onPress={() => navigation.navigate("Dentists")}
        />

        <Item name={"Invoice"} icon={"file-invoice"} onPress={() => navigation.navigate("Invoice")} />

        <Item
          name={"Transactions"}
          icon={"money-check"}
          onPress={() => navigation.navigate("Transactions")}
        />

        <Item name={"ORs"} icon={"receipt"} onPress={()=>navigation.navigate("OfficialReceipt")} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },

  header: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    padding: 5,
    marginTop: 30,
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

  profile: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    backgroundColor: "gray",
    marginRight: 5,
  },

  logout: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    backgroundColor: "#CE3226",
  },

  greetings: {
    fontWeight: "700",
    fontSize: 16,
    color: "#6360DC",
    textTransform:'capitalize'
  },

  welcome: {
    fontWeight: "700",
    fontSize: 12,
    color: "#999",
  },
});
