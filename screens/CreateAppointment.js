import { Alert, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import {
  Colors,
  Text,
  View,
  TextField,
  Button,
  Picker,
  RadioGroup,
  RadioButton,
} from "react-native-ui-lib";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

import Spinner from "react-native-loading-spinner-overlay";

export default function CreateAppointment() {
  const [description, setDescription] = useState("");
  const [serviceID, setServiceID] = useState("");
  const [spinner, setSpinner] = useState(false);
  const [services, setServices] = useState([]);
  const [dayOfWeek, setDayOfWeek] = useState("");
  const [schedule, setSchedule] = useState([]);
  const [time, setTime] = useState("");

  useEffect(() => {
    getServices();
  }, []);

  const getServices = () => {
    axios
      .get(`${BASE_API}get-services`)
      .then((response) => {
        setServices(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const setserviceid = (e) => {
    setServiceID(e);
    console.log(serviceID);
  };

  const getTime = (t) => {
    setDayOfWeek(t);
    setSpinner(true);
    axios
      .get(`${BASE_API}get-time?dow=${dayOfWeek}`)
      .then((response) => {
        setSchedule(response.data);
        setSpinner(false);
      })
      .catch((error) => {
        console.log(error);
        setSpinner(false);
      });
  };

  const createAppointment = async () => {
    if (description != "" && serviceID != "" && dayOfWeek != "" && time != "") {
      const userID = await AsyncStorage.getItem("user_id");
      const patientID = JSON.parse(userID);
      setSpinner(true);

      axios
        .post(`${BASE_API}appointment/create`, {
          patient_id: patientID,
          service_id: serviceID,
          description: description,
          dentist_schedule_id: time,
        })
        .then((response) => {
          setSpinner(false);
          if (response.data.status == true) {
            Alert.alert("SUCCESS", "Created Successfully");
            setDescription("");
            getTime(dayOfWeek);
          } else {
            Alert.alert("ERROR", response.data.message);
          }
        })
        .catch(function (error) {
          setSpinner(false);
          Alert.alert("ERROR", "There was a problem Logging in");
          console.log(error);
        });
    } else {
      Alert.alert("ERROr", "Fill all required fields");
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <Text
          style={{
            fontSize: 20,
            textTransform: "uppercase",
            fontWeight: "900",
          }}
          color={Colors.blue1}
        >
          Create Appointment
        </Text>
        <Text
          style={{
            color: "#666",
            marginBottom: 20,
          }}
        >
          Book an appointment with us
        </Text>
      </View>

      <Picker
        placeholder={"Service"}
        value={serviceID}
        style={styles.textfield}
        onChange={(t) => setServiceID(t)}
        migrate
        migrateTextField
        getItemLabel={serviceID}
        label={"Service"}
      >
        {services.map((item, index) => {
          return (
            <Picker.Item key={item.id} value={item.id} label={item.name} />
          );
        })}
      </Picker>

      <TextField
        value={description}
        onChangeText={(e) => setDescription(e)}
        showCharCounter
        migrate
        label="Description"
        style={styles.textfield2}
        multiline
        numberOfLines={4}
      />

      <Picker
        placeholder={"Day of the week"}
        value={dayOfWeek}
        style={styles.textfield}
        onChange={(t) => getTime(t)}
        migrate
        migrateTextField
        getItemLabel={dayOfWeek}
        label={"Day of the Week"}
      >
        <Picker.Item key={1} value={1} label={"Monday"} />
        <Picker.Item key={2} value={2} label={"Tuesday"} />
        <Picker.Item key={3} value={3} label={"Wednesday"} />
        <Picker.Item key={4} value={4} label={"Thursday"} />
        <Picker.Item key={5} value={5} label={"Friday"} />
        <Picker.Item key={6} value={6} label={"Saturday"} />
        <Picker.Item key={7} value={7} label={"Sunday"} />
      </Picker>

      <View style={{ marginBottom: 5 }}>
        <Text>Time</Text>
      </View>
      <RadioGroup initialValue={time} onValueChange={(e) => setTime(e)}>
        {schedule.map((item) => {
          return (
            <RadioButton
              key={item.id}
              value={item.id}
              label={`${item.startTime} - ${item.endTime}`}
              style={{ marginBottom: 3 }}
            />
          );
        })}
      </RadioGroup>

      <Button
        label={"Submit"}
        fullWidth
        onPress={createAppointment}
        style={{ marginTop: 10 }}
      ></Button>
      <Spinner visible={spinner} textContent={"Please Wait..."} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  textfield: {
    borderWidth: 2,
    borderColor: "#ddd",
    paddingHorizontal: 10,
    height: 40,
    borderRadius: 5,
    marginBottom: 5,
  },
  textfield2: {
    borderWidth: 2,
    borderColor: "#ddd",
    paddingHorizontal: 10,
    height: 90,
    borderRadius: 5,
    marginBottom: 5,
  },
});
