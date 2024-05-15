import React, { useEffect, useRef, useState } from "react";
import {
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import axios from 'axios';
import Logout from "../components/Logout";
import { translate, speak } from 'google-translate-api-x';
import { Audio } from "expo-av";
import * as FileSystem from 'expo-file-system';


export default function Flashcard() {
  const navigation = useNavigation();
  const scrollViewRef = useRef();
  const [selectedTopic, setSelectedTopic] = useState(0);
  const [selectedCard, setSelectedCard] = useState([]);
  const [categories, setCategories] = useState([]);
  const [cards, setCards] = useState([]);
  const [sound, setSound] = useState();
  const [prevSelectedCardLength, setPrevSelectedCardLength] = useState(0);

  // get all categories 
  useEffect(() => {
    axios.get('http://192.168.0.101:8080/api/v1/cards/category').then(res => {
      setCategories(res.data.map(category => ({
        id: category.categoryId,
        name: category.categoryName,
        url: category.imgUrl
      })));
    }).catch(err => {
      console.log(err);
    });
  }, []);


  // get cards by category
  const getCard = async (categoryId) => {
    await axios.get(`http://192.168.0.101:8080/api/v1/cards/category/${categoryId}`).then(res => {
      setCards(res.data.map(card => ({
        id: card.cardId,
        name: card.wordVi,
        en: card.wordEn,
        url: card.imgUrl,
        sound: card.audioUrl
      })))
    }).catch(err => {
      console.log(err);
    })
  }

  // display all cards of a category
  useEffect(() => {
    if (categories.length > 0) {
      console.log(categories[selectedTopic].id);
      getCard(categories[selectedTopic].id);
      // getCard(categories[selectedTopic].id);
    }
  }, [selectedTopic, categories]);


  // get and play full sentence
  const handleSentence = async () => {
    let sentence;
    const string = selectedCard.map(card => card.en).join(' ');
    await query({ "inputs": string }).then((response) => {
      // console.log(response);
      sentence = response[0].generated_text;
    });
    try {
      const translation = await translate(sentence, { from: 'en', to: 'vi' });
      console.log(translation);
      sentence = translation.text;
    } catch (error) {
      console.error('An error occurred:', error);
    }

    try {
      const res = await speak(sentence, 'vi');
      saveBase64ToMp3(res, 'sentence');
    } catch (error) {
      console.error('An error occurred:', error);
    }
  }

  // play single card sound
  async function playSound() {
    console.log('Loading Sound');
    console.log(selectedCard[selectedCard.length - 1].sound);
    const { sound } = await Audio.Sound.createAsync(
      {
        uri: selectedCard[selectedCard.length - 1].sound,
        shouldPlay: true,
      }
    );
    setSound(sound);
    console.log('Playing Sound');
    await sound.playAsync();
  }

  useEffect(() => {
    if (selectedCard.length > prevSelectedCardLength) {
      playSound();
    }
    setPrevSelectedCardLength(selectedCard.length);
  }, [selectedCard]);

  // query model
  async function query(data, retries = 10) {
    const url = new URL("https://api-inference.huggingface.co/models/grammarly/coedit-large");
    url.searchParams.append('wait_for_model', 'true');
    console.log(data.inputs)
    const requestBody = {
      inputs: "Fix the grammar: " + data.inputs,
    };
    try {
      const response = await fetch(
        url.toString(),
        {
          headers: { Authorization: `Bearer ${process.env.REACT_APP_MODEL_API_KEY}` },
          method: "POST",
          body: JSON.stringify(requestBody),
        }
      );
      const result = await response.json();
      if (result.error && result.error.startsWith("Model")) {
        // wait for the model and retry if the model is loading
        await new Promise(resolve => setTimeout(resolve, result.estimated_time * 1000));
        retries--;
      } else {
        return result;
      }
    } catch (error) {
      // retry if there's an error
      retries--;
      if (retries === 0) throw error;
    }
  }

  const deleteSelected = () => {
    setSelectedCard([]);
  }

  async function saveBase64ToMp3(base64, file) {
    console.log('Saving file...');
    const path = FileSystem.documentDirectory + file + '.mp3';
    // 'base64String' is the base64 string of the mp3 file
    await FileSystem.writeAsStringAsync(path, base64, {
      encoding: FileSystem.EncodingType.Base64,
    });

    console.log('File saved to:', path);
    const { sound } = await Audio.Sound.createAsync(
      { uri: path }
    );
    setSound(sound);
    console.log('Playing Sound');
    await sound.playAsync();
    
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
                const item = selectedCard[index];
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      setSelectedCard(selectedCard.filter(card => card !== item));
                    }}
                    className="w-[30%] h-[90%] mx-1.5"
                  >
                    <Image
                      source={{ uri: item ? item.url : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8VxJ2zqWiWC5PQz-6ChPiaefrAacJx-4mh6NMPNqg0g&s' }}
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
            <TouchableOpacity
              onPress={deleteSelected}
              className="p-2 ml-3 mb-3"
            >
              <AntDesign name="delete" size={30} color="black" />
              <Text className="text-sm text-black text-center">Xóa</Text>
            </TouchableOpacity>

            {
              [...Array(2)].map((_, index) => {
                let item;
                if (selectedCard.length <= 3) {
                  item = undefined;
                } else if (selectedCard.length === 4) {
                  if (index === 0) {
                    item = selectedCard[3];
                  } else {
                    item = undefined;
                  }
                } else {
                  item = selectedCard[index + 3];
                }
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      setSelectedCard(selectedCard.filter(card => card !== item));
                      console.log(selectedCard);
                    }}
                    className="w-[30%] h-[90%] mx-1.5"
                  >
                    <Image
                      source={{ uri: item ? item.url : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8VxJ2zqWiWC5PQz-6ChPiaefrAacJx-4mh6NMPNqg0g&s' }}
                      resizeMode="contain"
                      className="rounded-3xl flex-1"
                    />
                  </TouchableOpacity>
                )
              })
            }

            <TouchableOpacity
              onPress={handleSentence}
              className="p-2 mr-3 mb-3"
            >
              <FontAwesome name="volume-up" size={30} color="black" />
              <Text className="text-sm text-black text-center">Phát</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>


      {/* Cards displayed */}
      <View className="w-full h-[34%] bg-white">
        <FlatList
          data={cards.filter(card => !selectedCard.includes(card))}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              onPress={() => {
                if (selectedCard.length < 5) {
                  setSelectedCard([...selectedCard, item]);
                  console.log(selectedCard);
                } else {
                  alert("Chỉ có thể chọn tối đa 5 từ");
                }
              }}
              className="p-2 w-1/3"
            >
              <Image
                source={{ uri: item.url }}
                className="h-[110] w-full rounded-3xl"
                resizeMode="cover"
              />
              {/* thay ten cua card o day */}
              <Text className="text-center mt-1">Card's name</Text> 
            </TouchableOpacity>
          )}
          numColumns={3}
          showsVerticalScrollIndicator={false}
        />
      </View>

      {/* Navigation button */}
      <View className="w-full h-[11%] flex flex-row items-center justify-between bg-orange-400 px-4 border-t-2 border-gray-300">
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
            {categories[selectedTopic] && categories[selectedTopic].name}
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => {
            if (selectedTopic < categories.length - 1) {
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
          {categories.map((category, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                setSelectedTopic(index);
              }}
              className={`${selectedTopic === index ? "border-2 border-blue-400" : ""}`}
            >
              <Image
                source={{ uri: category.url }}
                className="h-[100%] w-[100]"
                resizeMode="cover" />
            </TouchableOpacity>
          ))}



        </ScrollView>
      </View>
    </SafeAreaView >
  );
}
