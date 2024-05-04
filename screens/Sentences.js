// import React, { useRef, useState } from "react";
// import {
//   View,
//   SafeAreaView,
//   StatusBar,
//   Text,
//   TouchableOpacity,
//   Image,
//   ScrollView,
//   FlatList,
// } from "react-native";
// import Icon from "react-native-vector-icons/Feather";
// import { useNavigation } from "@react-navigation/native";
// import Results from "../components/Results";
// import AntDesign from "react-native-vector-icons/AntDesign";
// import FontAwesome from "react-native-vector-icons/FontAwesome";

// export default function Sentences() {
//   const navigation = useNavigation();
//   const images = [
//     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8VxJ2zqWiWC5PQz-6ChPiaefrAacJx-4mh6NMPNqg0g&s",
//     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8VxJ2zqWiWC5PQz-6ChPiaefrAacJx-4mh6NMPNqg0g&s",
//     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8VxJ2zqWiWC5PQz-6ChPiaefrAacJx-4mh6NMPNqg0g&s",
//     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8VxJ2zqWiWC5PQz-6ChPiaefrAacJx-4mh6NMPNqg0g&s",
//     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8VxJ2zqWiWC5PQz-6ChPiaefrAacJx-4mh6NMPNqg0g&s",
//     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8VxJ2zqWiWC5PQz-6ChPiaefrAacJx-4mh6NMPNqg0g&s",
//     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8VxJ2zqWiWC5PQz-6ChPiaefrAacJx-4mh6NMPNqg0g&s",
//     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8VxJ2zqWiWC5PQz-6ChPiaefrAacJx-4mh6NMPNqg0g&s",
//     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8VxJ2zqWiWC5PQz-6ChPiaefrAacJx-4mh6NMPNqg0g&s",
//     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8VxJ2zqWiWC5PQz-6ChPiaefrAacJx-4mh6NMPNqg0g&s",
//     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8VxJ2zqWiWC5PQz-6ChPiaefrAacJx-4mh6NMPNqg0g&s",
//     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8VxJ2zqWiWC5PQz-6ChPiaefrAacJx-4mh6NMPNqg0g&s",
//     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8VxJ2zqWiWC5PQz-6ChPiaefrAacJx-4mh6NMPNqg0g&s",
//     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8VxJ2zqWiWC5PQz-6ChPiaefrAacJx-4mh6NMPNqg0g&s",
//     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8VxJ2zqWiWC5PQz-6ChPiaefrAacJx-4mh6NMPNqg0g&s",
//   ];
//   const scrollViewRef = useRef();
//   return (
//     <SafeAreaView className="flex-1">
//       {/* <StatusBar style="light" /> */}

//       <View className="w-full h-[6%] bg-white rounded-xl">
//         <View className="ml-auto mr-3 ">
//           <TouchableOpacity
//             className="w-full p-1 flex flex-column items-center"
//             onPress={() => navigation.navigate("Login")}
//           >
//             <Icon name="settings" size={25} color="black" />
//             <Text className="text-xs text-black text-center">Cài đặt</Text>
//           </TouchableOpacity>
//         </View>
//       </View>

//       {/* Phần 2 */}
//       <View className="w-full h-[30%] flex flex-col items-center bg-orange-400 px-2 py-3">
//         <View className="w-[90%] h-[30%] bg-gray-300 my-2 rounded-full my-12" />
//         <View className="w-full flex-1 flex flex-row justify-between items-end px-4 pb-2">
//           <TouchableOpacity
//             onPress={() => {
//               console.log("Xóa");
//             }}
//             className="items-center"
//           >
//             <AntDesign name="delete" size={30} color="black" />
//             <Text className="text-sm text-black text-center">Xóa</Text>
//           </TouchableOpacity>

//           <TouchableOpacity
//             onPress={() => {
//               console.log("Phát");
//             }}
//             className="items-center"
//           >
//             <FontAwesome name="volume-up" size={30} color="black" />
//             <Text className="text-sm text-black text-center">Phát</Text>
//           </TouchableOpacity>
//         </View>
//       </View>

//       {/* Phan 3 */}
//       <View className="w-full h-[38%] bg-white">
//         <ScrollView
//           className="flex-1"
//           vertical
//           showsVerticalScrollIndicator={false}
//         >
//           {images.map((imageUri, index) => (
//             <TouchableOpacity key={index} className="p-2 pl-5 pr-5">
//               <Image
//                 source={{ uri: imageUri }}
//                 className="h-[55] w-full rounded-3xl"
//                 resizeMode="cover"
//               />
//             </TouchableOpacity>
//           ))}
//         </ScrollView>
//       </View>

