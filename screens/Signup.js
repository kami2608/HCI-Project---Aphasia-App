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
import * as React from "react";
import { auth } from "../firebaseConfig";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigation = useNavigation();
  
  const checkPasswords = (password, confirmPassword) => {
    if (password != confirmPassword) {
      alert("Mật khẩu không khớp");
    } else {
      createUser(email, password);
    }
  }
  
  const createUser = (email, password) => {
    
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        navigation.navigate("Account");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  }

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
                placeholder="Email"
                placeholderTextColor="#CCCCCC"
                onChangeText={(text) => setEmail(text)}
              />
            </View>
            <View className="bg-black/4 p-3 rounded-2xl w-full border border-solid border-gray-400">
              <TextInput
                className="text-xl"
                placeholder="Mật khẩu"
                placeholderTextColor="#CCCCCC"
                secureTextEntry
                onChangeText={(text) => setPassword(text)}
              />
            </View>
            <View className="bg-black/4 p-3 rounded-2xl w-full mb-3 border border-solid border-gray-400">
              <TextInput
                className="text-xl"
                placeholder="Nhập lại mật khẩu"
                placeholderTextColor="#CCCCCC"
                secureTextEntry
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
