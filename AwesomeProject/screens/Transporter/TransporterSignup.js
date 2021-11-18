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
const API_URL = "http://192.168.104.39:5000";
const TransporterSignup = ({ navigation }) => {
  const handleSignup = async (values) => {
    if (values.email !== "") {
      var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (values.email.match(mailformat)) {
      } else {
        Alert.alert("You have entered an invalid email address!");
        return false;
      }
      if (values.password !== "") {
        var passwordFormat = /^[A-Za-z]\w{7,14}$/;
        if (values.password.match(passwordFormat)) {
        } else {
          Alert.alert(
            "Input Password and Submit [7 to 15 characters which contain only characters, numeric digits, underscore and first character must be a letter]"
          );
          return false;
        }
        if (values.password !== values.cpassword) {
          Alert.alert("Re-verify password");
          return false;
        }

        // if all values are correct, send data to backend
        const res = await fetch(`${API_URL}/registerTransporter`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: values.userName,
            email: values.email,
            phone: values.phone,
            company: values.company,
            password: values.password,
            cpassword: values.password,
            address: values.address
          }),
        })
          .then(async (res) => {
            const data = await res.json();
            console.log(data);
            if (data.error || !data) {
              Alert.alert("Invalid Registration");
            } else {
              Alert.alert("Success");
              navigation.navigate("TransporterSignin");
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  };
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <View>
            <Text style={styles.heading}>Get started free</Text>
            <Text style={styles.text}>
              Start to explore our product absolutely free
            </Text>
          </View>
          <Formik
            initialValues={{
              userName: "",
              email: "",
              phone: "",
              company: "",
              password: "",
              cpassword: "",
              gender: "",
              address: "",
            }}
            onSubmit={(values) => {
              // Alert.alert(JSON.stringify(values));
              handleSignup(values);
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
                  style={styles.input}
                  placeholder="Name"
                  value={values.userName}
                  onChangeText={handleChange("userName")}
                />
                <TextInput
                  style={styles.input}
                  placeholder="E-mail"
                  value={values.email}
                  onChangeText={handleChange("email")}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Phone"
                  value={values.phone}
                  onChangeText={handleChange("phone")}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Company"
                  value={values.company}
                  onChangeText={handleChange("company")}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Address"
                  value={values.address}
                  onChangeText={handleChange("address")}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Password"
                  secureTextEntry={true}
                  value={values.password}
                  onChangeText={handleChange("password")}
                  password="true"
                />
                <TextInput
                  style={styles.input}
                  placeholder="Confirm Password"
                  secureTextEntry={true}
                  value={values.cpassword}
                  onChangeText={handleChange("cpassword")}
                  password="true"
                />
                <TextInput
                  style={styles.input}
                  placeholder="Gender"
                  value={values.gender}
                  onChangeText={handleChange("gender")}
                />
                <Pressable
                  style={[{ backgroundColor: "#007bff" }, styles.button]}
                  onPress={handleSubmit}
                  android_ripple={{ color: "black" }}
                >
                  <Text style={[{ color: "white" }, styles.buttonText]}>
                    SIGNUP
                  </Text>
                </Pressable>
              </View>
            )}
          </Formik>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default TransporterSignup;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f7f1d5",
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
  input: {
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    height: 40,
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
    paddingBottom: 20,
  },
});
