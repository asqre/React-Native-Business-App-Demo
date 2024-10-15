import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBPzgxvTZ_dTqYS7XgsJoWsSQQo-130g7k",
  authDomain: "rental-master-eac37.firebaseapp.com",
  projectId: "rental-master-eac37",
  storageBucket: "rental-master-eac37.appspot.com",
  messagingSenderId: "517942295053",
  appId: "1:517942295053:web:b5eeb0179bff7a6f5ff344",
  measurementId: "G-CJRNKZSHM7",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
