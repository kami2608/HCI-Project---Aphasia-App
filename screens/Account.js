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
import React, { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/AntDesign";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function Account() {
  const navigation = useNavigation();

  // Format the date to dd/mm/yyyy
  const formatDate = (date) => {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const [isTextInputFocused, setTextInputFocused] = useState(false);

  const handleFocus = () => {
    setTextInputFocused(true);
  };

  const handleBlur = () => {
    setTextInputFocused(false);
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
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "white" }}
      behavior={Platform.OS === "ios" ? "padding" : null}
    >
      {!isTextInputFocused && (
        <View className="w-full items-center mt-12 pt-10">
          <Text style={{ fontSize: 40 }}>
            Cài đặt thông tin
          </Text>
        </View>
      )}
      <View className="w-full flex items-center">
        <StatusBar style="light" />

        <View className="pt-12 w-full flex justify-around">
          <View className="flex items-center mx-10">
            <View className="bg-black/4 w-full mb-1 flex flex-row items-center">
              <Icon name="idcard" size={30} color="black" />
              <Text className="text-lg"> Tôi có thể gọi bạn là: </Text>
            </View>
            <View className="bg-black/4 pl-5 pb-2 rounded-3xl w-full mb-1 border border-solid border-gray-400">
              <TextInput
                className="text-lg"
                placeholder="Nhập tên của bạn"
                placeholderTextColor="#CCCCCC"
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </View>

            <View className="bg-black/4 w-full mb-1 flex flex-row items-center">
              <Icon name="calendar" size={30} color="black" />
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
                placeholder="Nhập số điện thoại"
                placeholderTextColor="#CCCCCC"
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </View>

            <View className="bg-black/4 w-full mb-1 flex flex-row items-center">
              <MaterialCommunityIcons
                name="card-account-phone-outline"
                size={34}
                color="black"
              />
              <Text className="text-lg"> Số điện thoại người thân: </Text>
            </View>
            <View className="bg-black/4 pl-5 pb-2 rounded-3xl w-full mb-1 border border-solid border-gray-400">
              <TextInput
                className="text-lg"
                placeholder="Nhập số điện thoại"
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
                placeholder="VD: 144 Xuân Thủy, Cầu Giấy"
                placeholderTextColor="#CCCCCC"
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </View>

            <View className="bg-black/4 w-full mb-1 flex flex-row items-center">
              <Icon name="idcard" size={30} color="black" />
              <Text className="text-lg"> Thời gian bắt đầu bệnh: </Text>
            </View>
            <View className="bg-black/4 pl-5 pb-2 rounded-3xl w-full mb-1 border border-solid border-gray-400">
              <TextInput
                className="text-lg"
                placeholder="VD: 2024"
                placeholderTextColor="#CCCCCC"
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </View>

            <View>
              <TouchableOpacity
                className="w-full p-3 rounded-2xl  mt-5 border border-solid border-black flex flex-row items-center"
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
