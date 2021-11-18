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
const TruckBooking = ({ navigation }) => {
  const [trucks, setTruck] = useState([]);
  const [load, setLoad] = useState();
  const [user, setUser] = useState({
    pickupcity: "",
    dropcity: "",
    capacitty: "",
    typeofgoods: "",
  });
 
  const handleBook = async (e, id, truck) => {
   const useremail = await AsyncStorage.getItem("user_email");
  const  dt = new Date().toLocaleString();

    e.preventDefault();
    await AsyncStorage.setItem("truck", JSON.stringify(truck));
    const { ls } = await AsyncStorage.getItem("truck");
    console.log(user.typeofgoods);
    await AsyncStorage.setItem("truckId", truck.number);
    await AsyncStorage.setItem("pickupcity", truck.pickupcity);
    await AsyncStorage.setItem("dropcity", truck.dropcity);
    await AsyncStorage.setItem("weight", user.capacitty);
    await AsyncStorage.setItem("price", JSON.stringify(truck.price));
    await AsyncStorage.setItem("adminemail", truck.transemail);
    await AsyncStorage.setItem("typeofgoods", user.typeofgoods);
    // await AsyncStorage.setItem("load", load);
    // history.push("/customer/payment");
    navigation.navigate("Payment", {
      truckData: truck,
      userEmail: useremail,
      Dt: dt,
      typeofGoods: user.typeofgoods
    });
  };

  const submitData = async (values) => {
    await fetch(`${API_URL}/userTruckList`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        pickupcity: values.pickupcity,
        dropcity: values.dropcity,
        capacitty: values.weight,
      }),
    })
      .then(async (res) => await res.json())
      .then((data) => {
        setTruck(data);
      })
      .catch((error) => {
        console.log(error);
      });
    // console.log(trucks);
    // history.push('/customerDash');
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <View>
            <Text style={styles.heading}>BOOKING</Text>
          </View>
          <Formik
            initialValues={{
              pickupcity: "",
              dropcity: "",
              typeofgoods: "",
              weight: "",
            }}
            onSubmit={(values) => {
              // Alert.alert(JSON.stringify(values));
              setUser({
                ...user,
                ["pickupcity"]: values.pickupcity,
                ["dropcity"]: values.dropcity,
                ["capacitty"]: values.weight,
                ["typeofgoods"]: values.typeofgoods,
              });
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
                  placeholder="Type of Goods"
                  value={values.typeofgoods}
                  onChangeText={handleChange("typeofgoods")}
                />
                <TextInput
                  style={[{ height: 40 }, styles.input]}
                  placeholder="Weight in Metric Tons"
                  value={values.weight}
                  onChangeText={handleChange("weight")}
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
                <Text style={{ alignSelf: "center", margin: 10 }}>
                  ALWAYS TRANSPORT SAFELY
                </Text>
              </View>
            )}
          </Formik>
        </View>

        <View style={styles.container}>
          {trucks.err ? (
            <Text>No List</Text>
          ) : (
            trucks.map((truck, idx) => (
              <View style={styles.table} key={idx}>
                <Text style={styles.item}>TRUCK NUMBER</Text>
                <Text style={styles.item}>: {truck.number}</Text>
                <Text style={styles.item}>Company</Text>
                <Text style={styles.item}>: {truck.company}</Text>
                <Text style={styles.item}>Price</Text>
                <Text style={styles.item}>: {truck.price}</Text>
                <Text style={styles.item}>Capacity</Text>
                <Text style={styles.item}>: {truck.capacitty}</Text>
                <Text style={styles.item}>Trans Email</Text>
                <Text style={styles.item}>: {truck.transemail}</Text>
                <View style={styles.line} />
                <Pressable
                  style={[
                    { backgroundColor: "#007bff", width: "40%" },
                    styles.button,
                  ]}
                  onPress={(e) => {
                    handleBook(e, truck._id, truck);
                  }}
                  android_ripple={{ color: "black" }}
                >
                  <Text style={[{ color: "white" }, styles.buttonText]}>
                    BOOK NOW
                  </Text>
                </Pressable>
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default TruckBooking;

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
