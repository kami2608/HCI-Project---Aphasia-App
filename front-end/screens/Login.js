import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback
} from "react-native";
import React, { useState } from "react";
import logo from "../assets/logo.png";
import { useNavigation } from "@react-navigation/native";
import { FIREBASE_AUTH } from "../firebaseConfig";
import { ThemedButton } from "react-native-really-awesome-button";
import { signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('')
  const [password, setPass] = useState('')
  const [loading, setLoading] = useState(false)
  const auth = FIREBASE_AUTH

  const login = async () => {
    setLoading(true)
    try {
      console.log(email, ": ", password)
      await signInWithEmailAndPassword(auth, email, password)
      navigation.navigate("Flashcard")
    } catch (error) {
      console.log(error)
      alert("Sai tài khoản hoặc mật khẩu")
    } finally {
      setLoading(false)
    }
  }

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
            <View style={{ backgroundColor: '#DBD9D940', padding: 15, borderRadius: 30, marginBottom: 10 }}>
              <TextInput
                style={{ fontSize: 18 }}
                value={email}
                placeholder="Email"
                placeholderTextColor="#908D8D"
                onChangeText={setEmail}
                autoFocus={true}
              />
            </View>
            <View style={{ backgroundColor: '#DBD9D940', padding: 15, borderRadius: 30, marginBottom: 10 }}>
              <TextInput
                style={{ fontSize: 18 }}
                value={password}
                placeholder="Mật khẩu"
                placeholderTextColor="#908D8D"
                onChangeText={setPass}
                secureTextEntry
              />
            </View>

            <ThemedButton name="bruce" type="primary"
              backgroundColor="#F19F58" backgroundDarker="#A74628"
              backgroundActive="#EBAC87" borderColor="#E3AF81"
              onPress={() => login()}
              className="mx-auto my-2"
            >Đăng nhập</ThemedButton>
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
              <Text className='text-base'>Bạn chưa có tài khoản? </Text>
              <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
                <Text className='text-orange-600 text-base font-semibold'>Đăng ký</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default Login;
