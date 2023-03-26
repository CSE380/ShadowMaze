// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, onAuthStateChanged } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = initializeApp({
  apiKey: "AIzaSyCAQl372lSSfGeGD4XXeGYOwkYXu1W5Wbw",
  authDomain: "shadow-maze.firebaseapp.com",
  projectId: "shadow-maze",
  storageBucket: "shadow-maze.appspot.com",
  messagingSenderId: "38374703784",
  appId: "1:38374703784:web:9165be19bb280c1ba1b89d",
  measurementId: "G-LFQR0Z5EZN"
});


const auth = getAuth(firebaseConfig);
onAuthStateChanged(auth, user => {
  if (user != null) {
    console.log("logged in");
  }
  else {
    console.log("no user");
  }
});