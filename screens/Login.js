import {
  View,
  Text,
  TextInput,
  Touchable,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  useAnimatedValue,
} from "react-native";
import * as React from "react";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import { auth, db } from "../firebaseConfig";
import { useState } from "react";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false)

  const signIn = (email, password) => {
    setLoading(true);
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        navigation.navigate("Flashcard");
      })
      .catch((error) => {
        alert("Sai tài khoản hoặc mật khẩu");
      }.finally {
        setLoading(false)
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
                value={email}
                placeholder="Email"
                placeholderTextColor="#CCCCCC"
                onChangeText={setEmail}
              />
            </View>
            <View className="bg-black/4 p-3 rounded-2xl w-full mb-3 border border-solid border-gray-400">
              <TextInput
                className="text-xl"
                value={password}
                placeholder="Mật khẩu"
                placeholderTextColor="#CCCCCC"
                onChangeText={setPass}
                secureTextEntry
                onChangeText={(text) => setPassword(text)}
              />
            </View>
            <View>
              <TouchableOpacity
                className="w-full bg-sky-400 p-3 rounded-2xl mb-2 mt-4 border border-solid border-sky-700"
                onPress={() => signIn(email, password)}
              >
                <Text className="text-xl font-bold text-white text-center">
                  Đăng nhập
                </Text>
              </TouchableOpacity>
            </View>
            <View className="flex-row justify-center">
              <Text className="text-lg">Bạn chưa có tài khoản? </Text>
              <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
                <Text className="text-sky-600 text-lg">Đăng ký</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Login;
