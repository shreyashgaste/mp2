import React, { useEffect, useState } from "react";
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
const BookingRequest = (navigation) => {
  const [data, setdata] = useState([]);
  const loadData = async (e) => {
    // console.log(AsyncStorage.getItem('transemail'));
    const email = await AsyncStorage.getItem("transemail");
    e.preventDefault();
    await fetch(`${API_URL}/bookingRequests`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        transemail: email,
      }),
    })
      .then(async (res) => await res.json())
      .then((data) => {
        setdata(data);
      });
    // data.sort((a, b) => (a.date > b.date) ? 1 : -1);
  };
  const handleConfirm = async (e, truck, transconfirm) => {
    e.preventDefault();
    console.log(truck.truckid);
    console.log(truck._id);
    await fetch(`${API_URL}/transConfirm`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        bookingId: truck.bookingId,
        user: truck.user,
        pickupcity: truck.pickupcity,
        dropcity: truck.dropcity,
        date: truck.date,
        weight: truck.weight,
        transemail: truck.transemail,
        truckNo: truck.truckid,
        typeofgoods: truck.typeofgoods,
        price: truck.price,
        status: true,
        transconfirm: transconfirm,
      }),
    })
      .then(async (res) => await res.json())
      .then((data) => {
        Alert.alert(data.message);
      });
  };
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <ScrollView>
          <View>
            <Pressable
              style={[{ backgroundColor: "#007bff" }, styles.button]}
              onPress={(e) => {
                loadData(e);
              }}
              android_ripple={{ color: "black" }}
            >
              <Text style={[{ color: "white" }, styles.buttonText]}>
                CLICK HERE TO SHOW LIST
              </Text>
            </Pressable>
            {data.err ? (
              <Text>{data.err}</Text>
            ) : (
              data.map((truck, idx) => (
                <View style={styles.table} key={idx}>
                  <Text style={styles.item}>USER EMAIL</Text>
                  <Text style={styles.item}>: {truck.user}</Text>
                  <Text style={styles.item}>PICKUP CITY</Text>
                  <Text style={styles.item}>: {truck.pickupcity}</Text>
                  <Text style={styles.item}>DROP CITY</Text>
                  <Text style={styles.item}>: {truck.dropcity}</Text>
                  <Text style={styles.item}>WEIGHT</Text>
                  <Text style={styles.item}>: {truck.weight}</Text>
                  <Text style={styles.item}>TYPE OF GOODS</Text>
                  <Text style={styles.item}>: {truck.typeofgoods}</Text>
                  <Text style={styles.item}>TRUCK NUMBER</Text>
                  <Text style={styles.item}>: {truck.truckid}</Text>
                  <View style={styles.line} />
                  <Pressable
                    style={[
                      { backgroundColor: "#007bff", width: "50%" },
                      styles.button,
                    ]}
                    onPress={(e) => {
                      handleConfirm(e, truck, true);
                    }}
                    android_ripple={{ color: "black" }}
                  >
                    <Text style={[{ color: "white" }, styles.buttonText]}>
                      CONFIRM
                    </Text>
                  </Pressable>
                  <Pressable
                    style={[
                      { backgroundColor: "red", width: "50%" },
                      styles.button,
                    ]}
                    onPress={(e) => {
                      handleConfirm(e, truck, false);
                    }}
                    android_ripple={{ color: "grey" }}
                  >
                    <Text style={[{ color: "white" }, styles.buttonText]}>
                      CANCEL
                    </Text>
                  </Pressable>
                </View>
              ))
            )}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default BookingRequest;
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
    marginBottom: 10,
    width: "100%"
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
    marginBottom: 10,
    marginTop: 30,
  },
});
