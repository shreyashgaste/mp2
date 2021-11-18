import React, { useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Pressable,
  ImageBackground,
  Animated,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
export default function Start() {
  
  return (
    <View style={styles.container}>
      <View style={styles.backgroundContainer}>
        <ImageBackground
          style={styles.bakcgroundImage}
          source={require("../assets/images/menu-bg.jpeg")}
        >
            <View></View>
          <Image
          style={styles.middleImage}
          source={require("../assets/images/truckHome.jpg")}
        ></Image>
            
     

          <Pressable
            style={styles.buttonBig}
            android_ripple={{ color: "grey" }}
            onPress={fadeIn}
          >
            <Text style={styles.text}>Get Started</Text>
            <AntDesign name="right" size={28} color="black" />
          </Pressable>
        </ImageBackground>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  
  backgroundContainer: {
    flex: 1,
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    flexDirection: "column",
  },
  bakcgroundImage: {
    flex: 1,
    width: null,
    height: null,
  },
  middleImage: {
    alignSelf: "center",
    height: 200,
    width: 200,
    marginTop: 250,
    borderRadius: 15,
    borderColor: "grey",
    borderWidth: 2,
  },
  buttonBig: {
    width: "80%",
    alignItems: "center",
    alignSelf: "center",
    marginTop: 50,
    padding: 15,
    backgroundColor: "#f7f9a8",
    borderRadius: 8,
    flexDirection: "row",
  },
  text: {
    justifyContent: "center",
    fontSize: 20,
    marginRight: 50,
    marginLeft: 50,
  },
});
