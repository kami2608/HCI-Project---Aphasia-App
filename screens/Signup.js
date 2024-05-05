import {
  View,
  Text,
  TextInput,
  Touchable,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { auth } from "../firebaseConfig";
import { useNavigation } from "@react-navigation/native";
import { createUserWithEmailAndPassword } from "firebase/auth";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const [loading, setLoading] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");

  const checkPasswords = async (password, confirmPassword) => {
    setLoading(true);
    if (password !== confirmPassword) {
      alert("Mật khẩu không khớp!");
      setLoading(false);
      return;
    } else {
      try {
        console.log(email, ": ", password)
        await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        navigation.navigate("Account");
      } catch (error) {
        console.log(error);
        alert("Sign up failed: " + error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "white" }}
      behavior={Platform.OS === "ios" ? "padding" : null}
    >
      <View className="bg-white h-full w-full flex items-center">
        {/* <StatusBar style="light"/> */}
        <Image
          className="h-[37%] w-full absolute left-0 right-0 mx-auto object-cover mt-[60]"
          source={{
            uri: "https://www.houstonent.com/hubfs/blog%20images/Aphasia1.jpg",
          }}
          resizeMode="contain"
        />

        <View className="h-full w-full flex justify-around">
          <View className="flex items-center mx-10 mt-[350] space-y-3">
            <View className="bg-black/4 p-3 rounded-2xl w-full border border-solid border-gray-400">
              <TextInput
                className="text-xl"
                value={email}
                placeholder="Email"
                placeholderTextColor="#CCCCCC"
              />
            </View>
            <View className="bg-black/4 p-3 rounded-2xl w-full border border-solid border-gray-400">
              <TextInput
                className="text-xl"
                onChangeText={setPass}
                value={password}
                placeholder="Mật khẩu"
                secureTextEntry={true}
                keyboardType="default"
                autoCapitalize="none"
                autoComplete="false"
                onChangeText={(text) => setPassword(text)}
              />
            </View>
            <View className="bg-black/4 p-3 rounded-2xl w-full mb-3 border border-solid border-gray-400">
              <TextInput
                className="text-xl"
                onChangeText={setPass}
                value={password}
                placeholder="Nhập lại mật khẩu"
                secureTextEntry={true}
                keyboardType="default"
                autoCapitalize="none"
                autoComplete="false"
                onChangeText={(text) => setConfirmPassword(text)}
              />
            </View>
            <View>
              <TouchableOpacity
                className="w-full bg-sky-400 p-3 rounded-2xl mb-2 mt-4 border border-solid border-sky-700"
                onPress={() => checkPasswords(password, confirmPassword)}
              >
                <Text className="text-xl font-bold text-white text-center">
                  Đăng ký
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
