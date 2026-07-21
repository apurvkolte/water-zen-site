import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyCoJOme_Oto_WiL6Os8ZYciQndsmp55ir0",
    authDomain: "sgs-ro.firebaseapp.com",
    projectId: "sgs-ro",
    storageBucket: "sgs-ro.firebasestorage.app",
    messagingSenderId: "585595779697",
    appId: "1:585595779697:web:7729c9357944c12d49f9d0",
    measurementId: "G-T9P9PB6XH2"
};
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
