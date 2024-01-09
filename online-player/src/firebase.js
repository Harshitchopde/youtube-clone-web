
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAT5Daa800ynteMzKRtd4N5W4xU7YKK1bU",
  authDomain: "online--clone.firebaseapp.com",
  projectId: "online--clone",
  storageBucket: "online--clone.appspot.com",
  messagingSenderId: "807394241505",
  appId: "1:807394241505:web:d539235700fb7e06f080a0",
  measurementId: "G-TXK5TEPHL5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
export const provider = new GoogleAuthProvider()
export default app;