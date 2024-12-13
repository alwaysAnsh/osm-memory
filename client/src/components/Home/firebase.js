
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBhOGdjbtg-F_ZxIXQ0FIiul8HGf_b3wwk",
  authDomain: "osm-memory-ecccf.firebaseapp.com",
  projectId: "osm-memory-ecccf",
  storageBucket: "osm-memory-ecccf.firebasestorage.app",
  messagingSenderId: "54013587655",
  appId: "1:54013587655:web:cdb147e3ae6ae81fa98ee2"
};

const app = initializeApp(firebaseConfig);

export const auth=getAuth();
export const db=getFirestore(app);
export default app;