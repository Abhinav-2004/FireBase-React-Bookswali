// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';
const firebaseConfig = {
  apiKey: "AIzaSyC5S-O7D2NSy-KxQrUHt3fo86WgJtCmQ2A",
  authDomain: "fir-react-ecommerce-f0482.firebaseapp.com",
  projectId: "fir-react-ecommerce-f0482",
  storageBucket: "fir-react-ecommerce-f0482.appspot.com",
  messagingSenderId: "963722386221",
  appId: "1:963722386221:web:7882a0cca89f2f39f611a4",
  measurementId: "G-ZEFDP5Q51Y"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth=getAuth(app);
export const storage = getStorage(app);
export const db=getFirestore(app);