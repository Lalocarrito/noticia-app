// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyD2O0Bdqaze-v24qRCmQ3Chvgy2m2CDa_k",
    authDomain: "sescolar-a2da1.firebaseapp.com",
    projectId: "sescolar-a2da1",
    storageBucket: "sescolar-a2da1.appspot.com",
    messagingSenderId: "389405550408",
    appId: "1:389405550408:web:d80807de018e109262757d",
    measurementId: "G-6EZCV2CEBD"
};



const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
