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
const CustomerDashboard = ({ navigation }) => {
  useEffect(() => {
    async function fetchCustomer() {
      const response = AsyncStorage.getItem("transauthToken");
      if (response) Alert.alert("WELCOME");
      else navigation.navigate("TransporterSignin");
    }
    fetchCustomer();
  }, []);
  const handleBook = (e) => {
    navigation.navigate("TruckBooking");
  };
  const handleHistory = (e) => {
    console.log(AsyncStorage.getItem("transemail"));
    e.preventDefault();
    navigation.navigate("CustomerHistory");
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
                  handleBook(e);
                }}
                android_ripple={{ color: "grey" }}
              >
                <Text style={styles.bigButtonText}>TRUCK BOOKING</Text>
              </Pressable>
              <Pressable
                style={styles.bigButton}
                onPress={(e) => {
                  handleHistory(e);
                }}
                android_ripple={{ color: "grey" }}
              >
                <Text style={styles.bigButtonText}>SEE HISTORY</Text>
              </Pressable>
              <Pressable
                style={styles.bigButton}
                onPress={() => {}}
                android_ripple={{ color: "grey" }}
              >
                <Text style={styles.bigButtonText}>FEEDBACK</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CustomerDashboard;

const styles = StyleSheet.create({
  container: {
    padding: 30,
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
