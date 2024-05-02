import {
  View,
  Text,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React from "react";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import AntDesignIcon from "react-native-vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";

export default function Welcome() {
  const navigation = useNavigation();
  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "white" }}
      behavior={Platform.OS === "ios" ? "padding" : null}
    >
      <View className="bg-white h-full w-full flex items-center">
        {/* <StatusBar style="light"/> */}
        <Image
          className="h-[35%] w-full absolute left-0 right-0 mx-auto object-cover mt-[60]"
          source={{
            uri: "https://www.umt.edu.vn/vi-vn/images/resize-770x0/upload/media/M64338e6e9a351/ky-nang-giao-tiep.png?v=1.31",
          }}
          //   resizeMode="contain"
        />

        <View className="h-full w-full flex justify-around">
          <View className="flex items-center mx-10 mt-[300] space-y-3">
            <View className="bg-black/4 w-full mb-2">
              <Text style={{ fontSize: 75 }}> Aphasia </Text>
            </View>
            <View className="ml-auto mr-2 mb-3">
              <MaterialIcon name="waving-hand" size={90} color="black" />
            </View>
            <View className="bg-black/4 w-full mb-2">
              <Text style={{ fontSize: 25 }}>Cảm ơn bạn đã lựa chọn!</Text>
            </View>
            <View className="ml-auto mr-3">
              <TouchableOpacity
                className="w-full  p-3 mt-4 flex flex-col items-center"
                onPress={() => navigation.navigate("Flashcard")}
              >
                <AntDesignIcon name="right" size={55} color="black" />
                <Text className="text-xl text-black text-center">
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
