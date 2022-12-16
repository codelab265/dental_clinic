import { ScrollView, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { Card, Colors, Text, View } from "react-native-ui-lib";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { FontAwesome5 } from "@expo/vector-icons";
import moment from "moment";

export default function Transactions() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    getTransactions();
  }, []);

  const getSum = (array) => {
    var sum = 0;
    array.forEach((element) => {
      return (sum += parseFloat(element.amount));
    });

    return sum.toFixed(2);
  };

  const getTransactions = async () => {
    const id = await AsyncStorage.getItem("user_id");
    const patientID = JSON.parse(id);

    axios
      .get(`${BASE_API}transactions?id=${patientID}`)
      .then((response) => {
        console.log(response.data);
        setTransactions(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <View style={styles.container}>
      <Text style={{ fontWeight: "700", fontSize: 16, color: "#6360DC" }}>
        Transactions
      </Text>
      <View style={{ marginTop: 20 }}>
       <ScrollView>
       {transactions.length > 0 ? (
          transactions.map((item, index) => {
            return (
              <Card backgroundColor={"white"} padding-10 key={index} row>
                <View style={styles.timeContainer}>
                  <FontAwesome5
                    name="money-check"
                    color="#6360DC"
                    size={20}
                  ></FontAwesome5>
                </View>
                <View
                  style={{
                    flex: 1,
                    justifyContent: "space-between",
                    paddingLeft: 5,
                  }}
                  row
                >
                  <View>
                    <Text text70 color={Colors.blue10}>
                      {item.invoice.invoice_number}
                    </Text>
                    <Text color={Colors.green10}>{item.official_receipt.OR_number}</Text>
                  </View>
                  <View>
                    <Text>
                      <FontAwesome5
                        name={"calendar"}
                        color="#6360DC"
                      ></FontAwesome5>
                      {"  "}
                      {moment(item.created_at).format('DD-MMM-Y')}
                    </Text>
                    <Text>
                      <FontAwesome5
                        
                        color="#6360DC"
                      >₱</FontAwesome5>
                      {"  "}
                        {item.official_receipt.amount_paid}
                    </Text>

                    
                  </View>
                </View>
              </Card>
            );
          })
        ) : (
          <Card
            backgroundColor={"white"}
            padding-20
            style={{ justifyContent: "center", alignItems: "center" }}
          >
            <Text>No transactions created yet!</Text>
          </Card>
        )}
       </ScrollView>
      </View>
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
