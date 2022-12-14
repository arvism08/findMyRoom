import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { TextInput, Button } from "react-native-paper";
import { auth } from "../firebase";
import validator from "email-validator";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { Context } from "../Context";

const LoginScreen = ({ navigation }) => {
  const { pin, setPin,
    isAdmin, setisAdmin} = React.useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const userLogin = async () => {
    if (!email || !password) {
      Alert.alert("Please Enter All The Fields");
      return;
    }
    if (validator.validate(email) == false) {
      Alert.alert("Please Enter Valid Email Address");
      return;
    }

    try {
      const result = await auth.signInWithEmailAndPassword(email, password);
      console.log("Logged In");
      console.log(result.user.email);
    } catch (err) {
      Alert.alert("Invalid Credentials, Try Again");
      console.log(err);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{
        height: "100%",
        backgroundColor: "#DDE2E5",
      }}
      behavior="position"
    >
      <View style={styles.box1}>
        <Image
          style={{ width: 250, height: 250 }}
          source={require("../assets/home.png")}
        />
        <Text style={styles.text}>Please Login To Continue!</Text>
      </View>
      <View style={styles.box2}>
        <TextInput
          styles={styles.textInputStyle}
          label="Email"
          value={email}
          mode="outlined"
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          label="Password"
          value={password}
          mode="outlined"
          secureTextEntry={true}
          onChangeText={(text) => setPassword(text)}
        />
        <Button
          style={{ marginVertical: 10 }}
          mode="contained"
          onPress={() => userLogin()}
        >
          Login
        </Button>
        <BouncyCheckbox
          size={20}
          fillColor="#74858C"
          unfillColor="#FFFFFF"
          iconStyle={{ borderColor: "#74858C" }}
          innerIconStyle={{ borderWidth: 2 }}
          textStyle={{
            fontSize: 15,
            color: "black",
            textDecorationLine: "none",
          }}
          style={{ marginRight: 20, marginTop: 14, alignSelf: "center" }}
          isChecked={isAdmin}
          text="Are you a Hostel Owner?"
          disableBuiltInState
          onPress={() => setisAdmin(!isAdmin)}
        />
        <TouchableOpacity
          style={{ marginTop: 50 }}
          onPress={() => navigation.navigate("signup")}
        >
          <Text style={{ textAlign: "center" }}>Dont have an account ?</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  box1: {
    alignItems: "center",
  },
  box2: {
    paddingHorizontal: 15,
    height: "50%",
    justifyContent: "space-evenly",
    marginHorizontal: 20,
    marginVertical: 30,
  },
  text: {
    fontSize: 22,
  },
});

export default LoginScreen;
