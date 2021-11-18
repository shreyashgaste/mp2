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
import AsyncStorage from "@react-native-async-storage/async-storage";
const API_URL = "http://192.168.104.39:5000";
const CustomerHistory = (navigation) => {
  const [data, setdata] = useState([""]);
  useEffect(() => {
    const loadData = async (e) => {
      const email = await AsyncStorage.getItem("user_email");
      console.log(email);
      const role = "customer";
      await fetch(`${API_URL}/trans/history`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: email,
          role,
        }),
      })
        .then(async (res) => await res.json())
        .then((data) => {
          setdata(data);
        });
      data.reverse();
    };
    loadData();
  }, []);
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <ScrollView>
          <View>
            {data.map((truck, idx) => (
              <View style={styles.table} key={idx}>
                <Text style={styles.item}>PICKUP CITY</Text>
                <Text style={styles.item}>: {truck.pickupcity}</Text>
                <Text style={styles.item}>DROP CITY</Text>
                <Text style={styles.item}>: {truck.dropcity}</Text>
                <Text style={styles.item}>WEIGHT</Text>
                <Text style={styles.item}>: {truck.weight}</Text>
                <Text style={styles.item}>TYPE OF GOOD</Text>
                <Text style={styles.item}>: {truck.typeofgoods}</Text>
                <Text style={styles.item}>DATE</Text>
                <Text style={styles.item}>: {truck.date}</Text>
                <Text style={styles.item}>TRANSPORTER</Text>
                <Text style={styles.item}>: {truck.transemail}</Text>
                <Text style={styles.item}>TRUCK NUMBER</Text>
                <Text style={styles.item}>: {truck.truckid}</Text>
                <View style={styles.line} />
                <View>
                  {truck.transconfirm ? (
                    <View
                      style={[{ backgroundColor: "green" }, styles.smallText]}
                    >
                      <Text style={{ color: "white" }}>CONFIRMED</Text>
                    </View>
                  ) : (
                    <View
                      style={[{ backgroundColor: "red" }, styles.smallText]}
                    >
                      <Text style={{ color: "white" }}>PENDING</Text>
                    </View>
                  )}
                  {truck.transconfirm && truck.status ? (
                    <View
                      style={[{ backgroundColor: "blue" }, styles.smallText]}
                    >
                      <Text style={{ color: "white" }}>WILL BE DELIEVERED SOON</Text>
                    </View>
                  ) : (
                    <View></View>
                  )}
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default CustomerHistory;
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
  smallText: {
    padding: 10,
    borderRadius: 8,
    margin: 10
  },
});
