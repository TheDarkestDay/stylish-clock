import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "clock-33cc0.firebaseapp.com",
  projectId: "clock-33cc0",
  storageBucket: "clock-33cc0.appspot.com",
  messagingSenderId: "587326185138",
  appId: "1:587326185138:web:a40c8dae0b52a2375573ab"
};

export const firebaseApp = initializeApp(firebaseConfig);