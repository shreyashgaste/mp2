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
import { Formik } from "formik";
import AsyncStorage from "@react-native-async-storage/async-storage";
const API_URL = "http://192.168.104.39:5000";
const RegisterTruck = ({ navigation }) => {
  let transemail = AsyncStorage.getItem("transemail");
  const submitData = async (values) => {
    const res = await fetch(`${API_URL}/addTruck`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: values.truckname,
        number: values.trucknumber,
        pickupcity: values.pickupcity,
        dropcity: values.dropcity,
        company: values.company,
        capacitty: values.capacity,
        transemail: values.email,
        price: values.price,
      }),
    })
      .then(async (res) => {
        const data = await res.json();
        console.log(data);
        if (data.error || !data) {
          Alert.alert("Invalid Registration");
        } else {
          Alert.alert("Success");
          // history.push("/transDash");
          navigation.navigate("TransporterDashboard");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <View>
            <Text style={styles.heading}>ADD TRUCK</Text>
          </View>
          <Formik
            initialValues={{
              truckname: "",
              trucknumber: "",
              company: "",
              capacity: "",
              pickupcity: "",
              dropcity: "",
              price: "",
              email: "",
            }}
            onSubmit={(values) => {
              // Alert.alert(JSON.stringify(values));
              submitData(values);
            }}
          >
            {({ handleChange, handleSubmit, values }) => (
              <View
                style={{
                  backgroundColor: "white",
                  borderRadius: 8,
                  padding: 10,
                  marginBottom: 20,
                }}
              >
                <TextInput
                  style={[{ height: 40 }, styles.input]}
                  placeholder="Truck Name"
                  value={values.truckname}
                  onChangeText={handleChange("truckname")}
                />
                <TextInput
                  style={[{ height: 40 }, styles.input]}
                  placeholder="Truck Number"
                  value={values.trucknumber}
                  onChangeText={handleChange("trucknumber")}
                />
                <TextInput
                  style={[{ height: 40 }, styles.input]}
                  placeholder="Truck Company"
                  value={values.company}
                  onChangeText={handleChange("company")}
                />
                <TextInput
                  style={[{ height: 40 }, styles.input]}
                  placeholder="Truck Capacity"
                  value={values.capacity}
                  onChangeText={handleChange("capacity")}
                />
                <TextInput
                  style={[{ height: 40 }, styles.input]}
                  placeholder="PICK-UP CITY"
                  value={values.pickupcity}
                  onChangeText={handleChange("pickupcity")}
                />
                <TextInput
                  style={[{ height: 40 }, styles.input]}
                  placeholder="DROP CITY"
                  value={values.dropcity}
                  onChangeText={handleChange("dropcity")}
                />
                <TextInput
                  style={[{ height: 40 }, styles.input]}
                  placeholder="TRUCK PRICE"
                  value={values.price}
                  onChangeText={handleChange("price")}
                />
                <TextInput
                  style={[{ height: 40 }, styles.input]}
                  placeholder="Transporter Email"
                  value={values.email}
                  onChangeText={handleChange("email")}
                />
                <Pressable
                  style={[{ backgroundColor: "#007bff" }, styles.button]}
                  onPress={handleSubmit}
                  android_ripple={{ color: "black" }}
                >
                  <Text style={[{ color: "white" }, styles.buttonText]}>
                    SUBMIT
                  </Text>
                </Pressable>
                <Text style={{ textAlign: "center", margin: 10 }}>
                  ALWAYS TRANSPORT SAFELY
                </Text>
              </View>
            )}
          </Formik>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegisterTruck;

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
  buttonText: {
    fontSize: 16,
    lineHeight: 21,
    letterSpacing: 0.25,
  },
  text: {
    textAlign: "center",
  },
});