//       {/* Phan 4 */}
      // <View className="w-full h-[11%] flex flex-row items-center justify-between bg-white px-4 border-t-2 border-gray-300">
      //   <View
      //     className="flex-1 items-start justify-center"
      //   >
      //     <AntDesign name="left" size={50} color="black" />
      //     <Text className="text-sm text-black text-center">Quay lại</Text>
      //   </View>

      //   <View className="flex-3 items-center justify-center">
      //     <Text className="text-3xl text-black text-center">Thường dùng</Text>
      //   </View>

      //   <TouchableOpacity
      //     onPress={() => {
      //       navigation.navigate("Flashcard", {selectedTopic: 0})
      //     }}
      //     className="flex-1 items-end justify-center"
      //   >
      //     <AntDesign name="right" size={50} color="black" />
      //     <Text className="text-sm text-black text-center">Tiếp theo</Text>
      //   </TouchableOpacity>
      // </View>

//       {/* Phan 5 */}
      // <View className="w-full h-[13%] bg-white flex-row">
      //   <View className="w-[100] h-full border-2 border-blue-400">
      //     <Image
      //       source={{
      //         uri: "https://upanh123.com/wp-content/uploads/2021/05/hinh-nen-mau-vang25.jpg",
      //       }}
      //       className="h-full w-full"
      //       resizeMode="cover"
      //     />
      //   </View>
      //   <ScrollView
      //     horizontal
      //     ref={scrollViewRef}
      //     showsHorizontalScrollIndicator={false}
      //     className="flex-1 flex-row"
      //   >
      //     {images.slice(1).map((uri, index) => (
      //       <TouchableOpacity
      //         key={index}
      //         onPress={() => {
      //           console.log(index + "ba")
      //           navigation.navigate({
      //               name: "Flashcard",
      //               params: {selectedTopic: index},
      //               merge: true,
      //           })
      //       }}
      //       >
      //         <Image
      //           source={{ uri: uri }}
      //           className="h-[100%] w-[100]"
      //           resizeMode="cover"
      //         />
      //       </TouchableOpacity>
      //     ))}
      //   </ScrollView>
      // </View>
//     </SafeAreaView>
//   );
// }



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
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Results } from "../components/Results";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { Cards } from "../components/Cards";
import { FIREBASE_AUTH } from "../firebaseConfig";
import { signOut } from "firebase/auth";

export default function Sentences() {
  const navigation = useNavigation();
  const route = useRoute();
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
  // if(route.params?.selectedTopic) setSelectedTopic(route.params?.selectedTopic);
  console.log(route.params?.selectedTopic + "hihi");
  console.log(selectedTopic + "hi");

  const auth = FIREBASE_AUTH;
  const logout = async () => {
    try {
      await signOut(auth);
      navigation.navigate("Login")
      console.log("User signed out successfully");
    } catch (error) {
      console.log("Sign out error: ", error);
    }
  }

  return (
    <SafeAreaView className="flex-1">
      {/* <StatusBar style="light" /> */}

      <View className="w-full h-[6%] bg-white rounded-xl flex-row justify-between items-center">
        
      <TouchableOpacity
          className="pl-4 flex flex-column items-center"
          onPress={() => navigation.navigate("Profile")}
        >
          <FontAwesome name="user-circle-o" size={40} color="black" />
          <Text className="text-xs text-black text-center">Tôi</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="pr-4 flex flex-column items-center"
          // onPress={() => { logout() }}
          onPress={() => navigation.navigate("Profile")}
        >
          <MaterialIcons name="logout" size={25} color="black" />
          <Text className="text-xs text-black text-center">Đăng xuất</Text>
        </TouchableOpacity>

      </View>

      {/* Phần 2 */}
      <View className="w-full h-[35%] items-center">
        {/* <Results/> */}
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
        <View
          className="flex-1 items-start justify-center"
        >
          <AntDesign name="left" size={50} color="black" />
          <Text className="text-sm text-black text-center">Quay lại</Text>
        </View>

        <View className="flex-3 items-center justify-center">
          <Text className="text-3xl text-black text-center">Thường dùng</Text>
        </View>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Flashcard", {selectedTopic: 0})
          }}
          className="flex-1 items-end justify-center"
        >
          <AntDesign name="right" size={50} color="black" />
          <Text className="text-sm text-black text-center">Tiếp theo</Text>
        </TouchableOpacity>
      </View>

      {/* Phan 5 */}
      <View className="w-full h-[13%] bg-white flex-row">
        <View className="w-[100] h-full border-2 border-blue-400">
          <Image
            source={{
              uri: "https://upanh123.com/wp-content/uploads/2021/05/hinh-nen-mau-vang25.jpg",
            }}
            className="h-full w-full"
            resizeMode="cover"
          />
        </View>
        <ScrollView
          horizontal
          ref={scrollViewRef}
          showsHorizontalScrollIndicator={false}
          className="flex-1 flex-row"
        >
          {images.slice(1).map((uri, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                console.log(index + "ba")
                navigation.navigate({
                    name: "Flashcard",
                    params: {selectedTopic: index},
                    merge: true,
                })
            }}
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
