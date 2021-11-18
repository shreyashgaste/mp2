import React, { useRef } from "react";
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
import emailjs from "emailjs-com";
import email from "react-native-email";
const Contact = ({ navigation }) => {
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_h8fgo0w', 'template_08iosfs', e.target, 'user_rc4mZDeOcp0lvQEEl8EC7')
      .then((result) => {
          window.alert('Your message has been sent!');
      }, (error) => {
          console.log(error.text);
      });
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <View>
            <Text style={styles.heading}>Contact Us</Text>
          </View>
          <Formik
            initialValues={{ userName: "", email: "", message: "" }}
            onSubmit={(values) => sendEmail(values)}
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
                  placeholder="Name"
                  value={values.userName}
                  onChangeText={handleChange("userName")}
                />
                <TextInput
                  style={[{ height: 40 }, styles.input]}
                  placeholder="E-mail"
                  value={values.email}
                  onChangeText={handleChange("email")}
                />
                <TextInput
                  style={[{ height: 80 }, styles.input]}
                  placeholder="Message"
                  value={values.message}
                  onChangeText={handleChange("message")}
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
              </View>
            )}
          </Formik>
          <View>
            <Text style={styles.heading}>Address</Text>
            <Text style={styles.text}>
              1632 Main Street New York, 94126 United States
            </Text>
            <Text style={styles.heading}>Phone</Text>
            <Text style={styles.text}>+ 01 234 567 89</Text>
            <Text style={styles.heading}>E-mail</Text>
            <Text style={styles.text}>info@gmail.com</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Contact;

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
