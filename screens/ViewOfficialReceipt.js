import { ScrollView, StyleSheet } from "react-native";
import React from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import { Text, View, Card, Colors } from "react-native-ui-lib";
import moment from "moment";

export default function ViewOfficialReceipt({ route }) {
  const invoice = route.params.items;
  const getSum = (array) => {
    var sum = 0;
    array.forEach((element) => {
      return (sum += parseFloat(element.amount));
    });

    return sum.toFixed(2);
  };

  const balance = (paid, paidAlready) => {
    var deduct = parseFloat(paid) + parseFloat(paidAlready);
    var invoice_detail = invoice.invoice_detail;
    var total = 0;
    invoice_detail.forEach((element) => {
      return (total += parseFloat(element.amount));
    });

    return parseFloat(total - deduct);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header} row>
        <View style={styles.iconContainer}>
          <FontAwesome5 name="file-invoice"></FontAwesome5>
        </View>
        <View style={{ marginLeft: 10 }}>
          <Text color="white">{invoice.invoice_number}</Text>
          <Text color="white">₱ {getSum(invoice.invoice_detail)}</Text>
        </View>
      </View>
      <View style={styles.footer}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={{ fontWeight: "700", fontSize: 16, color: "#6360DC" }}>Official Receipts</Text>
          <View style={{ marginTop: 20 }}>
            {invoice.official_receipt.length > 0 ? (
              invoice.official_receipt.map((item, index) => {
                return (
                  <View
                    style={{
                      borderBottomWidth: 0.5,
                      borderBottomColor: "#ddd",
                    }}
                    row
                    padding-10
                    key={index}
                  >
                    <View style={styles.receiptIcon}>
                      <FontAwesome5 name="receipt"></FontAwesome5>
                    </View>
                    <View
                      style={{
                        marginLeft: 20,
                        justifyContent: "space-between",
                      }}
                      flex
                      row
                    >
                      <View>
                        <Text text70 color={Colors.blue10}>
                          {item.OR_number}
                        </Text>
                        <Text>
                          <FontAwesome5
                            name="calendar"
                            color="#6360DC"
                          ></FontAwesome5>{" "}
                          {moment(item.created_at).format("DD-MMM-Y")}
                        </Text>
                      </View>
                      <View>
                        <Text>Paid: ₱ {item.amount_paid} </Text>
                        <Text>Bal: ₱ {balance(item.amount_paid, item.paid_already)}</Text>
                      </View>
                    </View>
                  </View>
                );
              })
            ) : (
              <Card
                backgroundColor={"white"}
                padding-20
                style={{ justifyContent: "center", alignItems: "center" }}
              >
                <Text>No ORs created yet!</Text>
              </Card>
            )}
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
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#6360DC",
  },
  footer: {
    flex: 3,
    backgroundColor: "white",
    padding: 10,
  },

  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ddd",
  },

  receiptIcon: {
    width: 50,
    height: 50,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ddd",
  },
});
