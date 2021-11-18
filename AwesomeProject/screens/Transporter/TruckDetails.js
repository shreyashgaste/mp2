import React, { useState, useEffect } from "react";
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
const API_URL = "http://192.168.104.39:5000";
const TruckDetails = ({ route, navigation }) => {
  const { truckNo } = route.params;
  const [truck, setTruck] = useState([""]);
  useEffect(() => {
    async function fetchData() {
      console.log(truckNo);
      await fetch(`${API_URL}/truck/${truckNo}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          number: truckNo,
        }),
      })
        .then(async (res) => await res.json())
        .then((data) => {
          setTruck(data);
          // console.log(data);
        });
    }
    fetchData();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <ScrollView>
          <View>
            <Text style={styles.heading}>DETAILS</Text>
          </View>
          <View style={styles.table}>
            <Text style={styles.item}>Truck Name</Text>
            <Text style={styles.item}>:   {truck.name}</Text>
            <Text style={styles.item}>Truck Number</Text>
            <Text style={styles.item}>:   {truck.number}</Text>
            <Text style={styles.item}>Truck Company</Text>
            <Text style={styles.item}>:   {truck.company}</Text>
            <Text style={styles.item}>Truck Capacity</Text>
            <Text style={styles.item}>:   {truck.capacitty}</Text>
            <Text style={styles.item}>Pick up City</Text>
            <Text style={styles.item}>:   {truck.pickupcity}</Text>
            <Text style={styles.item}>Drop City</Text>
            <Text style={styles.item}>:   {truck.dropcity}</Text>
            <Text style={styles.item}>TRUCK PRICE</Text>
            <Text style={styles.item}>:   {truck.price}</Text>
            <View />
            <View style={styles.line} />

            <Text style={{ textAlign: "center", margin: 10 }}>
              ALWAYS TRANSPORT SAFELY
            </Text>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default TruckDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f7f1d5",
    marginTop: 30,
    marginBottom: 30,
  },
  content: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  heading: {
    padding: 10,
    fontSize: 20,
    fontWeight: "bold",
    alignSelf: "center",
    color: "black",
  },
  input: {
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
  },
  button: {
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 32,
    elevation: 3,
    marginTop: 10,
    width: "50%",
  },
  item: {
    width: "50%",
    paddingBottom: 10,
  },
  buttonText: {
    fontSize: 16,
    lineHeight: 21,
    letterSpacing: 0.25,
  },
  text: {
    textAlign: "center",
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
