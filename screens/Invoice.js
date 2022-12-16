import {
  Dimensions,
  ScrollView,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Card, Colors, Text, View } from "react-native-ui-lib";
import { FontAwesome5 } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import moment from "moment";
const width = Dimensions.get("screen").width;
export default function Invoice({navigation}) {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    getInvoices();
  }, []);

  const getSum = (array) => {
    var sum = 0;
    array.forEach((element) => {
      return (sum += parseFloat(element.amount));
    });

    return sum.toFixed(2);
  };

  const getInvoices = async () => {
    const id = await AsyncStorage.getItem("user_id");
    const patientID = JSON.parse(id);

    axios
      .get(`${BASE_API}invoices?id=${patientID}`)
      .then((response) => {
        console.log(response.data);
        setInvoices(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text text60 color={Colors.blue10}>Invoices</Text>
        <View
          style={{
            marginTop: 20,
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-around",
          }}
        >
          {invoices.length > 0 ? (
            invoices.map((item) => {
              return (
                <TouchableOpacity key={item.id} onPress={()=>navigation.navigate('ViewInvoice', {items:item.invoice_detail})}>
                  <Card
                    style={{
                      width: width / 2 - 30,
                      justifyContent: "center",
                      alignItems: "center",
                      marginBottom: 20,
                    }}
                    backgroundColor={Colors.white}
                    padding-20
                  >
                    <View style={styles.iconContainer}>
                      <FontAwesome5 name={"file-invoice"} size={25} color={'#6360DC'}></FontAwesome5>
                    </View>
                    <View style={{
                     
                      justifyContent: "center",
                      alignItems: "center",
                     
                    }}>
                      <Text text70 color={'#6360DC'} style={{ marginVertical: 5 }}>
                        {item.invoice_number}
                      </Text>
                      <Text style={{ marginBottom: 5, fontSize:12, color:'#666' }}>₱{getSum(item.invoice_detail)}</Text>
                      <Text style={{ marginBottom: 5, fontSize:12, color:'#666' }}>
                        <FontAwesome5 name="calendar"></FontAwesome5> 
                        {" "}
                        {moment(item.created_at).format('DD-MM-Y')}
                      </Text>
                    </View>
                  </Card>
                </TouchableOpacity>
              );
            })
          ) : (
            <Card
              backgroundColor={"white"}
              padding-20
              style={{ justifyContent: "center", alignItems: "center" }}
            >
              <Text>No invoices created!</Text>
            </Card>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },

  iconContainer: {
    width: 70,
    height: 70,
    borderRadius: 70,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
  },
});
