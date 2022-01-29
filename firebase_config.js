// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCANKrut9VEYA6j9Erq9KEtCgekuNM8Cbs",
  authDomain: "movieapp-903cc.firebaseapp.com",
  projectId: "movieapp-903cc",
  storageBucket: "movieapp-903cc.appspot.com",
  messagingSenderId: "658249651052",
  appId: "1:658249651052:web:b2e8e233e3e95753025949",
  measurementId: "G-C4KJBS2XJY",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = getFirestore();
