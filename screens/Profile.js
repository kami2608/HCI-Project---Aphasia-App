import {
  View,
  Text,
  TextInput,
  Touchable,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  Button,
} from "react-native";
import React from "react";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import AntDesignIcon from "react-native-vector-icons/AntDesign";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";

export default function Profile() {
  const navigation = useNavigation();
  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "white" }}
      behavior={Platform.OS === "ios" ? "padding" : null}
    >
      <View className="bg-white h-full w-full flex items-center">
        {/* <StatusBar style="light"/> */}
        <View className="h-[10%] bg-white rounded-xl ml-5 mr-auto mt-12">
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Flashcard");
            }}
            className="items-start justify-center"
          >
            <AntDesignIcon name="left" size={50} color="black" />
            <Text className="text-sm text-black text-center">Quay lại</Text>
          </TouchableOpacity>
        </View>

        <View className="w-[90%] h-[70%] bg-orange-400 rounded-3xl items-center mt-5 flex">

          <View className="h-[20%] flex flex-row items-center mt-5 border-b-2 border-gray-200">
            <AntDesignIcon name="idcard" size={70} color="black" />
            <View className="flex ml-2">
              <Text className="text-white text-3xl font-bold">
                Nguyễn Văn A
              </Text>
              <Text className="text-white text-lg">6 năm với Aphasia</Text>
            </View>
          </View>

          <View className="flex ml-10 mt-10 mr-auto">
              <View className="bg-black/4 w-full mb-1 flex flex-row items-center">
                <FontAwesome name="birthday-cake" size={35} color="black" />
                <Text className="text-2xl text-white ml-1"> 01/12/2000 </Text>
              </View>
            </View>

            <View className="flex ml-10 mt-2 mr-auto">
              <View className="bg-black/4 w-full mb-1 flex flex-row items-center">
                <Ionicons name="call" size={35} color="black" />
                <Text className="text-2xl text-white ml-1"> 0868809172 </Text>
              </View>
            </View>


            <View className="flex ml-10 mt-2 mr-auto">
              <View className="bg-black/4 w-full mb-1 flex flex-row items-center">
              <MaterialCommunityIcons name="card-account-phone-outline" size={35} color="black" />
                <Text className="text-2xl text-white ml-1"> 0578643246 </Text>
              </View>
            </View>

            <View className="flex ml-10 mt-2 mb-5 mr-auto">
              <View className="bg-black/4 w-full mb-1 flex flex-row items-center">
              <Ionicons name="location" size={35} color="black" />
                <Text className="text-2xl text-white ml-1"> Số 1, Đồng Tâm, Hai Bà Trưng, Hà Nội </Text>
              </View>
            </View>

            <View className="ml-auto mr-10">
              <TouchableOpacity
                className="p-4 rounded-2xl mt-12  flex flex-row items-center bg-white"
                onPress={() => navigation.navigate("Settings")}
              >
                <FontAwesome name="edit" size={35} color="black" />
                <Text className="text-xl text-black text-center font-bold ml-2">
                  Chỉnh sửa
                </Text>
              </TouchableOpacity>
            </View>

        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
