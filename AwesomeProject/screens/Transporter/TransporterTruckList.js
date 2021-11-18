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
const TransporterTruckList = ({ navigation }) => {
  const [data, setdata] = useState([""]);
  useEffect(() => {
    const loadData = async (e) => {
      console.log(await AsyncStorage.getItem("transemail"));
      const res = await fetch(`${API_URL}/trucklist`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          transemail: await AsyncStorage.getItem("transemail"),
        }),
      })
        .then(async (res) => await res.json())
        .then((data) => {
          setdata(data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    loadData();
  }, []);

  // useEffect(() => {
  //     loadData();
  //     return () => { };
  // }, []);
  const handleDetails = async (e, truck) => {
    e.preventDefault();

    console.log("Hello", truck);
    navigation.navigate("TruckDetails", { truckNo: truck.number });
    // history.push(`/truckDetails/${truck.number}`);
  };

  const handleUpdate = async (e, truck) => {
    e.preventDefault();
    console.log(truck);
    await AsyncStorage.setItem("truckid", truck._id);
    await AsyncStorage.setItem("truckname", truck.name);
    await AsyncStorage.setItem("trucknumber", truck.number);
    await AsyncStorage.setItem("truckcompany", truck.company);
    await AsyncStorage.setItem(
      "truckcapacity",
      JSON.stringify(truck.capacitty)
    );
    await AsyncStorage.setItem("truckstatus", JSON.stringify(truck.status));
    await AsyncStorage.setItem("truckemail", truck.transemail);
    await AsyncStorage.setItem("truckpickup", truck.pickupcity);
    await AsyncStorage.setItem("truckdrop", truck.dropcity);
    navigation.navigate("Update", {
      truckId: truck._id,
      truckCompany: truck.company,
      transEmail: truck.transemail,
      truckNo: truck.number,
    });
    // history.push(`/transporter/updateTruck/${truck._id}`);
  };
  const handleDelete = async (e, truck) => {
    e.preventDefault();
    const res = await fetch(`${API_URL}/transporter/deleteTruck/${truck._id}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: truck.number,
      }),
    })
      .then(async (res) => await res.json())
      .then((data) => {
        if (data.message) {
          Alert.alert(data.message);
        } else {
          Alert.alert(data.error);
        }
        console.log(data);
        navigation.navigate("TransporterDashboard");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <ScrollView>
          <View>
            {data.message === "No Truck Found" ? (
              <View>
                <Text>NO TRUCK REGISTERED</Text>
              </View>
            ) : (
              data.map((truck, idx) => (
                <View key={idx}>
                  <View style={styles.table}>
                    <Text style={styles.item}>Truck Number</Text>
                    <Text style={styles.item}>:   {truck.number}</Text>
                    <Text style={styles.item}>Company</Text>
                    <Text style={styles.item}>:   {truck.company}</Text>
                    <Text style={styles.item}>Price</Text>
                    <Text style={styles.item}>:   {truck.price}</Text>
                    <Text style={styles.item}>Capacity</Text>
                    <Text style={styles.item}>:   {truck.capacitty}</Text>
                    <View style={styles.line} />
                    <Pressable
                      style={[{ backgroundColor: "green" }, styles.button]}
                      onPress={(e) => {
                        handleUpdate(e, truck);
                      }}
                      android_ripple={{ color: "grey" }}
                    >
                      <Text style={[{ color: "white" }, styles.buttonText]}>
                        UPDATE
                      </Text>
                    </Pressable>
                    <Pressable
                      style={[{ backgroundColor: "red" }, styles.button]}
                      onPress={(e) => {
                        handleDelete(e, truck);
                      }}
                      android_ripple={{ color: "grey" }}
                    >
                      <Text style={[{ color: "white" }, styles.buttonText]}>
                        DELETE
                      </Text>
                    </Pressable>
                    <Pressable
                      style={[{ backgroundColor: "#007bff" }, styles.button]}
                      onPress={(e) => {
                        handleDetails(e, truck);
                      }}
                      android_ripple={{ color: "black" }}
                    >
                      <Text style={[{ color: "white" }, styles.buttonText]}>
                        DETAILS
                      </Text>
                    </Pressable>
                  </View>
                </View>
              ))
            )}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default TransporterTruckList;
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
    width: "100%",
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
    borderRadius: 8,
    padding: 10,
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
