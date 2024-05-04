import * as React from 'react';
import { auth } from '../firebaseConfig';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity, Text, View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function Logout() {
    const navigation = useNavigation();
    const signOut = () => {
        auth.signOut().then(() => {
            console.log("Sign out successful");
            navigation.navigate("Login");
        }).catch((error) => {
            console.log("Error signing out: ", error);
        });
    }
    return (
        <TouchableOpacity
            className="pr-4 flex flex-column items-center"
            onPress={() => {
                signOut();
            }}
        >
            <MaterialIcons name="logout" size={25} color="black" />
            <Text className="text-xs text-black text-center">Đăng xuất</Text>
        </TouchableOpacity>
    )
}