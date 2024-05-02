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
import React, { useState } from "react";
import Icon from "react-native-vector-icons/AntDesign";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { DatePickerIOSComponent } from "react-native";

export default function Emergency() {
  const navigation = useNavigation();

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "white" }}
      behavior={Platform.OS === "ios" ? "padding" : null}
    >
      <View className="bg-white h-full flex items-center">
        {/* <StatusBar style="light"/> */}

        <View className="h-[10%] bg-white rounded-xl ml-5 mr-auto mt-12">
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Flashcard");
            }}
            className="items-start justify-center"
          >
            <Icon name="left" size={50} color="black" />
            <Text className="text-sm text-black text-center">Quay lại</Text>
          </TouchableOpacity>
        </View>


        <View className="h-[60%] w-full flex justify-around">
          <View className="flex items-center mx-10 space-y-0.2">
            <View className="bg-black/4 w-full mb-2 flex flex-row items-center">
              <MaterialIcons name="call" size={34} color="black" />
              <Text className="text-2xl"> Số điện thoại người thân: </Text>
            </View>
            <View className="bg-black/4 p-2 rounded-3xl w-full mb-4 border border-solid border-gray-400">
              <TextInput
                className="text-xl"
                placeholder="0868809172"
                placeholderTextColor="#DA1919"
                readOnly
              />
            </View>

            <View className="bg-black/4 w-full mb-2 flex flex-row items-center">
              <FontAwesome name="home" size={34} color="black" />
              <Text className="text-2xl"> Địa chỉ nhà: </Text>
            </View>
            <View className="bg-black/4 p-2 rounded-3xl w-full mb-4 border border-solid border-gray-400">
              <TextInput
                className="text-xl"
                placeholder="144 Xuân Thủy, Cầu Giấy"
                placeholderTextColor="#DA1919"
                readOnly
              />
            </View>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
