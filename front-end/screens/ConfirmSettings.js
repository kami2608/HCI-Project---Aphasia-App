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

import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import { FIREBASE_AUTH, FIREBASE_DB } from "../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

export default function ConfirmSettings() {
  const navigation = useNavigation();
  const [userData, setUserData] = useState(null);
  
  useEffect(() => {
    const fetchUserData = async () => {
      const userId = FIREBASE_AUTH.currentUser.email; // This should dynamically set, perhaps passed via props or context.
      try {
        const docRef = doc(FIREBASE_DB, "users", userId);
        const docSnapshot = await getDoc(docRef);
        if (docSnapshot.exists) {
          setUserData(docSnapshot.data());
        } else {
          console.log("No user data found!");
        }
      } catch (error) {
        console.error("Error fetching user data: ", error);
      }
    };

    fetchUserData();
  }, []);

  if (!userData) {
    return <Text>Loading...</Text>; 
  }

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
            navigation.navigate("Profile");
          }}
          className="items-start justify-center"
        >
          <AntDesignIcon name="left" size={38} color="black" />
          <Text className="text-sm text-black text-center">Quay lại</Text>
        </TouchableOpacity>
        </View>

        <View className="h-[6%] bg-black/4 w-full items-center mb-[-50]">
          <Text style={{ fontSize: 40 }}> Chỉnh sửa thông tin </Text>
        </View>

        <View className="h-[85%] w-full flex justify-around">
          <View className="flex items-center mx-10">
            <View className="bg-black/4 w-full mb-1 flex flex-row items-center">
              <AntDesignIcon name="idcard" size={30} color="black" />
              <Text className="text-lg"> Tôi có thể gọi bạn là: </Text>
            </View>
            <View className="bg-black/4 p-1 pl-5 rounded-3xl w-full mb-2 border border-solid border-gray-400">
              <TextInput
                className="text-lg"
                value={userData.name}
                placeholderTextColor="black"
                readOnly
              />
            </View>

            <View className="bg-black/4 w-full mb-1 flex flex-row items-center">
              <AntDesignIcon name="calendar" size={30} color="black" />
              <Text className="text-lg"> Ngày sinh: </Text>
            </View>
            <View className="bg-black/4 p-1 pl-5 rounded-3xl w-full mb-2 border border-solid border-gray-400">
              <TextInput
                className="text-lg"
                value={userData.dob}
                placeholderTextColor="black"
                readOnly
              />
            </View>

            <View className="bg-black/4 w-full mb-1 flex flex-row items-center">
              <MaterialIcons name="call" size={30} color="black" />
              <Text className="text-lg"> Số điện thoại của bạn: </Text>
            </View>
            <View className="bg-black/4 p-1 pl-5 rounded-3xl w-full mb-2 border border-solid border-gray-400">
              <TextInput
                className="text-lg"
                value={userData.phone}
                placeholderTextColor="black"
                readOnly
              />
            </View>

            <View className="bg-black/4 w-full mb-1 flex flex-row items-center">
              <MaterialCommunityIcons name="card-account-phone-outline" size={30} color="black" />
              <Text className="text-lg"> Số điện thoại người thân: </Text>
            </View>
            <View className="bg-black/4 p-1 pl-5 rounded-3xl w-full mb-2 border border-solid border-gray-400">
              <TextInput
                className="text-lg"
                value={userData.emergencyPhone}
                placeholderTextColor="black"
                readOnly
              />
            </View>

            <View className="bg-black/4 w-full mb-1 flex flex-row items-center">
              <FontAwesome name="home" size={30} color="black" />
              <Text className="text-lg"> Địa chỉ nhà: </Text>
            </View>
            <View className="bg-black/4 p-1 pl-5 rounded-3xl w-full mb-2 border border-solid border-gray-400">
              <TextInput
                className="text-lg"
                value={userData.address}
                placeholderTextColor="black"
                readOnly
              />
            </View>

            <View className="bg-black/4 w-full mb-1 flex flex-row items-center">
              <AntDesignIcon name="idcard" size={30} color="black" />
              <Text className="text-lg"> Thời gian bị bệnh: </Text>
            </View>
            <View className="bg-black/4 p-1 pl-5 rounded-3xl w-full mb-2 border border-solid border-gray-400">
              <TextInput
                className="text-lg"
                value={userData.yearOfStroke}
                placeholderTextColor="black"
                readOnly
              />
            </View>

            <View className="ml-auto mr-3 mt-5  bg-white rounded-xl flex-row justify-between items-center">
              <Text className="text-xl text-green-500 text-center">Chỉnh sửa thành công!</Text>
            </View>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
