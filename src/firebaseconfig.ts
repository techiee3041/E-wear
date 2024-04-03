import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB4hO4tRo1DIo5akA8b6_ZpfyxCKl9vRKo",
  authDomain: "e-wear-d593e.firebaseapp.com",
  projectId: "e-wear-d593e",
  storageBucket: "e-wear-d593e.appspot.com",
  messagingSenderId: "940016847516",
  appId: "1:940016847516:web:c7f283b8f869d822de7b59",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage =  getStorage(app);
export const auth = getAuth(app);