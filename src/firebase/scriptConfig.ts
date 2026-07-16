import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AI",
    authDomain: "sgs-",
    projectId: "sgso",
    storageBucket: "sgs-",
    messagingSenderId: "",
    appId: "1:585595779697:wd49f9d0",
    measurementId: "G-T2"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
