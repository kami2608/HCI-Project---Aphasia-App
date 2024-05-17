import * as React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

export default function Logout() {
    const navigation = useNavigation();

    return (
        <TouchableOpacity
            style={{ paddingRight: 2, margin: 8, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
            onPress={() => navigation.navigate("Profile")}
        >
            <MaterialIcons name="person-outline" size={25} color="black" />
            <Text className="text-xs text-black text-center">Tôi</Text>
        </TouchableOpacity>
    );
}