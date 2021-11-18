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
} from "react-native";
const Register = ({ navigation }) => {
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <View>
            <Text style={styles.heading}>Start your journey</Text>
          </View>
          <View style={styles.line} />
          <View>
            <Text style={styles.text}>Register Here for more services.</Text>
            <View style={styles.buttons}>
              <Pressable
                style={styles.bigButton}
                onPress={() => {navigation.navigate("CustomerSignup")}}
                android_ripple={{ color: "black" }}
              >
                <Text style={styles.bigButtonText}>As a Customer</Text>
                <Text style={{ textAlign: "center" }}>
                  You can book truck of your choice and many more.
                </Text>
              </Pressable>
              <Pressable
                style={styles.bigButton}
                onPress={() => navigation.navigate("TransporterSignup")}
                android_ripple={{ color: "black" }}
              >
                <Text style={styles.bigButtonText}>As a Transporter</Text>
                <Text style={{ textAlign: "center" }}>
                  You can grow your business with us.
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Register;

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
