// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCWN50i1n4LqEb9R6ZsurvTSzdKd4vfgVg",
  authDomain: "ttrbg-test.firebaseapp.com",
  projectId: "ttrbg-test",
  storageBucket: "ttrbg-test.firebasestorage.app",
  messagingSenderId: "503063489100",
  appId: "1:503063489100:web:5e39354642e75ecb65e2e9",
  measurementId: "G-885PDD28R1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);