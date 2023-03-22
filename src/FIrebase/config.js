// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore/lite'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD6wKgH0Ea1eIHFi5SKAOvP8IjcCxDacfw",
    authDomain: "udemyfh.firebaseapp.com",
    projectId: "udemyfh",
    storageBucket: "udemyfh.appspot.com",
    messagingSenderId: "941823713055",
    appId: "1:941823713055:web:29efa2e9f93c25a1a99a2a"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);

export const FirebaseAuth = getAuth(FirebaseApp);

export const FirebaseDB = getFirestore(FirebaseApp)
