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
import Icon from "react-native-vector-icons/AntDesign";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";

export default function Account() {
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
          <View className="flex items-center mx-10 mt-[300] space-y-3">
            <View className="bg-black/4 w-full mb-2">
              <Text className="text-2xl">Tôi có thể gọi bạn là: </Text>
            </View>
            <View className="bg-black/4 p-2 rounded-3xl w-full mb-4 border border-solid border-gray-400">
              <TextInput
                className="text-xl"
                placeholder="Tên người dùng"
                placeholderTextColor="#CCCCCC"
              />
            </View>
            <View>
              <TouchableOpacity
                className="w-full  p-3 rounded-2xl mb-2 mt-4 border border-solid border-black flex flex-row items-center"
                onPress={() => navigation.navigate("Flashcard")}
              >
                <Icon name="right" size={24} color="black" />
                <Text className="text-xl text-black text-center">
                  {" "}
                  Tiếp theo
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
