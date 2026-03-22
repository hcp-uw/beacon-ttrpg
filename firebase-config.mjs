import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCWN50i1n4LqEb9R6ZsurvTSzdKd4vfgVg",
  authDomain: "ttrbg-test.firebaseapp.com",
  projectId: "ttrbg-test",
  storageBucket: "ttrbg-test.firebasestorage.app",
  messagingSenderId: "503063489100",
  appId: "1:503063489100:web:5e39354642e75ecb65e2e9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);