import { initializeApp } from "firebase/app";

import {
    getAuth
} from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBiuIWPElLjwfoYyrjFLee0hwFvmjp1HlI",
    authDomain: "novastore-86420.firebaseapp.com",
    projectId: "novastore-86420",
    storageBucket: "novastore-86420.firebasestorage.app",
    messagingSenderId: "431220090041",
    appId: "1:431220090041:web:328144bdd8292691c6a768"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export default app;