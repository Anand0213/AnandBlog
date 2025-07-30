// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyBrWrFdT87jV9VVvRGmlVQ7aZh_9aZhblY",
  authDomain: "anandblog-128dd.firebaseapp.com",
  projectId: "anandblog-128dd",
  storageBucket: "anandblog-128dd.firebasestorage.app",
  messagingSenderId: "771058219517",
  appId: "1:771058219517:web:7b8013da7a63ecfcf90194",
  measurementId: "G-CP7NDTTW7K"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();