// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "markande-construction.firebaseapp.com",
  projectId: "markande-construction",
  storageBucket: "markande-construction.appspot.com",
  messagingSenderId: "123780111369",
  appId: "1:123780111369:web:2b87db9a1d0bc09da3acd8",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
