import React, { useRef, useState } from "react";
import {
  View,
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";
import Results from "../components/Results";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome from "react-native-vector-icons/FontAwesome";

export default function Sentences() {
  const navigation = useNavigation();
  const images = [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8VxJ2zqWiWC5PQz-6ChPiaefrAacJx-4mh6NMPNqg0g&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8VxJ2zqWiWC5PQz-6ChPiaefrAacJx-4mh6NMPNqg0g&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8VxJ2zqWiWC5PQz-6ChPiaefrAacJx-4mh6NMPNqg0g&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8VxJ2zqWiWC5PQz-6ChPiaefrAacJx-4mh6NMPNqg0g&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8VxJ2zqWiWC5PQz-6ChPiaefrAacJx-4mh6NMPNqg0g&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8VxJ2zqWiWC5PQz-6ChPiaefrAacJx-4mh6NMPNqg0g&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8VxJ2zqWiWC5PQz-6ChPiaefrAacJx-4mh6NMPNqg0g&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8VxJ2zqWiWC5PQz-6ChPiaefrAacJx-4mh6NMPNqg0g&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8VxJ2zqWiWC5PQz-6ChPiaefrAacJx-4mh6NMPNqg0g&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8VxJ2zqWiWC5PQz-6ChPiaefrAacJx-4mh6NMPNqg0g&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8VxJ2zqWiWC5PQz-6ChPiaefrAacJx-4mh6NMPNqg0g&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8VxJ2zqWiWC5PQz-6ChPiaefrAacJx-4mh6NMPNqg0g&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8VxJ2zqWiWC5PQz-6ChPiaefrAacJx-4mh6NMPNqg0g&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8VxJ2zqWiWC5PQz-6ChPiaefrAacJx-4mh6NMPNqg0g&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8VxJ2zqWiWC5PQz-6ChPiaefrAacJx-4mh6NMPNqg0g&s",
  ];
  const scrollViewRef = useRef();
  // state chon topic nao
  const [selectedTopic, setSelectedTopic] = useState(0);
  return (
    <SafeAreaView className="flex-1">
      {/* <StatusBar style="light" /> */}

      <View className="w-full h-[6%] bg-white rounded-xl">
        <View className="ml-auto mr-3 ">
          <TouchableOpacity
            className="w-full p-1 flex flex-column items-center"
            onPress={() => navigation.navigate("Login")}
          >
            <Icon name="settings" size={25} color="black" />
            <Text className="text-xs text-black text-center">Cài đặt</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Phần 2 */}
      <View className="w-full h-[30%] flex flex-col items-center bg-orange-400 px-2 py-3">
        <View className="w-[90%] h-[30%] bg-gray-300 my-2 rounded-full my-12" />
        <View className="w-full flex-1 flex flex-row justify-between items-end px-4 pb-2">
          <TouchableOpacity
            onPress={() => {
              console.log("Xóa");
            }}
            className="items-center"
          >
            <AntDesign name="delete" size={30} color="black" />
            <Text className="text-sm text-black text-center">Xóa</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              console.log("Phát");
            }}
            className="items-center"
          >
            <FontAwesome name="volume-up" size={30} color="black" />
            <Text className="text-sm text-black text-center">Phát</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Phan 3 */}
      <View className="w-full h-[34%] bg-white">
        <ScrollView
          className="flex-1"
          vertical
          showsVerticalScrollIndicator={false}
        >
          {images.map((imageUri, index) => (
            <View key={index} className="p-2 pl-5 pr-5">
              <Image
                source={{ uri: imageUri }}
                className="h-[55] w-full rounded-3xl" 
                resizeMode="cover"
              />
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Phan 4 */}
      <View className="w-full h-[11%] flex flex-row items-center justify-between bg-white px-4 border-t-2 border-gray-300">
        <TouchableOpacity
          onPress={() => {
            if (selectedTopic > 0) {
              setSelectedTopic(selectedTopic - 1);
              scrollViewRef.current?.scrollTo({
                x: (selectedTopic - 1) * 90,
                animated: true,
              });
            }
          }}
          className="flex-1 items-start justify-center"
        >
          <AntDesign name="left" size={50} color="black" />
          <Text className="text-sm text-black text-center">Quay lại</Text>
        </TouchableOpacity>

        <View className="flex-3 items-center justify-center">
          <Text className="text-3xl text-black text-center">Thường dùng</Text>
        </View>

        <TouchableOpacity
          onPress={() => {
            if (selectedTopic < images.length - 2) {
              setSelectedTopic(selectedTopic + 1);
              scrollViewRef.current?.scrollTo({
                x: (selectedTopic + 1) * 90,
                animated: true,
              });
            }
          }}
          className="flex-1 items-end justify-center"
        >
          <AntDesign name="right" size={50} color="black" />
          <Text className="text-sm text-black text-center">Tiếp theo</Text>
        </TouchableOpacity>
      </View>

      {/* Phan 5 */}
      <View className="w-full h-[13%] bg-white flex-row">
        <TouchableOpacity
          className="w-[100] h-full"
          onPress={() => {
            navigation.navigate("Login");
          }}
        >
          <Image
            source={{
              uri: "https://upanh123.com/wp-content/uploads/2021/05/hinh-nen-mau-vang25.jpg",
            }}
            className="h-full w-full"
            resizeMode="cover"
          />
        </TouchableOpacity>
        <ScrollView
          horizontal
          ref={scrollViewRef}
          showsHorizontalScrollIndicator={false}
          className="flex-1 flex-row"
        >
          {images.slice(1).map((uri, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => setSelectedTopic(index)}
              className={`${
                selectedTopic === index ? "border-2 border-blue-400" : ""
              }`}
            >
              <Image
                source={{ uri: uri }}
                className="h-[100%] w-[100]"
                resizeMode="cover"
              />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
