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
import { auth, db } from '../firebaseConfig';
import { ref, set } from "firebase/database";
import { doc, setDoc, collection, addDoc } from "firebase/firestore";
import axios from "axios";


export default function Account() {
  const navigation = useNavigation();

  // Format the date to dd/mm/yyyy
  const formatDate = (date) => {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const getValidDate = (dateString) => {
    const parts = dateString.split("/");
    if (parts.length === 3) {
      const day = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1; // JS months start at 0
      const year = parseInt(parts[2], 10);
      const date = new Date(year, month, day);
      if (!isNaN(date)) {
        return date;
      }
    }
    return new Date(); // return current date if parsing fails
  };

  const defaultForm = {
    name: "",
    email: auth.currentUser.email,
    phone: "",
    address: "",
    dob: formatDate(new Date()),
    yearOfStroke: "",
    emergencyPhone: "",
  };

  const [form, setForm] = useState(defaultForm);
  const [isTextInputFocused, setTextInputFocused] = useState(false);
  const [show, setShow] = useState(false);

  const handleFocus = () => setTextInputFocused(true);
  const handleBlur = () => setTextInputFocused(false);

  const handleChange = (name, value) => {
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleFocusDate = () => {
    setTextInputFocused(true);
    setShow(true);
  };

  const handleBlurDate = () => {
    setTextInputFocused(false);
    setShow(false);
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || getValidDate(form.dob);
    setShow(Platform.OS === "ios"); // Keep the picker open on iOS even after selection.
    handleChange("dob", formatDate(currentDate));
  };

  const handleSubmit = () => {
    const submit = async () => {
      const { name, phone, dob, address, yearOfStroke, emergencyPhone, email } = form;

      if (!name || !phone || !dob || !address || !yearOfStroke || !emergencyPhone || !email) {
        alert("Vui lòng điền đầy đủ các mục!");
        return;
      }

      try {
        const docRef = doc(FIREBASE_DB, "users", email);
        await setDoc(docRef, form);
        navigation.navigate("Flashcard");
        console.log("Saving data successfully!");
      } catch (error) {
        console.error("Error saving data: ", error);
      }
    };

    submit();
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "white" }}
      behavior={Platform.OS === "ios" ? "padding" : null}
    >
      {!isTextInputFocused && (
        <View className="w-full items-center mt-12 pt-10">
          <Text style={{ fontSize: 40 }}>Cài đặt thông tin</Text>
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
                value={form.name}
                onChangeText={(value) => handleChange('name', value)}
                placeholder="Nhập tên của bạn"
                placeholderTextColor="#CCCCCC"
                onFocus={handleFocus}
                onBlur={handleBlur}
                onChangeText={(text) => setName(text)}
              />
            </View>

            <View className="bg-black/4 w-full mb-1 flex flex-row items-center">
              <Icon name="calendar" size={30} color="black" />
              <Text className="text-lg"> Ngày sinh: </Text>
            </View>
            <View className="bg-black/4 pl-5 pb-2 rounded-3xl w-full mb-1 border border-solid border-gray-400">
              <TextInput
                className="text-lg"
                value={form.dob}
                onFocus={handleFocusDate}
                onBlur={handleBlurDate}
                placeholder="dd/mm/yyyy"
                placeholderTextColor="#CCCCCC"
                // editable={false}
              />
              {show && (
                <DateTimePicker
                value={getValidDate(form.dob)}
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
                value={form.phone}
                onChangeText={(value) => handleChange('phone', value)}
                placeholder="Nhập số điện thoại"
                placeholderTextColor="#CCCCCC"
                onFocus={handleFocus}
                onBlur={handleBlur}
                onChangeText={(text) => setPhone(text)}
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
                value={form.emergencyPhone}
                onChangeText={(value) => handleChange('emergencyPhone', value)}
                placeholder="Nhập số điện thoại"
                placeholderTextColor="#CCCCCC"
                onFocus={handleFocus}
                onBlur={handleBlur}
                onChangeText={(text) => setRelativePhone(text)}
              />
            </View>

            <View className="bg-black/4 w-full mb-1 flex flex-row items-center">
              <FontAwesome name="home" size={30} color="black" />
              <Text className="text-lg"> Địa chỉ nhà: </Text>
            </View>
            <View className="bg-black/4 pl-5 pb-2 rounded-3xl w-full mb-1 border border-solid border-gray-400">
              <TextInput
                className="text-lg"
                value={form.address}
                onChangeText={(value) => handleChange('address', value)}
                placeholder="VD: 144 Xuân Thủy, Cầu Giấy"
                placeholderTextColor="#CCCCCC"
                onFocus={handleFocus}
                onBlur={handleBlur}
                onChangeText={(text) => setAddress(text)}
              />
              


            </View>

            <View className="bg-black/4 w-full mb-1 flex flex-row items-center">
              <Icon name="idcard" size={30} color="black" />
              <Text className="text-lg"> Thời gian bắt đầu bệnh: </Text>
            </View>
            <View className="bg-black/4 pl-5 pb-2 rounded-3xl w-full mb-1 border border-solid border-gray-400">
              <TextInput
                className="text-lg"
                value={form.yearOfStroke}
                onChangeText={(value) => handleChange('yearOfStroke', value)}
                placeholder="VD: 2024"
                placeholderTextColor="#CCCCCC"
                onFocus={handleFocus}
                onBlur={handleBlur}
                onChangeText={(text) => setStartYear(text)}
              />
            </View>

            <View>
              <TouchableOpacity
                className="w-full p-3 rounded-2xl  mt-5 border border-solid border-black flex flex-row items-center"
                onPress={() => {
                  handleSubmit();
                }}
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
