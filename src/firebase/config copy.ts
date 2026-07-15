import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "YOUR_KEY",
    authDomain: "YOUR_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCoJOme_Oto_WiL6Os8ZYciQndsmp55ir0",
  authDomain: "sgs-ro.firebaseapp.com",
  projectId: "sgs-ro",
  storageBucket: "sgs-ro.firebasestorage.app",
  messagingSenderId: "585595779697",
  appId: "1:585595779697:web:7729c9357944c12d49f9d0",
  measurementId: "G-T9P9PB6XH2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);