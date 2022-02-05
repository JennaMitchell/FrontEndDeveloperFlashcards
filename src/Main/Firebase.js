// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

//import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyCc7iMkyPsiyOzMeRn5yWFLG3QtkxxMB-s",

  authDomain: "flashcard-app-database.firebaseapp.com",

  databaseURL: "https://flashcard-app-database-default-rtdb.firebaseio.com",

  projectId: "flashcard-app-database",

  storageBucket: "flashcard-app-database.appspot.com",

  messagingSenderId: "569408273413",

  appId: "1:569408273413:web:a93152e99dfa6afd4a706c",

  measurementId: "G-T4LS6MBRV5",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);

//const analytics = getAnalytics(app);
const databaseTest = getDatabase(app);

export default databaseTest;
