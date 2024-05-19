import {
  View,
  Text,
  TextInput,
  Touchable,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useState } from "react";
import { ThemedButton } from "react-native-really-awesome-button";
import { useNavigation } from "@react-navigation/native";
import { FIREBASE_AUTH } from "../firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import logo from "../assets/logo.png";
import { Keyboard, TouchableWithoutFeedback } from "react-native";

export default function Signup() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const [loading, setLoading] = useState(false);
  const auth = FIREBASE_AUTH;

  const signUp = async () => {
    setLoading(true);
    try {
      console.log(email, ": ", password)
      await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      navigation.navigate("Account");
    } catch (error) {
      console.log(error);
      alert("Sign up failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={{ flex: 1, backgroundColor: "white" }}
        behavior={Platform.OS === "ios" ? "padding" : null}
      >
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Image
            style={{ height: '37%', width: '50%', marginBottom: 20 }}
            source={logo}
            resizeMode="contain"
          />

          <View style={{ width: '100%', paddingHorizontal: 10 }}>
            <View style={{ width: '100%', backgroundColor: '#DBD9D940', padding: 15, borderRadius: 30, marginBottom: 10 }}>
              <TextInput
                className="text-xl"
                value={email}
                placeholder="Email"
                placeholderTextColor="#CCCCCC"
                onChangeText={setEmail}
              />
            </View>
            <View style={{ width: '100%', backgroundColor: '#DBD9D940', padding: 15, borderRadius: 30, marginBottom: 10 }}>
              <TextInput
                className="text-xl"
                onChangeText={setPass}
                value={password}
                placeholder="Mật khẩu"
                secureTextEntry={true}
                keyboardType="default"
                autoCapitalize="none"
                autoComplete="false"
              />
            </View>
            <View style={{ width: '100%', backgroundColor: '#DBD9D940', padding: 15, borderRadius: 30, marginBottom: 10 }}>
              <TextInput
                className="text-xl"
                onChangeText={setPass}
                value={password}
                placeholder="Nhập lại mật khẩu"
                secureTextEntry={true}
                keyboardType="default"
                autoCapitalize="none"
                autoComplete="false"
              />
            </View>
            <ThemedButton name="bruce" type="primary"
              backgroundColor="#F19F58" backgroundDarker="#A74628"
              backgroundActive="#EBAC87" borderColor="#E3AF81"
              onPress={() => signUp()}
              className="mx-auto my-2"
            >Đăng ký</ThemedButton>
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
              <Text className='text-base'>Bạn đã có tài khoản? </Text>
              <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Text className='text-orange-600 text-base font-semibold'>Đăng nhập</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}
