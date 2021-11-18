import React, { useState } from "react";
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
const Payment = ({ route, navigation }) => {
  const { truckData, userEmail, Dt, typeofGoods } = route.params;
  const handleConfirm = async (values) => {
    const user = await AsyncStorage.getItem("user_email");
    const pickupcity = await AsyncStorage.getItem("pickupcity");
    const dropcity = await AsyncStorage.getItem("dropcity");
    const date = new Date().toLocaleString();
    const weight = await AsyncStorage.getItem("weight");
    const price = await AsyncStorage.getItem("price");
    const adminemail = await AsyncStorage.getItem("adminemail");
    const truckid = await AsyncStorage.getItem("truckId");
    const typeofgoods = await AsyncStorage.getItem("typeofgoods");
    console.log(typeofgoods);
    await fetch(`${API_URL}/booking`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user,
        pickupcity,
        dropcity,
        date,
        weight,
        adminemail,
        truckid,
        typeofgoods,
        price,
        Address1: values.address1,
        Address2: values.address2,
      }),
    })
      .then(async (res) => await res.json())
      .then((data) => {
        Alert.alert(data.message);
      });
    AsyncStorage.clear();
    // console.log(AsyncStorage.getItem('pickupcity'));
  };
  const handleCancel = (e) => {
    AsyncStorage.clear();
    // history.push("/customer/truckBook");
    navigation.navigate("CustomerDashboard");
  };
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <View>
            <View>
              <View>
                <Text style={styles.heading}>Payment TRUCK</Text>
              </View>
              <Formik
                initialValues={{
                  address1: "",
                  address2: "",
                }}
                onSubmit={(values) => {
                  // Alert.alert(JSON.stringify(values));
                  handleConfirm(values);
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
                      placeholder="User Email"
                      value={userEmail}
                      editable={false}
                      onChangeText={handleChange("email")}
                    />
                    <TextInput
                      style={[{ height: 40 }, styles.input]}
                      placeholder="Truck ID"
                      value={truckData.number}
                      editable={false}
                      onChangeText={handleChange("truckNumber")}
                    />
                    <TextInput
                      style={[{ height: 80 }, styles.input]}
                      placeholder="Address 1"
                      value={values.address1}
                      onChangeText={handleChange("address1")}
                    />
                    <TextInput
                      style={[{ height: 80 }, styles.input]}
                      placeholder="City"
                      value={values.address2}
                      onChangeText={handleChange("address2")}
                    />
                    <TextInput
                      style={[{ height: 40 }, styles.input]}
                      placeholder="Pickup City"
                      value={truckData.pickupcity}
                      editable={false}
                      onChangeText={handleChange("pickupcity")}
                    />
                    <TextInput
                      style={[{ height: 40 }, styles.input]}
                      placeholder="Drop City"
                      value={truckData.dropcity}
                      editable={false}
                      onChangeText={handleChange("dropcity")}
                    />
                    <TextInput
                      style={[{ height: 40 }, styles.input]}
                      placeholder="Type of Goods"
                      value={typeofGoods}
                      editable={false}
                      onChangeText={handleChange("typeofgoods")}
                    />
                    <TextInput
                      style={[{ height: 40 }, styles.input]}
                      placeholder="Date"
                      value={Dt}
                      editable={false}
                      onChangeText={handleChange("date")}
                    />
                    <TextInput
                      style={[{ height: 40 }, styles.input]}
                      placeholder="Price"
                      value={JSON.stringify(truckData.price)}
                      editable={false}
                      onChangeText={handleChange("price")}
                    />

                    <Pressable
                      style={[{ backgroundColor: "green" }, styles.button]}
                      onPress={handleSubmit}
                      android_ripple={{ color: "black" }}
                    >
                      <Text style={[{ color: "white" }, styles.buttonText]}>
                        CONFIRM
                      </Text>
                    </Pressable>
                    <Pressable
                      style={[{ backgroundColor: "red" }, styles.button]}
                      onPress={(e) => {
                        handleCancel(e);
                      }}
                      android_ripple={{ color: "black" }}
                    >
                      <Text style={[{ color: "white" }, styles.buttonText]}>
                        CANCEL
                      </Text>
                    </Pressable>
                    <Text style={{ textAlign: "center", margin: 10 }}>
                      ALWAYS TRANSPORT SAFELY
                    </Text>
                  </View>
                )}
              </Formik>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Payment;

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
