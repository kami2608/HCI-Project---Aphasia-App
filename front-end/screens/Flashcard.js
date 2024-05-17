import React, { useEffect, useRef, useState } from "react";
import {
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
  Animated,
  Easing,
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import axios from 'axios';
import Logout from "../components/Logout";
import { translate } from 'google-translate-api-x';
import { Audio } from "expo-av";
import Personal from "../components/Personal";

const ProgressDots = () => {
  const dots = [
    useRef(new Animated.Value(0)).current,
    useRef(new Animated.Value(0)).current,
    useRef(new Animated.Value(0)).current,
  ];

  useEffect(() => {
    dots.forEach((dot, index) => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(dot, {
            toValue: 1,
            duration: 400,
            easing: Easing.linear,
            useNativeDriver: true,
            delay: index * 100,
          }),
          Animated.timing(dot, {
            toValue: 0,
            duration: 400,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
        ])
      ).start();
    });
  }, [dots]);
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
      }}
    >
      {dots.map((dot, index) => (
        <Animated.View
          key={index}
          style={{
            marginHorizontal: 5,
            width: 30,
            height: 30,
            borderRadius: 12.5,
            backgroundColor: "orange",
            transform: [
              {
                translateY: dot.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, -15],
                }),
              },
            ],
          }}
        />
      ))}
    </View>
  );
};

export default function Flashcard() {
  const scrollViewRef = useRef();
  const [selectedTopic, setSelectedTopic] = useState(0);
  const [selectedCard, setSelectedCard] = useState([]);
  const [categories, setCategories] = useState([]);
  const [cards, setCards] = useState([]);
  const [sound, setSound] = useState();
  const [prevSelectedCardLength, setPrevSelectedCardLength] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // get all categories 
  useEffect(() => {
    axios.get('http://192.168.0.100:8080/api/v1/cards/category').then(res => {
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
    setIsLoading(true);
    await axios.get(`http://192.168.0.100:8080/api/v1/cards/category/${categoryId}`).then(res => {
      setCards(res.data.map(card => ({
        id: card.cardId,
        name: card.wordVi,
        en: card.wordEn,
        url: card.imgUrl,
        sound: card.audioUrl
      })))
      setIsLoading(false);
    }).catch(err => {
      console.log(err);
      setIsLoading(false);
    })
  }

  // display all cards of a category
  useEffect(() => {
    if (categories.length > 0) {
      getCard(categories[selectedTopic].id);
      // console.log(cards);
    }
  }, [categories, selectedTopic]);


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
    queryVoice({ "text": sentence }).then(async (response) => {
      console.log(response);
      const audio = new Audio.Sound();
      await audio.loadAsync({ uri: 'data:audio/wav;base64,' + btoa(String.fromCharCode(...new Uint8Array(response.data))) });
      await audio.playAsync();
    });
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

  async function queryVoice(input) {
    try {
      const response = await axios.post('http://192.168.0.100:5000/synthesize', input, {
        responseType: 'arraybuffer',
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  }



  return (
    <SafeAreaView className="flex-1">
      {/* <StatusBar style="light" /> */}
      <View className="w-full h-[6%] bg-white rounded-xl flex-row justify-between items-center">

        <Personal />

        <Logout />

      </View>

      {/* Picture to speak section */}
      <View className="w-full h-[32%] items-center">

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
                    className="w-[27%] h-[90%] mx-1.5"
                  >
                    <Image
                      source={{ uri: item ? item.url : 'https://wallpapers.com/images/hd/white-square-background-56v690fpm25a3o6s.jpg' }}
                      resizeMode="cover"
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
                    className="w-[27%] h-[90%] mx-1.5"
                  >
                    <Image
                      source={{ uri: item ? item.url : 'https://wallpapers.com/images/hd/white-square-background-56v690fpm25a3o6s.jpg' }}
                      resizeMode="cover"
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
      <View className="w-full h-[45%] bg-gray-200">
        {isLoading ? (
          <View className="flex-1 justify-center items-center">
            <ProgressDots />
          </View>
        ) : (
          <FlatList
            data={cards}
            extraData={selectedCard}
            renderItem={({ item, index }) => (
              <View style={{ width: '33.33%', opacity: selectedCard.includes(item) ? 0 : 1 }}>
                <TouchableOpacity
                  onPress={() => {
                    if (selectedCard.length < 5) {
                      setSelectedCard([...selectedCard, item]);
                      console.log(selectedCard);
                    } else {
                      alert("Chỉ có thể chọn tối đa 5 từ");
                    }
                  }}
                  className="flex-1 m-3 p-2 items-center justify-center bg-white rounded-xl shadow-md"
                >
                  <Image
                    source={{ uri: item.url }}
                    className="h-[95] w-full rounded-3xl"
                    resizeMode="cover"
                  />
                  <Text className="text-sm text-black text-center">{item.name}</Text>
                </TouchableOpacity>
              </View>
            )}
            numColumns={3}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>

      {/* Navigation button */}
      <View className="w-full h-[8%] flex flex-row items-center justify-between bg-orange-400 px-4 border-t-2 border-gray-300">
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
          <AntDesign name="left" size={35} color="black" />
          <Text className="text-xs text-black text-center">Quay lại</Text>
        </TouchableOpacity>

        <View className="flex-3 items-center justify-center">
          <Text className="text-xl text-black text-center">
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
          <AntDesign name="right" size={35} color="black" />
          <Text className="text-sm text-black text-center">Tiếp theo</Text>
        </TouchableOpacity>
      </View>

      {/* Category */}
      <View className="w-full h-[12,1%] bg-white flex-row">
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
              className={`${selectedTopic === index ? "border-8 border-orange-600" : ""}`}
            >
              <Image
                source={{ uri: category.url }}
                className="h-[100] w-[100]"
                resizeMode="cover" />
            </TouchableOpacity>
          ))}

        </ScrollView>
      </View>
    </SafeAreaView >
  );
}
