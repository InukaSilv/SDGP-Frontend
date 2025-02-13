// Import the required Firebase modules
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDIWJbQNVizT9HFu5xU2-lF8ALlQqzhRp4",
  authDomain: "rivve-182e4.firebaseapp.com",
  projectId: "rivve-182e4",
  storageBucket: "rivve-182e4.appspot.com",
  messagingSenderId: "590336222818",
  appId: "1:590336222818:web:86106482dcad01c1ba933b",
  measurementId: "G-DTYEVQVKEJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// Export auth and providers for use in other files
export { app, auth, googleProvider, createUserWithEmailAndPassword, sendEmailVerification, signInWithPopup };
