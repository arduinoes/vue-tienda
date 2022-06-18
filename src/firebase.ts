import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC-yjMEOwF0FAyC4Dsi3IqZcHqoZit4gyI",
  authDomain: "tiendaarduinoes.firebaseapp.com",
  projectId: "tiendaarduinoes",
  storageBucket: "tiendaarduinoes.appspot.com",
  messagingSenderId: "386838491375",
  appId: "1:386838491375:web:518d05af8440e82cb6ab1a",
  measurementId: "G-L90G5CE35V"
};

const firebaseApp = initializeApp(firebaseConfig);
const storage = getStorage(firebaseApp);
const firebase = initializeApp(firebaseConfig);
const db = getFirestore(firebase);
const auth = getAuth();

export { db, auth, storage };
