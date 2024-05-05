// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';


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
let app;

if (!getApps().length) {
    app = initializeApp(firebaseConfig);
} else {
    app = getApp();
}

const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
});

const db = getFirestore(app);
const storage = getStorage(app);

export { db, auth, storage };