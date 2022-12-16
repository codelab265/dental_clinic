import { ScrollView, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { ListItem, Colors, Card, Text, View } from "react-native-ui-lib";
import axios from "axios";
import Spinner from "react-native-loading-spinner-overlay/lib";
import { FontAwesome5 } from "@expo/vector-icons";
export default function Services() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    getService();
  }, []);

  const getService = () => {
    axios
      .get(`${BASE_API}services`)
      .then((response) => {
        setServices(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text
          style={{
            fontWeight: "700",
            fontSize: 16,
            color: "#6360DC",
            marginBottom: 20,
          }}
        >
          Services
        </Text>
        {services != "" ? (
          services.map((item, index) => {
            return (
              <Card
                backgroundColor={Colors.white}
                style={{ marginBottom: 15 }}
                padding-10
                key={index}
                row
              >
                <View style={styles.timeContainer}>
                  <FontAwesome5
                    name="circle"
                    color="#6360DC"
                    size={20}
                  ></FontAwesome5>
                </View>

                <View style={{ paddingLeft: 5 }}>
                  <Text style={{ fontSize: 20 }}>{item.name}</Text>
                  <View row>
                    <Text text90 color={Colors.blue20}>
                      Price: {item.price}
                    </Text>
                  </View>
                </View>
              </Card>
            );
          })
        ) : (
          <Card
            backgroundColor={Colors.yellow50}
            style={{
              marginBottom: 15,
              alignItems: "center",
              justifyContent: "center",
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
