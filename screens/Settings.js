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
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import AntDesignIcon from "react-native-vector-icons/AntDesign";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import DateTimePicker from "@react-native-community/datetimepicker";

import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";

export default function Settings() {
  const navigation = useNavigation();
  const [isTextInputFocused, setTextInputFocused] = useState(false);

  const handleFocus = () => {
    setTextInputFocused(true);
  };

  const handleBlur = () => {
    setTextInputFocused(false);
  };

  // Format the date to dd/mm/yyyy
  const formatDate = (date) => {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date());

  const handleFocusDate = () => {
    setTextInputFocused(true);
    setShow(true);
  };

  const handleBlurDate = () => {
    setTextInputFocused(false);
    setShow(false);
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios"); // Keep the picker open on iOS even after selection.
    setDate(currentDate);
  };

  return (
    <View className="bg-white h-full w-full flex items-center">
      <StatusBar style="light"/>
      <View className="h-[10%] bg-white rounded-xl ml-5 mr-auto mt-12">
        {!isTextInputFocused && (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Profile");
            }}
            className="items-start justify-center"
          >
            <AntDesignIcon name="left" size={38} color="black" />
            <Text className="text-sm text-black text-center">Quay lại</Text>
          </TouchableOpacity>
        )}
      </View>

      <View className="h-[6%] bg-black/4 w-full items-center mb-[-50]">
        <Text style={{ fontSize: 40 }}>
          {isTextInputFocused ? "" : "Chỉnh sửa thông tin"}
        </Text>
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
        className="h-[80%] w-full flex justify-around mt-12"
      >
        <View className="flex items-center mx-10">
          <View className="bg-black/4 w-full mb-1 flex flex-row items-center">
            <AntDesignIcon name="idcard" size={30} color="black" />
            <Text className="text-lg"> Tôi có thể gọi bạn là: </Text>
          </View>
          <View className="bg-black/4 pl-5 pb-2 rounded-3xl w-full mb-1 border border-solid border-gray-400">
            <TextInput
              className="text-lg"
              placeholder="Nguyễn Văn A"
              placeholderTextColor="#CCCCCC"
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </View>

          <View className="bg-black/4 w-full mb-1 flex flex-row items-center">
            <AntDesignIcon name="calendar" size={30} color="black" />
            <Text className="text-lg"> Ngày sinh: </Text>
          </View>
          <View className="bg-black/4 pl-5 pb-2 rounded-3xl w-full mb-1 border border-solid border-gray-400">
            <TextInput
              className="text-lg"
              value={formatDate(date)}
              placeholder="dd/mm/yyyy"
              placeholderTextColor="#CCCCCC"
              onFocus={handleFocusDate}
              onBlur={handleBlurDate}
            />
            {show && (
              <DateTimePicker
                value={date}
                mode="date"
                is24Hour={true}
                display="inline"
                onChange={onChange}
                className= "text-sm bg-black"
              />
            )}
          </View>

          <View className="bg-black/4 w-full mb-1 flex flex-row items-center">
            <MaterialIcons name="call" size={30} color="black" />
            <Text className="text-lg"> Số điện thoại của bạn: </Text>
          </View>
          <View className="bg-black/4 pl-5 pb-2 rounded-3xl w-full mb-1 border border-solid border-gray-400">
            <TextInput
              className="text-lg"
              placeholder="0868809172"
              placeholderTextColor="#CCCCCC"
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </View>

          <View className="bg-black/4 w-full mb-1 flex flex-row items-center">
            <MaterialCommunityIcons
              name="card-account-phone-outline"
              size={30}
              color="black"
            />
            <Text className="text-lg"> Số điện thoại người thân: </Text>
          </View>
          <View className="bg-black/4 pl-5 pb-2 rounded-3xl w-full mb-1 border border-solid border-gray-400">
            <TextInput
              className="text-lg"
              placeholder="0578643246"
              placeholderTextColor="#CCCCCC"
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </View>

          <View className="bg-black/4 w-full mb-1 flex flex-row items-center">
            <FontAwesome name="home" size={30} color="black" />
            <Text className="text-lg"> Địa chỉ nhà: </Text>
          </View>
          <View className="bg-black/4 pl-5 pb-2 rounded-3xl w-full mb-1 border border-solid border-gray-400">
            <TextInput
              className="text-lg"
              placeholder="144 Xuân Thủy, Cầu Giấy"
              placeholderTextColor="#CCCCCC"
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </View>

          <View className="bg-black/4 w-full mb-1 flex flex-row items-center">
            <AntDesignIcon name="idcard" size={30} color="black" />
            <Text className="text-lg"> Thời gian bị bệnh: </Text>
          </View>
          <View className="bg-black/4 pl-5 pb-2 rounded-3xl w-full mb-1 border border-solid border-gray-400">
            <TextInput
              className="text-lg"
              placeholder="2024"
              placeholderTextColor="#CCCCCC"
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </View>
        </View>
      </KeyboardAvoidingView>

      <View className=" h-[15%] w-[80%]  bg-white rounded-xl flex-row justify-between items-center">
        <TouchableOpacity
          className=" w-[39%] p-3 rounded-2xl mb-5 border border-solid border-black items-center"
          onPress={() => navigation.navigate("ConfirmSettings")}
        >
          <Text className="text-xl text-black text-center">Chỉnh sửa</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="w-[39%] p-3 rounded-2xl mb-5 border border-solid border-black items-center"
          onPress={() => {
            navigation.navigate("Profile");
          }}
        >
          <Text className="text-xl text-black text-center">Hủy</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
