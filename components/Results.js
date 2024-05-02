import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { TouchableOpacity, View, Image, Text } from "react-native";

export const Results = ()=> {
  return (
    <View className="flex flex-col items-center bg-orange-400 px-2 py-3">
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
  );
};
