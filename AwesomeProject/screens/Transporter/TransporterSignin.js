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
import { Formik } from "formik";
import AsyncStorage from "@react-native-async-storage/async-storage";
const API_URL = "http://192.168.104.39:5000";
const TransporterSignin = ({ navigation }) => {
  const [text, setText] = useState("");
  useEffect(() => {
    async function fetchTransporter() {
      const token = await AsyncStorage.getItem("transauthToken");
      const response = await AsyncStorage.getItem("transauthToken");
      if (response) {
        console.log(token);
      }
    }
    fetchTransporter();
  }, []);
  const handleSignin = async (values) => {
    const res = await fetch(`${API_URL}/Transsignin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: values.email,
        password: values.password,
      }),
    })
      .then(async (res) => {
        const data = await res.json();
        console.log(data);
        if (data.error) {
          Alert.alert("Unsucessful Login");
          navigation.navigate("TransporterSignup");
        } else {
          Alert.alert("Success");
          let { token } = data;
          console.log(token);
          await AsyncStorage.setItem("transemail", values.email);
          await AsyncStorage.setItem("transauthToken", token);
          setText(" ");
          navigation.navigate(`TransporterDashboard`);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <ScrollView>
          <View>
            <Text style={styles.heading}>LOG IN TRANSPORTER</Text>
          </View>
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            onSubmit={(values) => {
              // Alert.alert(JSON.stringify(values));
              handleSignin(values);
            }}
          >
            {({ handleChange, handleSubmit, values }) => (
              <View
                style={{
                  backgroundColor: "white",
                  borderRadius: 8,
                  padding: 20,
                  marginBottom: 20,
                  borderWidth: 1,
                  borderColor: "grey",
                }}
              >
                <TextInput
                  style={[{ height: 40 }, styles.input]}
                  placeholder="E-mail"
                  value={values.email}
                  onChangeText={handleChange("email")}
                />
                <TextInput
                  style={[{ height: 40 }, styles.input]}
                  placeholder="Password"
                  secureTextEntry={true}
                  password="true"
                  value={values.password}
                  onChangeText={handleChange("password")}
                />
                <Pressable
                  style={{
                    backgroundColor: "white",
                    paddingRight: 20,
                    alignSelf: "flex-end",
                  }}
                  onPress={() => {
                    navigation.navigate("TransporterSignup");
                  }}
                  android_ripple={{ color: "grey" }}
                >
                  <Text style={{ color: "blue", fontSize: 14 }}>Signup?</Text>
                </Pressable>
                <Pressable
                  style={[{ backgroundColor: "#007bff" }, styles.button]}
                  onPress={handleSubmit}
                  android_ripple={{ color: "black" }}
                >
                  <Text style={[{ color: "white" }, styles.buttonText]}>
                    LOGIN
                  </Text>
                </Pressable>
              </View>
            )}
          </Formik>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default TransporterSignin;

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
    marginTop: 15,
    width: "50%",
  },
  buttonText: {
    fontSize: 16,
    lineHeight: 21,
    letterSpacing: 0.25,
  },
  text: {
    alignSelf: "center",
  },
});
