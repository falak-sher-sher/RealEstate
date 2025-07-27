// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "thirdapp-4204f.firebaseapp.com",
  projectId: "thirdapp-4204f",
  storageBucket: "thirdapp-4204f.firebasestorage.app",
  messagingSenderId: "804778589478",
  appId: "1:804778589478:web:ba1809392dcd5eafd115e7"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const db = getFirestore(app);
 // Optional — remove if unused
export default app;