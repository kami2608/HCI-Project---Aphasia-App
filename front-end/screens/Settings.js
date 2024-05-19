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
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import AntDesignIcon from "react-native-vector-icons/AntDesign";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import DateTimePicker from "@react-native-community/datetimepicker";
import { FIREBASE_AUTH, FIREBASE_DB } from "../firebaseConfig";
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import { ThemedButton } from "react-native-really-awesome-button";

export default function Settings() {
  const navigation = useNavigation();
  const auth = FIREBASE_AUTH;

  useEffect(() => {
    const fetchUserData = async () => {
      const userId = FIREBASE_AUTH.currentUser.email;
      try {
        const docRef = doc(FIREBASE_DB, "users", userId);
        const docSnapshot = await getDoc(docRef);
        if (docSnapshot.exists()) {
          const fetchedData = docSnapshot.data();
          setForm({
            ...fetchedData, // spread all properties of fetchedData
            email: auth.currentUser.email // ensure email is updated from the auth module
          });
        } else {
          console.log("No user data found!");
        }
      } catch (error) {
        console.error("Error fetching user data: ", error);
      }
    };

    fetchUserData();
  }, []);


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
    dob: "",
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
        await updateDoc(docRef, {
          name: name,
          phone: phone,
          dob: dob,
          address: address,
          yearOfStroke: yearOfStroke,
          emergencyPhone: emergencyPhone
        });

        const userId = FIREBASE_AUTH.currentUser.email; // This should dynamically set, perhaps passed via props or context.
        try {
          const docRef = doc(FIREBASE_DB, "users", userId);
          const docSnapshot = await getDoc(docRef);
          if (docSnapshot.exists) {
            alert("Chỉnh sửa thông tin thành công!");
            console.log("Data updated successfully!");
          } else {
            console.log("No user data found!");
          }
        } catch (error) {
          console.error("Error fetching user data: ", error);
        }

        navigation.navigate("Profile");
        
      } catch (error) {
        console.error("Error updating data: ", error);
      }
    };

    submit();
  };


  return (
    <>
      <View className="bg-white h-full w-full flex items-center">
        <StatusBar style="light" />
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

        {!isTextInputFocused && (
          <View className="w-full items-center -mt-16 pt-10">
            <Text style={{ fontSize: 40, fontWeight: 700 }}>Chỉnh sửa thông tin</Text>
          </View>
        )}

        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
          className="h-[80%] w-full flex justify-around mt-12"
        >
          <View className="flex items-center mx-10">
            <View className="bg-black/4 w-full mb-1 -mt-20 flex flex-row items-center">
              <AntDesignIcon name="idcard" size={30} color="black" />
              <Text className="text-lg"> Tôi có thể gọi bạn là: </Text>
            </View>
            <View style={{ width: '100%', backgroundColor: '#DBD9D940', padding: 10, borderRadius: 30, marginBottom: 10 }}>
              <TextInput
                className="text-lg"
                value={form.name}
                onChangeText={(value) => handleChange('name', value)}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </View>

            <View className="bg-black/4 w-full mb-1 flex flex-row items-center">
              <AntDesignIcon name="calendar" size={30} color="black" />
              <Text className="text-lg"> Ngày sinh: </Text>
            </View>
            <View style={{ width: '100%', backgroundColor: '#DBD9D940', padding: 10, borderRadius: 30, marginBottom: 10 }}>
              <TextInput
                className="text-lg"
                value={form.dob}
                onFocus={handleFocusDate}
                onBlur={handleBlurDate}
              />
              {show && (
                <DateTimePicker
                  value={getValidDate(form.dob)}
                  mode="date"
                  is24Hour={true}
                  display="inline"
                  onChange={onChange}
                  className="text-sm bg-black"
                />
              )}
            </View>

            <View className="bg-black/4 w-full mb-1 flex flex-row items-center">
              <MaterialIcons name="call" size={30} color="black" />
              <Text className="text-lg"> Số điện thoại của bạn: </Text>
            </View>
            <View style={{ width: '100%', backgroundColor: '#DBD9D940', padding: 10, borderRadius: 30, marginBottom: 10 }}>
              <TextInput
                className="text-lg"
                value={form.phone}
                onChangeText={(value) => handleChange('phone', value)}
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
            <View style={{ width: '100%', backgroundColor: '#DBD9D940', padding: 10, borderRadius: 30, marginBottom: 10 }}>
              <TextInput
                className="text-lg"
                value={form.emergencyPhone}
                onChangeText={(value) => handleChange('emergencyPhone', value)}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </View>

            <View className="bg-black/4 w-full mb-1 flex flex-row items-center">
              <FontAwesome name="home" size={30} color="black" />
              <Text className="text-lg"> Địa chỉ nhà: </Text>
            </View>
            <View style={{ width: '100%', backgroundColor: '#DBD9D940', padding: 10, borderRadius: 30, marginBottom: 10 }}>
              <TextInput
                className="text-lg"
                value={form.address}
                onChangeText={(value) => handleChange('address', value)}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </View>

            <View className="bg-black/4 w-full mb-1 flex flex-row items-center">
              <AntDesignIcon name="idcard" size={30} color="black" />
              <Text className="text-lg"> Thời gian bị bệnh: </Text>
            </View>
            <View style={{ width: '100%', backgroundColor: '#DBD9D940', padding: 10, borderRadius: 30, marginBottom: 10 }}>
              <TextInput
                className="text-lg"
                value={form.yearOfStroke}
                onChangeText={(value) => handleChange('yearOfStroke', value)}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </View>
            <ThemedButton name="bruce" type="primary"
              backgroundColor="#F19F58" backgroundDarker="#A74628"
              backgroundActive="#EBAC87" borderColor="#E3AF81"
              onPress={() => handleSubmit()}
              className="mx-auto my-2"
            >Chỉnh sửa</ThemedButton>
            <ThemedButton name="bruce" type="primary"
              backgroundColor="#F19F58" backgroundDarker="#A74628"
              backgroundActive="#EBAC87" borderColor="#E3AF81"
              onPress={() => navigation.navigate("Profile")}
              className="mx-auto my-2"
            >Hủy</ThemedButton>
          </View>

        </KeyboardAvoidingView>
      </View>

    </>
  );
}
