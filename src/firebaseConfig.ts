// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";
import "firebase/compat/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBcG7ElKMHHvMZNjl2KM5DmmBq-wz1JdRE",
  authDomain: "server-demo-445a0.firebaseapp.com",
  projectId: "server-demo-445a0",
  storageBucket: "server-demo-445a0.appspot.com",
  messagingSenderId: "462817094229",
  appId: "1:462817094229:web:c5cc6282e83f087fdc02dc",
  measurementId: "G-21MC62HGXN",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const firestore = firebase.firestore();
const storage = firebase.storage();

export { firebase, firestore, storage, auth };
