// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "aathilsblog.firebaseapp.com",
  projectId: "aathilsblog",
  storageBucket: "aathilsblog.appspot.com",
  messagingSenderId: "375847106475",
  appId: "1:375847106475:web:ba09b0a9db6e2f813444ee",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
