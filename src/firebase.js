import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB3HvtG2LhwcBOAZn0E-iRwnx4o3rA-h2Y",
  authDomain: "niyatigroup-60e7a.firebaseapp.com",    // ensure this matches your Firebase console
  projectId: "niyatigroup-60e7a",
  storageBucket: "niyatigroup-60e7a.appspot.com",
  messagingSenderId: "385296735773",
  appId: "1:385296735773:web:1ae76a9d9cbac58207f0f4",
  measurementId: "G-SBWV0YD8Z5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const analytics = getAnalytics(app);
export const db = getFirestore(app);