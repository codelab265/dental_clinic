import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import { Colors } from "react-native-ui-lib/src/style/colors";

const width = Dimensions.get("screen").width;

export default function Item({name, icon, onPress}) {
  return (
    <View>
      <TouchableOpacity onPress={onPress}>
        <View style={styles.card}>
          <FontAwesome5
            name={icon}
            size={20}
            color={'white'}
          ></FontAwesome5>
          <Text style={{ marginTop: 5, color:'white' }}>
            {name}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
    
  card: {
    flexDirection: "column",
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    padding: 8,
    margin: 5,
    width: width / 3 - 20,
    backgroundColor: "#6360DC",
  },
});
