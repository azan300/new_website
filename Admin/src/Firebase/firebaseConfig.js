
// Import Firebase authentication functions
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyAIqzoMvSPfQ2SE5nRWQssB2JDFdIaIL1I",
  authDomain: "straightuproofing-79614.firebaseapp.com",
  projectId: "straightuproofing-79614",
  storageBucket: "straightuproofing-79614.appspot.com",
  messagingSenderId: "602714767093",
  appId: "1:602714767093:web:8e40c5b1decfe148318fbc",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// Google Sign-In Function
const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    console.log("User Info:", result.user); // Log user info
    return result.user; // Return user data
  } catch (error) {
    console.error("Google Sign-In Error:", error.message);
  }
};

// Logout Function
const logout = async () => {
  try {
    await signOut(auth);
    console.log("User logged out");
  } catch (error) {
    console.error("Logout Error:", error.message);
  }
};

export { auth, googleProvider, signInWithGoogle, logout };
