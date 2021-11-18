import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  ScrollView,
  TextInput,
  SafeAreaView,
  Alert
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
const API_URL = "http://192.168.104.39:5000";
const TransporterDashboard = ({ navigation }) => {
  useEffect(() => {
    async function fetchTransporter() {
      const response = await AsyncStorage.getItem("transauthToken");
      if (response) Alert.alert("WELCOME");
      else navigation.navigate("TransporterSignin");
    }
    fetchTransporter();
  }, []);

  const handleTruckReg = async(e) => {
    const tok = await AsyncStorage.getItem("transauthToken");
    console.log(tok);
    navigation.navigate("RegisterTruck");
  };
  const handleTruckList = async(e) => {
    const tok = await AsyncStorage.getItem("transauthToken");
    console.log(tok);
    navigation.navigate("TransporterTruckList");
  };
  const handleBooking = async(e) => {
    e.preventDefault();
    const tok = await AsyncStorage.getItem("transauthToken");
    console.log(tok);
    navigation.navigate("BookingRequest");
  };
  const handleHistory = async(e) => {
    console.log(await AsyncStorage.getItem("transemail"));
    e.preventDefault();
    navigation.navigate("History");
  };
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <View>
            <Text style={styles.heading}>CHOOSE OPTION</Text>
          </View>
          <View style={styles.line} />
          <View>
            <View style={styles.buttons}>
              <Pressable
                style={styles.bigButton}
                onPress={(e) => {
                  handleTruckReg(e);
                }}
                android_ripple={{ color: "grey" }}
              >
                <Text style={styles.bigButtonText}>Register new Truck</Text>
              </Pressable>
              <Pressable
                style={styles.bigButton}
                onPress={(e) => handleTruckList(e)}
                android_ripple={{ color: "grey" }}
              >
                <Text style={styles.bigButtonText}>Truck list</Text>
              </Pressable>
              <Pressable
                style={styles.bigButton}
                onPress={(e) => handleBooking(e)}
                android_ripple={{ color: "grey" }}
              >
                <Text style={styles.bigButtonText}>Booking Request</Text>
              </Pressable>
              <Pressable
                style={styles.bigButton}
                onPress={(e) => handleHistory(e)}
                android_ripple={{ color: "grey" }}
              >
                <Text style={styles.bigButtonText}>History of Orders</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default TransporterDashboard;

const styles = StyleSheet.create({
  container: {
    padding: 30,
    marginTop: 20,
    marginBottom: 20,
  },
  heading: {
    padding: 10,
    fontSize: 20,
    fontWeight: "bold",
    alignSelf: "center",
    color: "black",
  },
  line: {
    borderBottomColor: "grey",
    borderBottomWidth: 0.6,
    width: "90%",
    alignSelf: "center",
    marginBottom: 30,
    marginTop: 30,
  },
  text: {
    alignSelf: "center",
    paddingBottom: 20,
  },
  bigButton: {
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
  bigButtonText: {
    fontSize: 16,
    lineHeight: 21,
    letterSpacing: 0.25,
    color: "blue",
  },
  buttons: {
    justifyContent: "space-between",
  },
});
