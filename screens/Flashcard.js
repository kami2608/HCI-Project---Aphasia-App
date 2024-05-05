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
import Logout from "../components/Logout";
import { set } from "firebase/database";

export default function Flashcard() {
  const navigation = useNavigation();
  const [categoryIds, setCategoryIds] = useState([]);
  const [categoryNames, setCategoryNames] = useState([]);
  const [cardIds, setCardIds] = useState([]);
  const [cardNames, setCardNames] = useState([]);
  const [cardEn, setCardEn] = useState([]);
  const [symbol, setSymbol] = useState([]);
  const [cardUrls, setCardUrls] = useState([]);
  const [categoryUrls, setCategoryUrls] = useState([]);
  const scrollViewRef = useRef();
  const [selectedTopic, setSelectedTopic] = useState(0);
  const [selectedCard, setSelectedCard] = useState([]);
  const [selectedCardName, setSelectedCardName] = useState([]);
  const [selectedCardUrl, setSelectedCardUrl] = useState([]);

  // get all categories 
  useEffect(() => {
    axios.get('http://192.168.0.102:8080/api/v1/cards/category').then(res => {
      setCategoryIds(res.data.map(category => category.categoryId));
      setCategoryNames(res.data.map(category => category.categoryName));
      setCategoryUrls(res.data.map(category => category.imgUrl));
    }).catch(err => {
      console.log(err);
    });
  }, []);

  useEffect(() => {

  }, [cardIds]);

  // get cards by category
  const getCard = async (categoryId) => {
    await axios.get(`http://192.168.0.102:8080/api/v1/cards/category/${categoryId}`).then(res => {
      setCardIds(res.data.map(card => card.symbolId));
      setSymbol(res.data.map(card => card.symbol));
      setCardNames(res.data.map(card => card.wordVi));
      setCardUrls(res.data.map(card => card.imgUrl));
      setCardEn(res.data.map(card => card.wordEn));
    }).catch(err => {
      console.log(err);
    })
  }

  useEffect(() => {
    console.log(selectedTopic, categoryIds[selectedTopic]);
    getCard(categoryIds[selectedTopic]);
    console.log(selectedCard);
  }, [selectedTopic]);

  const getSentence = (sentence) => {
    // TODO: get sentence from model
  }


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

        <Logout />

      </View>

      {/* Picture to speak section */}
      <View className="w-full h-[35%] items-center">

        <View className="flex flex-col items-center bg-orange-400 px-2 py-3">
          <View className="w-full h-[48%] flex flex-row justify-items my-1">
            {
              [...Array(3)].map((_, index) => {
                const item = selectedCardUrl[index];
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      setSelectedCardUrl(selectedCardUrl.filter(url => url !== item));
                      setSelectedCard(selectedCard.filter(card => card !== cardEn[index]));
                    }}
                    className="w-[30%] h-[90%] mx-1.5"
                  >
                    <Image
                      source={{ uri: item ? item : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8VxJ2zqWiWC5PQz-6ChPiaefrAacJx-4mh6NMPNqg0g&s' }}
                      resizeMode="contain"
                      className="rounded-3xl flex-1"
                    />
                  </TouchableOpacity>
                )
              })
            }
          </View>

          {/* Speaking section */}
          <View className="w-full h-[48%] flex flex-row justify-between items-end">
            <TouchableOpacity className="p-2 ml-3 mb-3">
              <AntDesign name="delete" size={30} color="black" />
              <Text className="text-sm text-black text-center">Xóa</Text>
            </TouchableOpacity>

            {
              [...Array(2)].map((_, index) => {
                
                let item;
                if (selectedCardUrl.length === 5) {
                  item = [selectedCardUrl[3], selectedCardUrl[4]];
                } else if (selectedCardUrl.length === 4) {
                  item = [selectedCardUrl[3], undefined];
                } else {
                  item = [undefined, undefined];
                }
                
                let uri = item[index];
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      setSelectedCardUrl(selectedCardUrl.filter(url => url !== uri));
                      setSelectedCard(selectedCard.filter(card => card !== cardEn[index]));
                    }}
                    className="w-[30%] h-[90%] mx-1.5"
                  >
                    <Image
                      source={{ uri: uri ? uri : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8VxJ2zqWiWC5PQz-6ChPiaefrAacJx-4mh6NMPNqg0g&s' }}
                      resizeMode="contain"
                      className="rounded-3xl flex-1"
                    />
                  </TouchableOpacity>
                );
              })
            }

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
          data={cardUrls.filter(url => !selectedCardUrl.includes(url))}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              onPress={() => {
                if (selectedCard.length >= 5) {
                  alert("Chỉ có thể chọn tối đa 5 từ");
                } else {
                  console.log(selectedCard);
                  console.log(cardEn[index]);
                  console.log(cardIds);
                  console.log(cardNames);
                  setCardIds(cardIds.filter(id => id !== cardIds[index]));
                  setCardNames(cardNames.filter(name => name !== cardNames[index]));
                  setSelectedCard(selected => [...selected, cardEn[index]]);
                  setSelectedCardUrl(selected => [...selected, item]);
                }
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
        />
      </View>

      {/* Navigation button */}
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
            if (selectedTopic < categoryIds.length - 1) {
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

          {categoryUrls.map((url, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                setSelectedTopic(index);

              }}
              className={`${selectedTopic === index ? "border-2 border-blue-400" : ""}`}
            >
              <Image
                source={{ uri: url }}
                className="h-[100%] w-[100]"
                resizeMode="cover" />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
