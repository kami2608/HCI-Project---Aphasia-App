// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBgh2l-ki97b4CDn6ppf93DEJ7khR8Qhj8",
    authDomain: "hci-aphasia.firebaseapp.com",
    databaseURL: "https://hci-aphasia-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "hci-aphasia",
    storageBucket: "hci-aphasia.appspot.com",
    messagingSenderId: "1043663112022",
    appId: "1:1043663112022:web:d904bea21a6e1842a4f8f7",
    measurementId: "G-HEY3N2D11F"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP)
export const FIREBASE_DB = getFirestore(FIREBASE_APP)
const storage = getStorage(FIREBASE_APP);

export { storage };