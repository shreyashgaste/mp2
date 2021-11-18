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
const Update = ({ route, navigation }) => {
  const { truckId, truckCompany, transEmail, truckNo } = route.params;

  const handleUpdate = async (values) => {
    const number = await AsyncStorage.getItem("trucknumber");
    const res = fetch(`${API_URL}/transporter/update/${truckId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: values.truckname,
        number: truckNo,
        pickupcity: values.pickupcity,
        dropcity: values.dropcity,
        capacitty: values.capacity,
        price: values.price,
      }),
    })
      .then(async(res) => await res.json())
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
      <ScrollView>
        <View style={styles.container}>
          <View>
            <Text style={styles.heading}>UPDATE TRUCK</Text>
          </View>
          <Formik
            initialValues={{
              truckname: "",
              capacity: "",
              pickupcity: "",
              dropcity: "",
              price: "",
            }}
            onSubmit={(values) => {
              // Alert.alert(JSON.stringify(values));
              handleUpdate(values);
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
                  value={truckNo}
                  onChangeText={handleChange("trucknumber")}
                  editable={false}
                />
                <TextInput
                  style={[{ height: 40 }, styles.input]}
                  placeholder="Truck Company"
                  value={truckCompany}
                  onChangeText={handleChange("company")}
                  editable={false}
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
                  value={transEmail}
                  onChangeText={handleChange("email")}
                  editable={false}
                />
                <Pressable
                  style={[{ backgroundColor: "green" }, styles.button]}
                  onPress={handleSubmit}
                  android_ripple={{ color: "black" }}
                >
                  <Text style={[{ color: "white" }, styles.buttonText]}>
                    UPDATE
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

export default Update;

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
