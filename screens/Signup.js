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
import React from "react";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";

export default function Signup() {
  const navigation = useNavigation();
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
              />
            </View>
            <View className="bg-black/4 p-3 rounded-2xl w-full border border-solid border-gray-400">
              <TextInput
                className="text-xl"
                placeholder="Mật khẩu"
                placeholderTextColor="#CCCCCC"
                secureTextEntry
              />
            </View>
            <View className="bg-black/4 p-3 rounded-2xl w-full mb-3 border border-solid border-gray-400">
              <TextInput
                className="text-xl"
                placeholder="Nhập lại mật khẩu"
                placeholderTextColor="#CCCCCC"
                secureTextEntry
              />
            </View>
            <View>
              <TouchableOpacity
                className="w-full bg-sky-400 p-3 rounded-2xl mb-2 mt-4 border border-solid border-sky-700"
                onPress={() => navigation.navigate("Account")}
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
