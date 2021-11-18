import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Pressable,
} from "react-native";
const API_URL = "http://192.168.104.39:5000";
import AsyncStorage from "@react-native-async-storage/async-storage";
const Home = ({ navigation }) => {
  const [cntTruck, setTruck] = useState("");
  const [cntTrans, setTrans] = useState("");
  const [cntCust, setCust] = useState("");

  useEffect(async() => {
    await AsyncStorage.clear();
    console.log(await AsyncStorage.getItem("authtoken"));
    function count() {
      fetch(`${API_URL}/count`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then(async(res) => await res.json())
        .then((data) => {
          setTruck(data.countTruck);
          setTrans(data.countTransporter);
          setCust(data.countCustomer);
        });
    }
    count();
  }, []);
  return (
    <View style={styles.container}>
      <ScrollView>
        <Image
          source={{
            uri: "https://clockwise.software/img/blog/how-to-build-an-app-like-uber-for-trucks/header-background.png",
          }}
          style={{
            width: 350,
            height: 250,
            marginTop: 40,
            alignSelf: "center",
          }}
        />
        <Text style={[{ marginTop: 30 }, styles.heading]}>
          WELCOME TO FREIGHT TRANSPORT
        </Text>
        <Text style={styles.paraInfo}>
          Freight transport is portal for transport industry, connecting
          transporters,truck drivers,customers. Simplicity speed and efficiency
          drive your business and this is our focus. We allow users information
          for better rates and vehicles.We provide information to registered
          user about availablity of loads and vehicles
        </Text>
        <Pressable
          style={[{ backgroundColor: "#007bff" }, styles.button]}
          onPress={() => {}}
          android_ripple={{ color: "grey" }}
        >
          <Text style={[{ color: "white" }, styles.buttonText]}>
            View Details
          </Text>
        </Pressable>
        <View style={styles.line} />
        <Text style={styles.heading}>REGISTER HERE</Text>
        <Pressable
          style={[{ backgroundColor: "#ffc107" }, styles.button]}
          onPress={() => navigation.navigate("Register")}
          android_ripple={{ color: "grey" }}
        >
          <Text style={[{ color: "black" }, styles.buttonText]}>
            Go Register
          </Text>
        </Pressable>
        <View style={styles.line} />
        <Text style={{ alignSelf: "center", marginBottom: 10 }}>LOGIN</Text>
        <Text style={styles.heading}>TO FREIGHT TRANSPORT</Text>
        <View style={styles.line} />
        <Pressable
          style={styles.bigButton}
          onPress={() => navigation.navigate("CustomerSignin")}
          android_ripple={{ color: "black" }}
        >
          <Text style={styles.bigButtonText}>CUSTOMER</Text>
        </Pressable>
        <Pressable
          style={styles.bigButton}
          onPress={() => navigation.navigate("TransporterSignin")}
          android_ripple={{ color: "black" }}
        >
          <Text style={styles.bigButtonText}>TRANSPORTER</Text>
        </Pressable>
        <View style={styles.line} />
        <View style={styles.data}>
          <Text>REGISTERED TRUCKS</Text>
          <Text>{cntTruck}</Text>
        </View>
        <View style={styles.line} />
        <View style={styles.data}>
          <Text>REGISTERED TRANSPORTER</Text>
          <Text>{cntTrans}</Text>
        </View>
        <View style={styles.line} />
        <View style={styles.data}>
          <Text>REGISTERED CUSTOMER</Text>
          <Text>{cntCust}</Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {},
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    alignSelf: "center",
  },
  paraInfo: {
    marginTop: 10,
    textAlign: "center",
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
  buttonText: {
    fontSize: 16,
    lineHeight: 21,
    letterSpacing: 0.25,
  },
  line: {
    borderBottomColor: "grey",
    borderBottomWidth: 0.6,
    width: "90%",
    alignSelf: "center",
    marginBottom: 30,
    marginTop: 30,
  },
  bigButton: {
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    borderRadius: 8,
    paddingVertical: 40,
    width: "40%",
    marginBottom: 10,
    backgroundColor: "grey",
  },
  bigButtonText: {
    fontSize: 16,
    lineHeight: 21,
    letterSpacing: 0.25,
    color: "white",
  },
  data: {
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    borderRadius: 8,
    paddingVertical: 40,
    width: "100%",
    marginBottom: 15,
    backgroundColor: "white",
    borderColor: "grey",
    borderWidth: 1,
  },
});
