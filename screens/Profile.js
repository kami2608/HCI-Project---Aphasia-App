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
import React, { useEffect, useState } from "react";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import AntDesignIcon from "react-native-vector-icons/AntDesign";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { StatusBar } from "expo-status-bar";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { FIREBASE_AUTH, FIREBASE_DB } from "../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

export default function Profile() {
  const navigation = useNavigation();
  const [userData, setUserData] = useState(null);
  const isFocused = useIsFocused();
  
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

    if (isFocused) {
      fetchUserData();
    }
  }, [isFocused]);

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
                {userData.name}
              </Text>
              <Text className="text-white text-lg">{2024 - userData.yearOfStroke} năm với Aphasia</Text>
            </View>
          </View>

          <View className="flex ml-10 mt-10 mr-auto">
              <View className="bg-black/4 w-full mb-1 flex flex-row items-center">
                <FontAwesome name="birthday-cake" size={35} color="black" />
                <Text className="text-2xl text-white ml-1"> {userData.dob} </Text>
              </View>
            </View>

            <View className="flex ml-10 mt-2 mr-auto">
              <View className="bg-black/4 w-full mb-1 flex flex-row items-center">
                <Ionicons name="call" size={35} color="black" />
                <Text className="text-2xl text-white ml-1"> {userData.phone} </Text>
              </View>
            </View>


            <View className="flex ml-10 mt-2 mr-auto">
              <View className="bg-black/4 w-full mb-1 flex flex-row items-center">
              <MaterialCommunityIcons name="card-account-phone-outline" size={35} color="black" />
                <Text className="text-2xl text-white ml-1"> {userData.emergencyPhone} </Text>
              </View>
            </View>

            <View className="flex ml-10 mt-2 mb-5 mr-auto">
              <View className="bg-black/4 w-full mb-1 flex flex-row items-center">
              <Ionicons name="location" size={35} color="black" />
                <Text className="text-2xl text-white ml-1"> {userData.address} </Text>
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
