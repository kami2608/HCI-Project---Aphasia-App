// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore} from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDHrtsCqnun0PZhNMhxxIktDWWi20ukhYs",
  authDomain: "aphasia-d45c8.firebaseapp.com",
  projectId: "aphasia-d45c8",
  storageBucket: "aphasia-d45c8.appspot.com",
  messagingSenderId: "149096240255",
  appId: "1:149096240255:web:11adc0e2993bb8f4845b4a"
};


// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP)
export const FIREBASE_DB = getFirestore(FIREBASE_APP)