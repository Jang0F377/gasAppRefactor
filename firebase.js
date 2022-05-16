// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
import AsyncStorage from "@react-native-async-storage/async-storage";


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDYnkNZ3POuaO5Qkzu0HR786NXeRLCdgwU",
    authDomain: "gastrackerrefactor.firebaseapp.com",
    projectId: "gastrackerrefactor",
    storageBucket: "gastrackerrefactor.appspot.com",
    messagingSenderId: "1057754795638",
    appId: "1:1057754795638:web:da0a5ad2fcb890b2e59957"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth }