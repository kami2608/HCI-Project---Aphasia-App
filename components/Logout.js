import * as React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { FIREBASE_AUTH } from '../firebaseConfig';

export default function Logout() {
    const navigation = useNavigation();

    const logout = async () => {
        console.log("Signing out...");
        FIREBASE_AUTH.signOut().then(() => {
            console.log("Sign out successful");
            navigation.navigate("Login");
        }).catch((error) => {
            console.log("Error signing out: ", error);
        });
    };

    return (
        <TouchableOpacity
            className="pr-2 flex flex-column items-center"
            onPress={() => {
                logout();
            }}
        >
            <MaterialIcons name="logout" size={25} color="black" />
            <Text className="text-xs text-black text-center">Đăng xuất</Text>
        </TouchableOpacity>
    );
}