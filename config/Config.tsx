// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from 'firebase/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBt7xJCx0Iyh44eHvlyl0bkXSnpAJ3yFsE",
  authDomain: "evaluacion-6b5d4.firebaseapp.com",
  databaseURL: "https://evaluacion-6b5d4-default-rtdb.firebaseio.com",
  projectId: "evaluacion-6b5d4",
  storageBucket: "evaluacion-6b5d4.appspot.com",
  messagingSenderId: "33324981077",
  appId: "1:33324981077:web:4ad0f0dc0123a3f500eddc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);