import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import Contact from "../Common/Contact";
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
  
  
import { CustomerHistory } from "./CustomerHistory";

const Pay = () => {
//   const componentRef = useRef();
//   const handlePrint = useReactToPrint({
//     content: () => componentRef.current,
//   });

  return (
    <View style={styles.container}>
      
      <Pressable
        style={[{ backgroundColor: "#007bff" }, styles.button]}
        onPress={handlePrint}
        android_ripple={{ color: "grey" }}
      >
        <Text style={[{ color: "white" }, styles.buttonText]}>LOGIN</Text>
      </Pressable>
      {/* <Contact ref={componentRef} /> */}
    </View>
  );
};

export default Pay;

const styles = StyleSheet.create({
    container: {
      padding: 20,
      backgroundColor: "#f7f1d5",
      marginTop: 30,
      marginBottom: 30
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
      borderRadius: 8
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
      alignSelf: 'center'
    }
  });
  