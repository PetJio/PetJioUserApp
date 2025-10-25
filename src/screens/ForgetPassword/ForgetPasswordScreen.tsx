import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../../navigation/StackNavigator/types";

type ForgetPasswordNavProp = NativeStackNavigationProp<
  AuthStackParamList,
  "ForgetPasswordScreen"
>;

const ForgetPasswordScreen = () => {
  const navigation = useNavigation<ForgetPasswordNavProp>();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendOTP = async () => {
    if (!email.trim()) {
      Alert.alert("Error", "Please enter your email address.");
      return;
    }

    try {
      setLoading(true);

   
      const response = await axios.post(
        "https://stage.petgeo.in/api/user/get-otp",
        { email }
      );

      console.log("OTP API RESPONSE:", response.data);

      
      if (response.data.statusCode === 200) {
        console.log("Navigating to OTP screen with:", email);

       
        navigation.navigate("OTPVerificationScreen", { email });

        setTimeout(() => {
          Alert.alert("Success", "OTP sent successfully to your email.");
        }, 300);
      } else {
        Alert.alert("Failed", response.data.message || "Unable to send OTP");
      }
    } catch (error: any) {
      console.error("Error sending OTP:", error);
      Alert.alert(
        "Error",
        error.response?.data?.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Forgot Password</Text>

      <Text style={styles.label}>Enter your registered email</Text>
      <TextInput
        style={styles.input}
        placeholder="Email address"
        placeholderTextColor="#888"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      <TouchableOpacity
        style={[styles.button, loading && { opacity: 0.7 }]}
        onPress={handleSendOTP}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Send OTP</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default ForgetPasswordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 25,
    justifyContent: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "600",
    color: "#222",
    marginBottom: 20,
    textAlign: "center",
  },
  label: {
    fontSize: 16,
    color: "#555",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    marginBottom: 20,
    color: "#000",
  },
  button: {
    backgroundColor: "#58B9D0",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
