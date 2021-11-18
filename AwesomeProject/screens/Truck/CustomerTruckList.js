import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  ScrollView,
  TextInput,
  SafeAreaView,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
const API_URL = "http://192.168.104.39:5000";
const CustomerTruckList = ({ props, navigation }) => {
  const handleSubmit = (value) => {
    AsyncStorage.setItem("truckId", value);
    console.log(value);
  };
  const renderFun = props.truck.map((truc, idx) => {
    return (
      <SafeAreaView>
        <View style={styles.container}>
          <ScrollView>
            {
              <View style={styles.table} key={idx}>
                <Text style={styles.item}>TRUCK NUMBER</Text>
                <Text style={styles.item}>: {truc.number}</Text>
                <Text style={styles.item}>Company</Text>
                <Text style={styles.item}>: {truc.company}</Text>
                <Text style={styles.item}>Price</Text>
                <Text style={styles.item}>: {truc.price}</Text>
                <Text style={styles.item}>Capacity</Text>
                <Text style={styles.item}>: {truc.capacitty}</Text>
                <Text style={styles.item}>Trans Email</Text>
                <Text style={styles.item}>: {truc.transemail}</Text>
                <Pressable
                  style={[
                    { backgroundColor: "#007bff", width: "40%" },
                    styles.button,
                  ]}
                  onPress={() => {
                    handleSubmit({ value: truc._id });
                  }}
                  android_ripple={{ color: "black" }}
                >
                  <Text style={[{ color: "white" }, styles.buttonText]}>
                    BOOK NOW
                  </Text>
                </Pressable>
                <View style={styles.line} />
              </View>
            }
            {/* Pending View */}
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  });
  return <View>{renderFun()}</View>;
};

export default CustomerTruckList;
const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f7f1d5",
    marginTop: 30,
    marginBottom: 30,
  },
  heading: {
    padding: 10,
    fontSize: 20,
    fontWeight: "bold",
    alignSelf: "center",
    color: "black",
  },
  button: {
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 32,
    elevation: 3,
    marginTop: 15,
    marginBottom: 30,
  },
  buttonText: {
    fontSize: 16,
    lineHeight: 21,
    letterSpacing: 0.25,
  },
  text: {
    alignSelf: "center",
  },
  item: {
    width: "50%",
    paddingBottom: 10,
  },
  table: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
    marginBottom: 20,
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
  },
  line: {
    borderBottomColor: "grey",
    borderBottomWidth: 0.6,
    width: "90%",
    alignSelf: "center",
    marginBottom: 30,
    marginTop: 30,
  },
});
