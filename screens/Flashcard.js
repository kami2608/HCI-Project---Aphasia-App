import React, { useEffect, useRef, useState } from "react";
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
import axios from 'axios';
import { auth, storage } from "../firebaseConfig";
import { ref, getDownloadURL } from "firebase/storage";
import Logout from "../components/Logout";
import { set } from "firebase/database";


export default function Flashcard() {
  const navigation = useNavigation();
  const [categoryIds, setCategoryIds] = useState([]);
  const [categoryNames, setCategoryNames] = useState([]);
  const [cardIds, setCardIds] = useState([]);
  const [cardNames, setCardNames] = useState([]);
  const [symbol, setSymbol] = useState([]);
  const [cardUrls, setCardUrls] = useState([]);
  const [categoryUrls, setCategoryUrls] = useState([]);
  const route = useRoute();
  const scrollViewRef = useRef();
  const [selectedTopic, setSelectedTopic] = useState(0);

  // get all categories 
  useEffect(() => {
    axios.get('http://192.168.0.102:8080/api/v1/cards/category').then(res => {
      setCategoryIds(res.data.map(category => category.categoryId));
      setCategoryNames(res.data.map(category => category.categoryName));
    }).catch(err => {
      console.log(err);
    });
  }, []);
  // get category images
  useEffect(() => {
      getCategoryImages();
      console.log(categoryUrls);
  }, []);

  // get cards by category
  const getCardName = (categoryId) => {
    axios.get(`http://192.168.0.102:8080/api/v1/cards/category/${categoryId}`).then(res => {
      console.log(res.data);
      setCardIds(res.data.map(card => card.symbolId));
      setSymbol(res.data.map(card => card.symbol));
      setCardNames(res.data.map(card => card.wordVi));
    }).catch(err => {
      console.log(err);
    })
  }
  // get cards image from firebase storage
  const getCards = (categoryId, imgSymbols) => {
    const promises = imgSymbols.map(async imgSymbol => {
      const imageRef = ref(storage, `${categoryId}/${imgSymbol}.jpg`);
      return getDownloadURL(imageRef).then((url) => {
        setCardUrls([...cardUrls, url]);
      })
    });

    Promise.all(promises)
      .then((urls) => {
        console.log(urls);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // get category images from firebase storage
  const getCategoryImages = () => {
    const promises = categoryIds.map(categoryId => {
      const imageRef = ref(storage, `category/${categoryId}.jpg`);
      return getDownloadURL(imageRef);
    });

    Promise.all(promises)
      .then(urls => {
        setCategoryUrls(urls);
      })
      .catch(error => {
        console.error('Error fetching image URLs: ', error);
      });
  }
  

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
  
  // if(route.params?.selectedTopic) setSelectedTopic(route.params?.selectedTopic);
  // console.log(route.params?.selectedTopic + "hihi");
  // console.log(selectedTopic + "hi");
  return (
    <SafeAreaView className="flex-1">
      {/* <StatusBar style="light" /> */}

      <View className="w-full h-[6%] bg-white rounded-xl flex-row justify-between items-center">

      
        <TouchableOpacity
          className="pl-4 flex flex-column items-center"
          onPress={() => navigation.navigate("Profile")}
        >
          <FontAwesome name="user-circle-o" size={25} color="black" />
          <Text className="text-xs text-black text-center">Tôi</Text>
        </TouchableOpacity>

      <Logout/>

      </View>

      {/* Picture to speak section */}
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
                  url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8VxJ2zqWiWC5PQz-6ChPiaefrAacJx-4mh6NMPNqg0g&s",
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
                  url: "https://firebasestorage.googleapis.com/v0/b/hci-aphasia.appspot.com/o/10%2Fbear.jpg?alt=media&token=97ef57b5-bf44-4747-b00c-aa8b1bd60c19",
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
                  url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8VxJ2zqWiWC5PQz-6ChPiaefrAacJx-4mh6NMPNqg0g&s",
                }}
                className="rounded-3xl flex-1"
              />
            </TouchableOpacity>
          </View>

          {/* Speaking section */}
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
                  url: "https://firebasestorage.googleapis.com/v0/b/hci-aphasia.appspot.com/o/10%2Fbear.jpg?alt=media&token=97ef57b5-bf44-4747-b00c-aa8b1bd60c19",
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
                  url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8VxJ2zqWiWC5PQz-6ChPiaefrAacJx-4mh6NMPNqg0g&s",
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

      {/* Cards displayed */}
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
                source={{ url: item }}
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

      {/* Switch back button */}
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
          <Text className="text-3xl text-black text-center">
            {categoryNames[selectedTopic]}
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => {
            // if (selectedTopic < images.length - 2) {
            //   setSelectedTopic(selectedTopic + 1);
            //   scrollViewRef.current?.scrollTo({
            //     x: (selectedTopic + 1) * 90,
            //     animated: true,
            //   });
            // }
            
          }}
          className="flex-1 items-end justify-center"
        >
          <AntDesign name="right" size={50} color="black" />
          <Text className="text-sm text-black text-center">Tiếp theo</Text>
        </TouchableOpacity>
      </View>

      {/* Category */}
      <View className="w-full h-[13%] bg-white flex-row">
        <TouchableOpacity
          className="w-[100] h-full"
          onPress={() => {
            navigation.navigate("Sentences");
          }}
        >
          <Image
            source={{
              url: "https://upanh123.com/wp-content/uploads/2021/05/hinh-nen-mau-vang25.jpg",
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
          {/* {images.slice(1).map((url, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                console.log(index + "abc");
                setSelectedTopic(index);
              }}
              className={`${selectedTopic === index ? "border-2 border-blue-400" : ""
                }`}
            >
              <Image
                source={{ url: url }}
                className="h-[100%] w-[100]"
                resizeMode="cover"
              />
            </TouchableOpacity>
          ))} */}
          {categoryUrls.map((url, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                setSelectedTopic(categoryIds[index]);
              }}
              className={`${selectedTopic === categoryIds[index]} ? "border-2 border-blue-400" : ""}`}
              >
              <Image
                source={{ url: url }}
                className="h-[100%] w-[100]"
                resizeMode="cover"/>
              </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
