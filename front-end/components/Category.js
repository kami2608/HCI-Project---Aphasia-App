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
import { Cards } from "../components/Cards";
import axios from 'axios';
import { storage } from "../firebaseConfig";
import { ref, getDownloadURL } from "firebase/storage";


export default function Category() {
    const navigation = useNavigation();
    const [categoryIds, setCategoryIds] = useState([]);
    const [categoryNames, setCategoryNames] = useState([]);
    const [categoryUrls, setCategoryUrls] = useState([]);
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

    return (

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
                            resizeMode="cover" />
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
}
