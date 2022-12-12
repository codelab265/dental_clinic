import { ScrollView, StyleSheet } from "react-native";
import React from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import {
  Text,
  View,
  Card,
  CardProps,
  Button,
  Colors,
  ListItem,
} from "react-native-ui-lib";

export default function DentistSchedule({ route, navigation }) {
  const user = route.params.item;

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

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <FontAwesome5
            name="user"
            size={20}
            color={Colors.purple20}
          ></FontAwesome5>
        </View>
        <Text color={Colors.white} style={{ marginTop: 5 }}>
          {user.name}
        </Text>
        <Text color={Colors.white} style={{ marginTop: 5 }}>
          {user.specialization}
        </Text>
      </View>
      <View style={styles.body}>
        <ScrollView>
          <View
            style={{
              borderBottomWidth: 1,
              paddingBottom: 20,
              borderColor: "#ddd",
              marginBottom: 5,
            }}
          >
            <Text text60 color={"gray"}>
              Schedule
            </Text>
          </View>
          {user.dentist_schedule.map((item, index) => {
            return (
              <View style={styles.scheduleContainer} key={index}>
                <View style={styles.clockContainer}>
                  <FontAwesome5
                    name={"clock"}
                    size={14}
                    color={"#6360DC"}
                  ></FontAwesome5>
                </View>
                <View style={{ paddingLeft: 10 }}>
                  <Text text70 color={"#6360DC"}>
                    {getDay(1)}
                  </Text>
                  <Text text90 color={"gray"}>
                    {`${item.startTime} - ${item.endTime}`}
                  </Text>
                </View>
              </View>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  header: {
    flex: 1,
    backgroundColor: "#6360DC",
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },

  body: {
    flex: 3,
    backgroundColor: "#fff",
    padding: 10,
  },
  avatarContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    height: 50,
    borderRadius: 100,
    backgroundColor: "#fff",
  },

  scheduleContainer: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 5,
    marginBottom: 5,
    borderRadius: 4,
    alignItems: "center",
  },

  clockContainer: {
    padding: 5,
  },
});
