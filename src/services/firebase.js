import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB1oI_mH7dKlSX2M1wynE_dDTT7TLFbVc4",
  authDomain: "unichat-5b96d.firebaseapp.com",
  databaseURL:
    "https://unichat-5b96d-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "unichat-5b96d",
  storageBucket: "unichat-5b96d.firebasestorage.app",
  messagingSenderId: "37433406956",
  appId: "1:37433406956:web:6a0de96171afebc8bcc9",
  measurementId: "G-JT1YFMRP2F",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firebase services
export const auth = getAuth(app);
export const database = getDatabase(app);
export const storage = getStorage(app);

// Analytics
export let analytics = null;

isSupported().then((supported) => {
  if (supported) {
    analytics = getAnalytics(app);
  }
});

export default app;
