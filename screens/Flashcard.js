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

export default function Flashcard() {
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
      <View className=" w-full h-[35%] flex flex-col items-center bg-orange-400 px-2 py-3">
        <View className="w-full h-[48%] flex flex-row justify-items my-1">
          <TouchableOpacity
            onPress={() => {
              console.log("image 1");
            }}
            className="w-[30%] h-[90%] mx-1.5"
          >
            <Image
              source={{
                uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8VxJ2zqWiWC5PQz-6ChPiaefrAacJx-4mh6NMPNqg0g&s",
              }}
              className="rounded-3xl flex-1"
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              console.log("image 2");
            }}
            className="w-[30%] h-[90%] mx-1.5"
          >
            <Image
              source={{
                uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8VxJ2zqWiWC5PQz-6ChPiaefrAacJx-4mh6NMPNqg0g&s",
              }}
              className="rounded-3xl flex-1"
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              console.log("image 3");
            }}
            className="w-[30%] h-[90%] mx-1.5"
          >
            <Image
              source={{
                uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8VxJ2zqWiWC5PQz-6ChPiaefrAacJx-4mh6NMPNqg0g&s",
              }}
              className="rounded-3xl flex-1"
            />
          </TouchableOpacity>
        </View>

        {/* Hàng hình ảnh dưới cùng và các nút điều khiển */}
        <View className="w-full h-[48%] flex flex-row justify-between items-end">
          <TouchableOpacity className="p-2 ml-3 mb-3">
            <AntDesign name="delete" size={30} color="black" />
            <Text className="text-sm text-black text-center">Xóa</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              console.log("image 4");
            }}
            className="w-[30%] h-[90%] mx-1.5"
          >
            <Image
              source={{
                uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8VxJ2zqWiWC5PQz-6ChPiaefrAacJx-4mh6NMPNqg0g&s",
              }}
              // resizeMode="contain"
              className=" rounded-3xl flex-1"
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              console.log("image 5");
            }}
            className="w-[30%] h-[90%] mx-1.5"
          >
            <Image
              source={{
                uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8VxJ2zqWiWC5PQz-6ChPiaefrAacJx-4mh6NMPNqg0g&s",
              }}
              // resizeMode="contain"
              className="rounded-3xl flex-1"
            />
          </TouchableOpacity>

          <TouchableOpacity className="p-2 mr-3 mb-3">
            <FontAwesome name="volume-up" size={30} color="black" />
            <Text className="text-sm text-black text-center">Phát</Text>
          </TouchableOpacity>
        </View>
      </View>


      {/* Phan 3 */}
      <View className="w-full h-[34%] bg-white">
        <FlatList
          data={images}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                console.log("touch card");
              }}
              className="p-2 w-1/3"
            >
              <Image
                source={{ uri: item }}
                className="h-[110] w-full rounded-3xl"
                resizeMode="cover"
              />
            </TouchableOpacity>
          )}
          numColumns={3}
          showsVerticalScrollIndicator={false}
          // keyExtractor={(_, index) => index.toString()}
        />
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
          <Text className="text-3xl text-black text-center">Quần áo</Text>
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
            navigation.navigate("Sentences");
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
