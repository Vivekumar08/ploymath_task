// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyDmC-oveZNdh_yrc15boLlgFeoXoRiLB6Y",
    authDomain: "solocl-78b2f.firebaseapp.com",
    projectId: "solocl-78b2f",
    storageBucket: "solocl-78b2f.appspot.com",
    messagingSenderId: "859388749164",
    appId: "1:859388749164:web:39cdd3fc71ec65ed033f49",
    measurementId: "G-RDHYZM0T9E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app); 
export const db = getFirestore(app);