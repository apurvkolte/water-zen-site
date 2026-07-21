import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaS",
    authDomain: "sgs",
    projectId: "sgs-",
    storageBucket: "sgs-",
    messagingSenderId: "585595",
    appId: "1::",
    measurementId: "G"
};
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
